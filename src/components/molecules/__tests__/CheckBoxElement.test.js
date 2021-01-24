import React from 'react';
import CheckBoxElement from 'components/molecules/CheckBoxElement/CheckBoxElement';
import { fireEvent, render } from 'test-utils';

describe('CheckBoxElement', () => {
  test('Display the label text propertly', () => {
    const description = 'Tshirts';
    const { getByText } = render(
      <CheckBoxElement
        toggleCheckbox={() => {}}
        name={description}
        description={description}
      />
    );

    const label = getByText('Tshirts');

    expect(label).toHaveTextContent(/tshirts/i);
  });

  test('toggle function has been called once when wrapper was clicked', () => {
    const mockToggleFn = jest.fn();
    const { getByTestId } = render(
      <CheckBoxElement
        name="jackets"
        description="jackets"
        toggleCheckbox={mockToggleFn}
      />
    );

    const checkBoxWrapper = getByTestId('checkbox-wrapper');

    fireEvent.click(checkBoxWrapper);

    expect(mockToggleFn).toHaveBeenCalledTimes(1);
  });

  test('render number of products when they are passed on props', () => {
    const productsNum = 5;
    const { getByText } = render(
      <CheckBoxElement
        name="jackets"
        description="jackets"
        toggleCheckbox={() => {}}
        productsNum={productsNum}
      />
    );

    const span = getByText('(5)');

    expect(span).toHaveTextContent('(5)');
  });
});
