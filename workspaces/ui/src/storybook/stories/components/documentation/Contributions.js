import React from 'react';
import theme from '../../../decorators/theme';
import { shapeExamples } from '../../example-shapes';
import { ShapeRenderStore } from '../../../../components/optic-components/shapes/ShapeRenderContext';
import { RenderRootShape } from '../../../../components/optic-components/shapes/ShapeRowBase';
import { BodyRender } from '../../../../components/optic-components/documentation/BodyRender';
import { TwoColumn } from '../../../../components/optic-components/documentation/TwoColumn';
import { FieldOrParameterContribution } from '../../../../components/optic-components/documentation/Contributions';
import { JsonLike } from '../../../../components/optic-components/shapes/ShapeRenderInterfaces';

export default {
  title: 'Documentation/Contributions',
  decorators: [theme],
};

export function FieldContributions() {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginTop: 15 }}>
        <FieldOrParameterContribution
          name="evidence"
          currentDescription={
            'Evidence to upload, to respond to a dispute. Updating any field in thehash will submit all fields in the hash for review. The combinedcharacter count of all fields is limited to 150,000.'
          }
          shapes={[
            {
              shapeId: 'abc',
              jsonType: JsonLike.STRING,
            },
          ]}
        />
        <FieldOrParameterContribution
          name="evidence"
          currentDescription={
            'Evidence to upload, to respond to a dispute. Updating any field in thehash will submit all fields in the hash for review. The combinedcharacter count of all fields is limited to 150,000.'
          }
          shapes={[
            {
              shapeId: 'abc',
              jsonType: JsonLike.OBJECT,
              asObject: {
                fields: [],
              },
            },
            {
              shapeId: 'abc',
              jsonType: JsonLike.STRING,
            },
          ]}
        />
      </div>
    </div>
  );
}
