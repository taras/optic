import React from 'react';
import theme from '../../decorators/theme';
import { TopNavigation } from '../../../components/optic-components/navigation/TopNavigation';
import { NavButton } from '../../../components/optic-components/navigation/NavButton';

export default {
  title: 'Navigation/ Top Bar',
  decorators: [theme],
};

export function NavButtons() {
  return (
    <>
      <div>
        <NavButton />
      </div>
    </>
  );
}

export function ShowTopBar() {
  return <TopNavigation />;
}
