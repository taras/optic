import React from 'react';
import theme from '../../../decorators/theme';
import { shapeExamples } from '../../example-shapes';
import { ShapeRenderStore } from '../../../../components/optic-components/shapes/ShapeRenderContext';
import { RenderRootShape } from '../../../../components/optic-components/shapes/ShapeRowBase';
import { BodyRender } from '../../../../components/optic-components/documentation/BodyRender';
import { ContributionGroup } from '../../../../components/optic-components/documentation/ContributionGroup';
import { TwoColumn } from '../../../../components/optic-components/documentation/TwoColumn';

export default {
  title: 'Documentation/Body Columns',
  decorators: [theme],
};

export function BodyColumns() {
  const example = shapeExamples[4];
  return (
    <div style={{ padding: 20 }}>
      <TwoColumn
        left={<ContributionGroup rootShape={[example]} />}
        right={<BodyRender location="200 Response" shape={example} />}
      />
    </div>
  );
}
