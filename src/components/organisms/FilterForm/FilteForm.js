import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FilterContext } from 'contexts/FilterContext';
import { StoreContext } from 'store/StoreProvider';
import CheckBoxElement from 'components/molecules/CheckBoxElement/CheckBoxElement';
import Button, {
  HoverPrimaryDarkBtn,
  HoverPrimaryBtn,
} from 'components/atoms/Button/Button';
import InputRangeSlider from 'components/molecules/InputRangeSlider/InputRangeSlider';

const Form = styled.form`
  padding: 0 20px;
`;

const Heading = styled.h3`
  padding: 10px 0px 10px;
  font-size: ${({ theme }) => theme.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const CategoriesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledInputRangeSlider = styled(InputRangeSlider)`
  &&& {
    margin: 30px 0;
  }
`;
const StyledCheckBoxElement = styled(CheckBoxElement)`
  &&& {
    margin: 5px 0;
  }
`;

const ButtonsWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.primary};
  width: 150px;
  height: 30px;
  ${HoverPrimaryDarkBtn}
`;

const StyledButtonClear = styled(Button)`
  margin: 0 0 0 20px;
  width: 100px;
  height: 30px;

  ${HoverPrimaryBtn};
`;

const FilterForm = ({ className, handleClosePanel }) => {
  const {
    state: { categoriesOptions, priceFilters, categoryFilters },
    allFilters,
    setPriceFilters,
    setCategoryFilters,
  } = useContext(FilterContext);

  const { fetchProducts, removeAllProducts } = useContext(StoreContext);

  const initialValues = categoriesOptions.reduce(
    (initialState, { categoryName }) => {
      const isFilterSelected = categoryFilters.some(
        (category) => category.categoryName === categoryName
      );
      // eslint-disable-next-line no-param-reassign
      initialState[categoryName] = isFilterSelected;
      return initialState;
    },
    {}
  );

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

    setCategoryFilters(selectedFilters);
    removeAllProducts();
    handleClosePanel();
    fetchProducts({ ...allFilters, categoryFilters: selectedFilters });
  };

  const clearAll = (valuesObj) => {
    const valuesToClear = valuesObj;
    const clearedValues = Object.keys(valuesToClear).reduce((acc, property) => {
      acc[property] = false;
      return acc;
    }, {});
    setFilterValues(clearedValues);
    setPriceFilters({ min: 0, max: 200 });
  };

  return (
    <Form className={className} onSubmit={(e) => handleSubmit(e, filterValues)}>
      <CategoriesListWrapper>
        <Heading>Categories</Heading>
        {categoriesOptions.map(({ categoryName, productsNum }) => (
          <StyledCheckBoxElement
            key={categoryName}
            name={categoryName}
            description={categoryName}
            productsNum={productsNum}
            toggleCheckbox={toggleCheckbox}
            value={filterValues[categoryName]}
          />
        ))}
      </CategoriesListWrapper>

      <Heading>Price</Heading>
      <StyledInputRangeSlider
        minValue={0}
        maxValue={200}
        step={1}
        value={priceFilters}
        setValue={setPriceFilters}
      />

      <ButtonsWrapper>
        <StyledButton type="submit">Filter</StyledButton>
        <StyledButtonClear
          outlined
          type="button"
          onClick={() => clearAll(filterValues)}
        >
          Clear
        </StyledButtonClear>
      </ButtonsWrapper>
    </Form>
  );
};

FilterForm.propTypes = {
  className: PropTypes.string,

  handleClosePanel: PropTypes.func,
};

FilterForm.defaultProps = {
  className: '',
  handleClosePanel: () => {},
};

export default FilterForm;
