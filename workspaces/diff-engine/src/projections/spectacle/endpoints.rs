use crate::events::{EndpointEvent, Event, ShapeEvent, SpecEvent};
use crate::projections::endpoint::ROOT_PATH_ID;
use crate::state::endpoint::{
  HttpContentType, HttpMethod, HttpStatusCode, PathComponentId, RequestId, ResponseId,
};
use crate::state::shape::ShapeId;
use cqrs_core::{Aggregate, AggregateEvent};
use petgraph::csr::NodeIndex;
use petgraph::Direction::Incoming;
use petgraph::Graph;
use serde::{Deserialize, Serialize};
use std::collections::{BTreeMap, HashMap};
use std::error::Error;
use std::iter::FromIterator;

#[derive(Debug, Clone)]
pub struct EndpointsProjection {
  pub graph: Graph<Node, Edge>,

  // SAFETY: node indices are not stable upon removing of nodes from graph -> node indices might be referred to
  // which no longer exist or point to a different node. Compiler can't track these nodes for us. Do not delete nodes
  // without rebuilding these maps.
  pub domain_id_to_index: HashMap<String, petgraph::graph::NodeIndex>,
}

impl EndpointsProjection {
  pub fn to_json_string(&self) -> String {
    serde_json::to_string(&self.to_serializable_graph()).expect("graph should serialize")
  }

  pub fn to_serializable_graph(&self) -> SerializableGraph {
    let copy = self.clone();
    copy.into()
  }
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct GraphNodesAndEdges<N, E> {
  nodes: Vec<N>,
  edges: Vec<(usize, usize, E)>,
  node_index_to_id: BTreeMap<String, String>,
}

// duplicated in [projections/shape.rs]
pub type SerializableGraph = GraphNodesAndEdges<Node, Edge>;
impl From<EndpointsProjection> for SerializableGraph {
  fn from(endpoint_projection: EndpointsProjection) -> Self {
    let (graph_nodes, graph_edges) = endpoint_projection.graph.into_nodes_edges();
    let nodes = graph_nodes.into_iter().map(|x| x.weight).collect();
    let edges = graph_edges
      .into_iter()
      .map(|x| (x.source().index(), x.target().index(), x.weight))
      .collect();
    let value: GraphNodesAndEdges<Node, Edge> = GraphNodesAndEdges {
      nodes,
      edges,
      node_index_to_id: BTreeMap::from_iter(
        endpoint_projection
          .domain_id_to_index
          .into_iter()
          .map(|(k, v)| (v.index().to_string(), k)),
      ),
    };
    value
  }
}

impl Default for EndpointsProjection {
  fn default() -> Self {
    let graph: Graph<Node, Edge> = Graph::new();
    let domain_id_to_index = HashMap::new();

    let mut projection = EndpointsProjection {
      graph,
      domain_id_to_index,
    };

    projection.with_path_component_node(String::from(ROOT_PATH_ID), String::from("/"));
    projection
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

impl Aggregate for EndpointsProjection {
  fn aggregate_type() -> &'static str {
    "endpoints_projection"
  }
}

impl AggregateEvent<EndpointsProjection> for ShapeEvent {
  fn apply_to(self, projection: &mut EndpointsProjection) {}
}

impl AggregateEvent<EndpointsProjection> for EndpointEvent {
  fn apply_to(self, projection: &mut EndpointsProjection) {
    match self {
      EndpointEvent::PathComponentAdded(e) => {
        projection.with_path_component(e.parent_path_id, e.path_id, e.name);
      }
      EndpointEvent::PathParameterAdded(e) => {
        projection.with_path_parameter(e.parent_path_id, e.path_id, e.name);
      }
      EndpointEvent::RequestAdded(e) => {
        projection.with_request(e.request_id, e.path_id, e.http_method);
      }
      EndpointEvent::ResponseAddedByPathAndMethod(e) => {
        projection.with_response(e.response_id, e.path_id, e.http_method, e.http_status_code);
      }
      EndpointEvent::RequestBodySet(e) => {
        projection.with_request_body(
          e.request_id,
          e.body_descriptor.http_content_type,
          e.body_descriptor.shape_id,
        );
      }
      EndpointEvent::ResponseBodySet(e) => {
        projection.with_response_body(
          e.response_id,
          e.body_descriptor.http_content_type,
          e.body_descriptor.shape_id,
        );
      }
      _ => eprintln!(
        "Ignoring applying event of type '{}' for '{}'",
        self.event_type(),
        EndpointsProjection::aggregate_type()
      ),
    }
  }
}

impl AggregateEvent<EndpointsProjection> for SpecEvent {
  fn apply_to(self, projection: &mut EndpointsProjection) {}
}

impl<I> From<I> for EndpointsProjection
where
  I: IntoIterator,
  I::Item: AggregateEvent<Self>,
{
  fn from(events: I) -> Self {
    let mut projection = EndpointsProjection::default();
    for event in events.into_iter() {
      projection.apply(event);
    }
    projection
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
impl EndpointsProjection {
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  pub fn with_path_component(
    &mut self,
    parent_path_id: PathComponentId,
    path_id: PathComponentId,
    path_name: String,
  ) {
    // build absolute path pattern inductively
    let parent_node_index = self
      .domain_id_to_index
      .get(&parent_path_id)
      .expect("expected parent_path_id to exist in graph");
    let absolute_path_string: AbsolutePathPattern = if parent_path_id == ROOT_PATH_ID {
      format!("/{}", path_name)
    } else {
      let parent_node = self
        .graph
        .node_weight(*parent_node_index)
        .expect("expected parent_path_id to exist in graph");
      match parent_node {
        Node::Path(n) => format!("{}/{}", n.absolute_path_pattern, path_name),
        _ => panic!("expected parent_node to be a Path"),
      }
    };

    self.with_path_component_node(path_id.clone(), absolute_path_string);
  }

  pub fn with_path_parameter(
    &mut self,
    parent_path_id: PathComponentId,
    path_id: PathComponentId,
    path_name: String,
  ) {
    // build absolute path pattern inductively
    let parent_node_index = self
      .domain_id_to_index
      .get(&parent_path_id)
      .expect("expected parent_path_id to exist in graph");
    let absolute_path_string: AbsolutePathPattern = if parent_path_id == ROOT_PATH_ID {
      format!("/{{}}")
    } else {
      let parent_node = self
        .graph
        .node_weight(*parent_node_index)
        .expect("expected parent_path_id to exist in graph");
      match parent_node {
        Node::Path(n) => format!("{}/{{}}", n.absolute_path_pattern),
        _ => panic!("expected parent_node to be a Path"),
      }
    };
    self.with_path_component_node(path_id.clone(), absolute_path_string);
  }

  pub fn with_path_component_node(
    &mut self,
    path_id: PathComponentId,
    absolute_path_string: AbsolutePathPattern,
  ) {
    let node_index = self.graph.add_node(Node::Path(PathNode {
      absolute_path_pattern: absolute_path_string,
      path_id: path_id.clone(),
    }));
    self.domain_id_to_index.insert(path_id, node_index);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  pub fn with_request(
    &mut self,
    request_id: RequestId,
    path_id: PathComponentId,
    http_method: HttpMethod,
  ) {
    let path_index = self
      .domain_id_to_index
      .get(&path_id)
      .expect("expected node with domain_id $path_id to exist in the graph");

    let node = Node::Request(RequestNode {
      http_method: http_method,
      request_id: request_id.clone(),
    });

    let node_index = self.graph.add_node(node);
    self
      .graph
      .add_edge(node_index, *path_index, Edge::IsChildOf);

    self.domain_id_to_index.insert(request_id, node_index);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  pub fn with_response(
    &mut self,
    response_id: ResponseId,
    path_id: PathComponentId,
    http_method: HttpMethod,
    http_status_code: HttpStatusCode,
  ) {
    let path_index = self
      .domain_id_to_index
      .get(&path_id)
      .expect("expected node with domain_id $path_id to exist in the graph");

    let node = Node::Response(ResponseNode {
      http_method: http_method,
      http_status_code: http_status_code,
      response_id: response_id.clone(),
    });

    let node_index = self.graph.add_node(node);
    self
      .graph
      .add_edge(node_index, *path_index, Edge::IsChildOf);

    self.domain_id_to_index.insert(response_id, node_index);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  pub fn with_request_body(
    &mut self,
    request_id: RequestId,
    http_content_type: HttpContentType,
    root_shape_id: ShapeId,
  ) {
    let request_index = self
      .domain_id_to_index
      .get(&request_id)
      .expect("expected node with domain_id $request_id to exist in the graph");
    let node = Node::Body(BodyNode {
      http_content_type: http_content_type,
      root_shape_id: root_shape_id,
    });
    let node_index = self.graph.add_node(node);
    self
      .graph
      .add_edge(node_index, *request_index, Edge::IsChildOf);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  pub fn with_response_body(
    &mut self,
    response_id: ResponseId,
    http_content_type: HttpContentType,
    root_shape_id: ShapeId,
  ) {
    let response_index = self
      .domain_id_to_index
      .get(&response_id)
      .expect("expected node with domain_id $response_id to exist in the graph");
    let node = Node::Body(BodyNode {
      http_content_type: http_content_type,
      root_shape_id: root_shape_id,
    });
    let node_index = self.graph.add_node(node);
    self
      .graph
      .add_edge(node_index, *response_index, Edge::IsChildOf);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
}
////////////////////////////////////////////////////////////////////////////////////////////////////

pub type AbsolutePathPattern = String;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", content = "data")]
pub enum Node {
  Path(PathNode),
  Request(RequestNode),
  Response(ResponseNode),
  Body(BodyNode),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PathNode {
  absolute_path_pattern: AbsolutePathPattern,
  path_id: PathComponentId,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RequestNode {
  http_method: HttpMethod,
  request_id: RequestId,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ResponseNode {
  http_method: HttpMethod,
  http_status_code: HttpStatusCode,
  response_id: ResponseId,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BodyNode {
  http_content_type: HttpContentType,
  root_shape_id: ShapeId,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", content = "data")]
pub enum Edge {
  IsChildOf,
}
////////////////////////////////////////////////////////////////////////////////////////////////////