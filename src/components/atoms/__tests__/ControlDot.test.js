import React from 'react';
import ControlDot from 'components/atoms/ControlDot/ControlDot';
import { render } from 'test-utils';
import { theme } from 'assets/styles/theme';

describe('ControlDot', () => {
  test('It has to change background color for active color', () => {
    const { getByTestId } = render(
      <ControlDot data-testid="controlDot" isActive />
    );
    const activeControlDot = getByTestId('controlDot');
    expect(activeControlDot).toHaveStyle(`background-color: ${theme.white}`);
  });
});
