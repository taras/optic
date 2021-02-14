export interface IFieldRenderer {
  fieldId: string;
  fieldKey: string;
  shapeRenderers: IShapeRenderer[];
  required: boolean;
  description?: string;
}

export interface IShapeRenderer {
  shapeId: string;
  jsonType: JsonLike;
  asArray?: IArrayRender;
  asObject?: IObjectRender;
  value: any;
}

export interface IArrayRender {
  listItem: IShapeRenderer[];
}

export interface IObjectRender {
  fields: IFieldRenderer[];
}

export enum JsonLike {
  OBJECT = 'OBJECT',
  ARRAY = 'ARRAY',
  NULL = 'NULL',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
}

///////////////////////////////////////////////
