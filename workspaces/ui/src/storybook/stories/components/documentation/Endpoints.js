import React from 'react';
import theme from '../../../decorators/theme';
import { shapeExamples } from '../../example-shapes';
import { ShapeRenderStore } from '../../../../components/optic-components/shapes/ShapeRenderContext';
import { RenderRootShape } from '../../../../components/optic-components/shapes/ShapeRowBase';
import { BodyRender } from '../../../../components/optic-components/documentation/BodyRender';
import { ContributionGroup } from '../../../../components/optic-components/documentation/ContributionGroup';
import { TwoColumn } from '../../../../components/optic-components/documentation/TwoColumn';
import { EndpointName } from '../../../../components/optic-components/documentation/EndpointName';

export default {
  title: 'Documentation/Endpoints',
  decorators: [theme],
};

const examples = [
  { method: 'GET', fullPath: '/todos/:todoId' },
  { method: 'POST', fullPath: '/todos/:todoId' },
  { method: 'PUT', fullPath: '/todos/:todoId' },
  { method: 'OPTIONS', fullPath: '/todos/:todoId' },
  { method: 'GET', fullPath: '/repos/:repoId/contents' },
  { method: 'DELETE', fullPath: '/user/:userId/role/:roleId' },
];

export function EndpointNameCards() {
  const example = shapeExamples[3];
  return (
    <div style={{ padding: 20 }}>
      {examples.map((i, index) => {
        return <EndpointName key={index} {...i} fontSize={15} />;
      })}
    </div>
  );
}
