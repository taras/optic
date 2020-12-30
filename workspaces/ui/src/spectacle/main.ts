import { Resolvers } from './graphql/resolvers';
import * as DiffEngine from '@useoptic/diff-engine-wasm/engine/browser';
import cytoscape from 'cytoscape';
import { graphql, buildSchema, introspectionFromSchema } from 'graphql';
import { schema } from './graphql/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

export interface IOpticContext {
  specEvents: any[];
}

export function makeSpectacle(opticContext: IOpticContext) {
  const spec = DiffEngine.spec_from_events(
    JSON.stringify(opticContext.specEvents)
  );
  const graph = JSON.parse(DiffEngine.get_endpoints_projection(spec));
  console.log(graph);
  const cytoscapeContext = cytoscape({
    container: document.getElementById('cytoscape-root'),
  });
  graph.nodes.forEach((node, i) => {
    cytoscapeContext.add({
      group: 'nodes',
      data: {
        id: `node${i}`,
        node,
      },
    });
  });
  graph.edges.forEach((edge, i) => {
    const [source, target, value] = edge;
    cytoscapeContext.add({
      group: 'edges',
      data: {
        id: `edge${i}`,
        source: `node${source}`,
        target: `node${target}`,
        edge: value,
      },
    });
  });
  cytoscapeContext.on('click', 'node', function (evt) {
    console.log('clicked ' + this.id());
    console.log(this.data());
    debugger;
  });
  cytoscapeContext
    .layout({
      name: 'breadthfirst',
    })
    .run();

  const rootPathNodeId = `#node0`;

  function accumulatePathComponentNodes(
    parentPathComponentId: string,
    acc: any[]
  ) {
    const node = cytoscapeContext.nodes(parentPathComponentId);
    if (node.group() === 'nodes') {
      const nodeData = node.data();
      if (nodeData.node.PathComponent) {
        acc.push(nodeData);
      }
    }
    const children = cytoscapeContext.nodes(parentPathComponentId).incomers();
    children.forEach((child) => {
      console.log({ child });
      accumulatePathComponentNodes(`#${child.data().source}`, acc);
    });
  }

  const pathComponentNodes = [];
  accumulatePathComponentNodes(rootPathNodeId, pathComponentNodes);

  const resolvers: Resolvers = {
    Query: {
      endpoints: (parent, args, context, info) => {
        console.log({
          parent,
          args,
          context,
          info,
        });
        debugger;

        debugger;
        return Promise.resolve([{ httpMethod: 'get' }]);
      },
    },
    Endpoint: {
      httpMethod: () => Promise.resolve('x'),
    },
  };

  const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers,
  });

  return function (
    input: null | {
      operationName: string;
      query: string;
      variables: any;
    }
  ) {
    if (input === null) {
      return introspectionFromSchema(buildSchema(schema));
    }
    return graphql({
      schema: executableSchema,
      source: input.query,
      variableValues: input.variables,
      operationName: input.operationName,
      contextValue: {
        opticContext,
        cytoscapeContext,
      },
    });
  };
}
