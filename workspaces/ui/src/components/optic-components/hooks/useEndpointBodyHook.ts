import React from 'react';
import { useContext } from 'react';
import { createEndpointDescriptor } from '../../../utilities/EndpointUtilities';
import { RfcContext } from '../../../contexts/RfcContext';

export function useEndpointBody(
  pathId: string,
  method: string,
  renderChangesSince?: string
): { requests: IRequestBody[]; responses: IResponseBody[] } {
  // old scala js call
  const { cachedQueryResults } = useContext(RfcContext);
  const { endpoints } = cachedQueryResults;

  const endpointDescriptors = endpoints.map(({ pathId, method }) => {
    return createEndpointDescriptor({ pathId, method }, cachedQueryResults);
  });

  const endpoint = endpointDescriptors.find(
    (i) => i.method === method && i.pathId === pathId
  );

  const requests: IRequestBody[] = endpoint.requestBodies.map((i) => {
    return {
      requestId: i.requestId,
      contentType: i.requestBody ? i.requestBody.httpContentType : undefined,
      rootShapeId: i.requestBody && i.requestBody.shapeId,
    };
  });
  const responses: IResponseBody[] = endpoint.responses.map((i) => {
    return {
      responseId: i.responseId,
      contentType: i.responseBody ? i.responseBody.httpContentType : undefined,
      statusCode: i.statusCode,
      rootShapeId: i.responseBody && i.responseBody.shapeId,
    };
  });

  return { requests, responses };
}

export interface IRequestBody {
  requestId: string;
  contentType?: string;
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
  rootShapeId?: string;
  changelog?: {
    added: boolean;
    removed: boolean;
    changed: boolean;
  };
}
