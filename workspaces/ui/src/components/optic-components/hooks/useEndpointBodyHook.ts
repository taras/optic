function useEndpointBody(
  renderChangesSince: string | undefined
): { requests: IRequestBody[]; responses: IResponseBody[] } {
  return [];
}

export interface IRequestBody {
  requestId: string;
  contentType: string;
  description?: string;
  rootShapeId?: string;
  changelog?: {
    added: boolean;
    removed: boolean;
    changed: boolean;
  };
}

export interface IResponseBody {
  responseId: string;
  statusCode: string;
  contentType: string;
  description?: string;
  rootShapeId?: string;
  changelog?: {
    added: boolean;
    removed: boolean;
    changed: boolean;
  };
}
