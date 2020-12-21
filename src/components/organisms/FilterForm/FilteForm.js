import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FilterContext } from 'contexts/FilterContext';
import { StoreContext } from 'store/StoreProvider';
import CheckBoxElement from 'components/molecules/CheckBoxElement/CheckBoxElement';
import Button from 'components/atoms/Button/Button';

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

const FilterForm = ({ handleClosePanel, saveValues, savedValues }) => {
  const {
    state: { categoriesOptions },
    getCategories,
    removeAllFilteredProducts,
  } = useContext(FilterContext);

  const { removeAllProducts, fetchProducts } = useContext(StoreContext);

  const initialValues = Object.keys(savedValues).length
    ? savedValues
    : categoriesOptions.reduce((initialState, { categoryName }) => {
        // eslint-disable-next-line no-param-reassign
        initialState[categoryName] = false;
        return initialState;
      }, {});

  const [filterValues, setFilterValues] = useState(initialValues);

  const toggleCheckbox = (categoryName) => {
    setFilterValues({
      ...filterValues,
      [categoryName]: !filterValues[categoryName],
    });
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();

    const currValues = values;
    const selectedFilters = categoriesOptions.filter(
      ({ categoryName }) => currValues[categoryName]
    );
    const anyFilterSelected = selectedFilters.length;

    saveValues(currValues);
    removeAllProducts();
    removeAllFilteredProducts();
    handleClosePanel();
    return anyFilterSelected ? getCategories(selectedFilters) : fetchProducts();
  };

  const clearAll = (valuesObj) => {
    const valuesToClear = valuesObj;
    const clearedValues = Object.keys(valuesToClear).reduce((acc, property) => {
      acc[property] = false;
      return acc;
    }, {});
    setFilterValues(clearedValues);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e, filterValues)}>
      <CategoriesListWrapper>
        {categoriesOptions.map(({ categoryName, productsNum }) => (
          <StyledCheckBoxElement
            key={categoryName}
            name={categoryName}
            productsNum={productsNum}
            toggleCheckbox={toggleCheckbox}
            value={filterValues[categoryName]}
          />
        ))}
      </CategoriesListWrapper>
      <ButtonsWrapper>
        <StyledButton type="submit">Filter</StyledButton>
        <Button type="button" onClick={() => clearAll(filterValues)}>
          Clear
        </Button>
      </ButtonsWrapper>
    </Form>
  );
};

FilterForm.propTypes = {
  saveValues: PropTypes.func,
  savedValues: PropTypes.objectOf(PropTypes.bool),
  handleClosePanel: PropTypes.func,
};

FilterForm.defaultProps = {
  saveValues: () => {},
  handleClosePanel: () => {},
  savedValues: {},
};

export default FilterForm;
