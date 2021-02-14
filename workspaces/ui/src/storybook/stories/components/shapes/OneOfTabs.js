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
import { OneOfTabs } from '../../../../components/optic-components/shapes/OneOfTabs';

export default {
  title: 'Shapes/One Of Tabs',
  decorators: [theme],
};

const examples = [
  {
    choices: [
      { label: 'string', id: 's1' },
      { label: 'number', id: 'n1' },
    ],
    parentShapeId: 'slot1',
  },
  {
    choices: [
      { label: 'string', id: 's1' },
      { label: 'object', id: 'o1' },
      { label: 'array', id: 'a1' },
    ],
    parentShapeId: 'slot2',
  },
];

export function Examples() {
  return (
    <div style={{ padding: 20 }}>
      {examples.map((i) => {
        return (
          <>
            <ShapeRenderStore showExamples={true}>
              <OneOfTabs {...i} />
            </ShapeRenderStore>
          </>
        );
      })}
    </div>
  );
}
