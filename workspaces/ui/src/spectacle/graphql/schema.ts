export const schema = `
schema {
  query: Query
}

type Query {
  endpoints: [Endpoint]
}

type Endpoint {
  pathComponents: [PathComponent]
  absolutePathPattern: String
  httpMethod: String
  responses: [HttpResponse]
}

type PathComponent {
  opticId: ID
  name: String
  isParameterized: Boolean
}

type HttpResponse {
  statusCode: Int
}`;
