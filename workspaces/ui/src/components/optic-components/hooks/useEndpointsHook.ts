import { useContext } from 'react';
import { RfcContext } from '../../../contexts/RfcContext';
import { createEndpointDescriptor } from '../../../utilities/EndpointUtilities';
import sortBy from 'lodash.sortby';

export function useEndpoints(renderChangesSince?: string): IEndpoint[] {
  ///query spectacle

  // old scala js call
  const { cachedQueryResults } = useContext(RfcContext);
  const { endpoints } = cachedQueryResults;

  const endpointDescriptors = endpoints.map(({ pathId, method }) => {
    return createEndpointDescriptor({ pathId, method }, cachedQueryResults);
  });

  // const example = {
  //   httpMethod: 'GET',
  //   method: 'GET',
  //   pathId: 'path_xhUZ8irdJO',
  //   fullPath: '/api/lists/{listId}/completed',
  //   pathTrails: [
  //     {
  //       pathComponentName: '',
  //       pathComponentId: 'root',
  //       isPathParameter: false,
  //     },
  //     {
  //       pathComponentName: 'api',
  //       pathComponentId: 'path_DuKsKy5MFb',
  //       isPathParameter: false,
  //     },
  //     {
  //       pathComponentName: 'lists',
  //       pathComponentId: 'path_F22U4m3ddD',
  //       isPathParameter: false,
  //     },
  //     {
  //       pathComponentName: '{listId}',
  //       pathComponentId: 'path_AsEexQkVwC',
  //       isPathParameter: true,
  //     },
  //     {
  //       pathComponentName: 'completed',
  //       pathComponentId: 'path_xhUZ8irdJO',
  //       isPathParameter: false,
  //     },
  //   ],
  //   pathParameters: [
  //     {
  //       pathId: 'path_AsEexQkVwC',
  //       name: 'listId',
  //     },
  //   ],
  //   requestBodies: [
  //     {
  //       requestId: 'request_SqY61Qc9Mi',
  //       requestBody: {
  //         httpContentType: 'application/json',
  //         shapeId: 'shape_Lx1MrhWlFb',
  //         isRemoved: false,
  //       },
  //     },
  //   ],
  //   responses: [
  //     {
  //       responseId: 'response_RkkvxIt2RG',
  //       responseBody: {
  //         httpContentType: 'application/json',
  //         shapeId: 'shape_ToF242uYVA',
  //         isRemoved: false,
  //       },
  //       statusCode: 200,
  //     },
  //   ],
  //   endpointPurpose: 'get completed items on list',
  //   isEmpty: false,
  // };

  const groupingIndex = (() => {
    const abc = endpointDescriptors.map((i) =>
      i.pathTrails.map((a) => a.pathComponentName)
    );

    let groupingIndex = 1;
    let variationFound = false;
    while (!variationFound) {
      const allEqual = (arr) => arr.every((v) => v === arr[0]);
      const list = abc.map((path) => path[groupingIndex] || undefined);
      if (allEqual(list) && list[0] !== undefined) {
        groupingIndex = groupingIndex + 1;
      } else {
        variationFound = true;
      }
    }
    return groupingIndex;
  })();

  return sortBy(
    endpointDescriptors.map((i) => {
      const asEndpoint: IEndpoint = {
        group:
          groupingIndex > 0
            ? i.pathTrails[groupingIndex].pathComponentName
            : 'API',
        pathParameters: i.pathTrails
          .filter((a) => a.isPathParameter)
          .map((a) => ({
            pathComponentId: a.pathComponentId,
            name: a.pathComponentName,
          })),
        pathId: i.pathId,
        method: i.method,
        purpose: i.endpointPurpose,
        description: i.endpointDescription,
        fullPath: i.fullPath,
      };
      return asEndpoint;
    }),
    'fullPath'
  );

  //

  return [];
}

export interface IEndpoint {
  pathId: string;
  method: string;
  purpose?: string;
  description?: string;
  fullPath: string;
  pathParameters: IPathParameter[];
  group: string;
  changelog?: {
    added: boolean;
    removed: boolean;
    changed: boolean;
  };
}

export interface IPathParameter {
  pathComponentId: string;
  description?: string;
}
