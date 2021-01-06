import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initialState, filterReducer } from 'reducers/filterReducer';
import {
  getCategories as getCategoriesAction,
  setSelectedFilters as setSelectedFiltersAction,
  setPriceFilters as setPriceFiltersAction,
  setSortMethod as setSortMethodAction,
  removeAllFilters as removeAllFiltersAction,
} from 'actions/filterActions';

export const FilterContext = React.createContext('');

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const { categoryFilters, priceFilters, sortMethod } = state;

  const allFilters = {
    categoryFilters,
    priceFilters,
    sortMethod,
  };

  const getCategories = () => getCategoriesAction(dispatch);

  const setCategoryFilters = (selectedFilters) =>
    setSelectedFiltersAction(dispatch, selectedFilters);

  const setPriceFilters = (priceValues) =>
    setPriceFiltersAction(dispatch, priceValues);

  const setSortMethod = (sort) => setSortMethodAction(dispatch, sort);

  const removeAllFilters = () => removeAllFiltersAction(dispatch);

  useEffect(() => {
    getCategories();
  }, []);

  const values = {
    state,
    allFilters,
    getCategories,
    setCategoryFilters,
    setPriceFilters,
    setSortMethod,
    removeAllFilters,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
