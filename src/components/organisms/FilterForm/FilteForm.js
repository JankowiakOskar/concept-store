import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { StoreContext } from 'store/StoreProvider';
import CheckBoxElement from 'components/molecules/CheckBoxElement/CheckBoxElement';
import Button from 'components/atoms/Button/Button';
import { categoryQueryFilter } from 'helpers/queryHelpers';

const Form = styled.form``;

const CategoriesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledCheckBoxElement = styled(CheckBoxElement)`
  &&& {
    margin: 5px 0;
  }
`;

const ButtonsWrapper = styled.div``;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.grey100};
  width: 100px;
  height: 30px;
`;

const FilterForm = () => {
  const {
    data: { categories },
  } = useContext(StoreContext);

  const [filterValues, setFilterValues] = useState(() =>
    categories.reduce((initialState, { categoryName }) => {
      // eslint-disable-next-line no-param-reassign
      initialState[categoryName] = false;
      return initialState;
    }, {})
  );

  const toggleCheckbox = (categoryName) => {
    setFilterValues({
      ...filterValues,
      [categoryName]: !filterValues[categoryName],
    });
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();
    const keys = Object.keys(values);
    console.log(keys);
    console.log(categoryQueryFilter(keys));
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e, filterValues)}>
      <CategoriesListWrapper>
        {categories.map(({ categoryName, categoryProductsNum }) => (
          <StyledCheckBoxElement
            key={categoryName}
            name={categoryName}
            productNums={categoryProductsNum}
            toggleCheckbox={toggleCheckbox}
            value={filterValues[categoryName]}
          />
        ))}
      </CategoriesListWrapper>
      <ButtonsWrapper>
        <StyledButton type="submit">Filter</StyledButton>
        <Button type="button">Clear</Button>
      </ButtonsWrapper>
    </Form>
  );
};

export default FilterForm;
