import React from 'react';
import theme from '../../../decorators/theme';
import {
  RenderField,
  RenderRootShape,
} from '../../../../components/optic-components/shapes/ShapeRowBase';
import {
  IArrayRender,
  IFieldRenderer,
  IObjectRender,
  JsonLike,
} from '../../../../components/optic-components/shapes/ShapeRenderInterfaces';
import { ShapeRenderStore } from '../../../../components/optic-components/shapes/ShapeRenderContext';
import { shapeExamples } from '../../example-shapes';

export default {
  title: 'Shapes/Field',
  decorators: [theme],
};

export function Fields() {
  return (
    <div style={{ padding: 20 }}>
      {shapeExamples.map((i) => {
        return (
          <>
            <div style={{ marginTop: 20 }}>
              <ShapeRenderStore showExamples={false}>
                <RenderRootShape shape={i} />
              </ShapeRenderStore>
            </div>
            <div style={{ marginTop: 20 }}>
              <ShapeRenderStore showExamples={true}>
                <RenderRootShape shape={i} />
              </ShapeRenderStore>
            </div>
          </>
        );
      })}
    </div>
  );
}
