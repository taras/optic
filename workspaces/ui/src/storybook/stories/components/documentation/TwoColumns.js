import React from 'react';
import theme from '../../../decorators/theme';
import { shapeExamples } from '../../example-shapes';
import { ShapeRenderStore } from '../../../../components/optic-components/shapes/ShapeRenderContext';
import { RenderRootShape } from '../../../../components/optic-components/shapes/ShapeRowBase';
import { BodyRender } from '../../../../components/optic-components/documentation/BodyRender';
import { TwoColumn } from '../../../../components/optic-components/documentation/TwoColumn';

export default {
  title: 'Documentation/TwoColumns',
  decorators: [theme],
};

export function TwoColumns() {
  return (
    <div style={{ padding: 20 }}>
      <TwoColumn
        left={
          <div style={{ height: 4000, backgroundColor: 'red' }}>LEft stuff</div>
        }
        right={<BodyRender location="404 Response" shape={shapeExamples[4]} />}
      />
    </div>
  );
}
