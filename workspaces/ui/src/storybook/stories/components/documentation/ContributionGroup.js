import React from 'react';
import theme from '../../../decorators/theme';
import { shapeExamples } from '../../example-shapes';
import { ContributionGroup } from '../../../../components/optic-components/documentation/ContributionGroup';
export default {
  title: 'Documentation/Contribution Group',
  decorators: [theme],
};

export function ContributionGroupTest() {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginTop: 15 }}>
        <ContributionGroup rootShape={[shapeExamples[0]]} />
      </div>
    </div>
  );
}
