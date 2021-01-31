import React, { useReducer, useEffect, useState } from 'react';
import routes from 'routes';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { initialState, filterReducer } from 'reducers/filterReducer';
import {
  getCategories as getCategoriesAction,
  setSelectedFilters as setSelectedFiltersAction,
  setPriceFilters as setPriceFiltersAction,
  setSortMethod as setSortMethodAction,
  setSearchValue as setSearchValueAction,
  removeAllFilters as removeAllFiltersAction,
} from 'actions/filterActions';

export const FilterContext = React.createContext('');

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const { categoryFilters, priceFilters, sortMethod, searchValue } = state;
  const [isSelectedCategoryCard, setSelectedCategoryCard] = useState(false);
  const { pathname } = useLocation();
  const allFilters = {
    categoryFilters,
    priceFilters,
    sortMethod,
    searchValue,
  };
  const isPriceFilterChanged =
    Object.values(priceFilters).reduce((acc, value) => {
      // eslint-disable-next-line no-param-reassign
      acc += value;
      return acc;
    }, 0) !== 200;

  const anyFilterProvided =
    categoryFilters.length ||
    Object.keys(sortMethod).length ||
    isSelectedCategoryCard ||
    searchValue.length >= 1 ||
    isPriceFilterChanged;

  const getCategories = () => getCategoriesAction(dispatch);

  const setCategoryFilters = (selectedFilters) =>
    setSelectedFiltersAction(dispatch, selectedFilters);

  const setPriceFilters = (priceValues) =>
    setPriceFiltersAction(dispatch, priceValues);

  const setSortMethod = (sort) => setSortMethodAction(dispatch, sort);

  const setSearchValue = (value) => setSearchValueAction(dispatch, value);

  const removeAllFilters = () => removeAllFiltersAction(dispatch);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const anyClothesRoute = pathname.includes(routes.clothes);
    if (!anyClothesRoute) {
      removeAllFilters();
    }
  }, [pathname]);

  const values = {
    state,
    allFilters,
    setSelectedCategoryCard,
    setCategoryFilters,
    setPriceFilters,
    setSortMethod,
    setSearchValue,
    removeAllFilters,
    isSelectedCategoryCard,
    anyFilterProvided,
    isPriceFilterChanged,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
