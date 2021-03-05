function useEndpoints(renderChangesSince: string | undefined): IEndpoint[] {
  ///query spectacle

  return [];
}

export interface IEndpoint {
  pathId: string;
  method: string;
  purpose?: string;
  description?: string;
  fullPath: string;
  pathParameters: IPathParameter[];
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
