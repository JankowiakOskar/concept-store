import React from 'react';
import Accordion from 'components/molecules/Accordion/Accordion';
import { render } from 'test-utils';

describe('Accordion', () => {
  const mockList = [
    { name: 'one', path: '/' },
    { name: 'two', path: '/' },
    { name: 'three', path: '/' },
  ];

  test('render list when it`s passed on props', () => {
    const { getAllByTestId } = render(
      <Accordion title="Test component" list={mockList} />
    );

    const listNames = getAllByTestId('list-name').map((li) => li.textContent);
    const mockListNames = mockList.map((el) => el.name);

    expect(listNames).toEqual(mockListNames);
  });

  test('Show list default when it has active props', () => {
    const { getByTestId } = render(
      <Accordion title="Test Component" list={mockList} isActive />
    );

    const listWrapper = getByTestId('accordion-list');

    expect(listWrapper).toHaveStyle('max-height: 400px');
  });
});
