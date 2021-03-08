import React from 'react';
import theme from '../../../decorators/theme';
import { shapeExamples } from '../../example-shapes';
import { ShapeRenderStore } from '../../../../components/optic-components/shapes/ShapeRenderContext';
import { RenderRootShape } from '../../../../components/optic-components/shapes/ShapeRowBase';
import { BodyRender } from '../../../../components/optic-components/documentation/BodyRender';
import { TwoColumn } from '../../../../components/optic-components/documentation/TwoColumn';
import {
  EndpointTOC,
  EndpointTOCRow,
} from '../../../../components/optic-components/documentation/EndpointTOC';

export default {
  title: 'Documentation/endpoint toc stories',
  decorators: [theme],
};

export function Row() {
  return (
    <div style={{ padding: 20 }}>
      <EndpointTOCRow />
    </div>
  );
}

export function Wrapper() {
  return (
    <div style={{ padding: 20 }}>
      <EndpointTOC />
    </div>
  );
}
