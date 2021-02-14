import React from 'react';
import theme from '../../../decorators/theme';
import { shapeExamples } from '../../example-shapes';
import { ShapeRenderStore } from '../../../../components/optic-components/shapes/ShapeRenderContext';
import { RenderRootShape } from '../../../../components/optic-components/shapes/ShapeRowBase';
import { BodyRender } from '../../../../components/optic-components/documentation/BodyRender';

export default {
  title: 'Documentation/Body',
  decorators: [theme],
};

export function BodyRegion() {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginTop: 20 }}>
        <BodyRender location="200 Response" shape={shapeExamples[0]} />
      </div>
      <div style={{ marginTop: 20 }}>
        <BodyRender location="200 Response" shape={shapeExamples[3]} />
      </div>

      <div style={{ marginTop: 20 }}>
        <BodyRender location="404 Response" shape={shapeExamples[4]} />
      </div>
    </div>
  );
}
