import React, { useReducer, useEffect, useState } from 'react';
import routes from 'routes';
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
import { useLocation } from 'react-router-dom';

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

  const getCategories = () => getCategoriesAction(dispatch);

  const setCategoryFilters = (selectedFilters) =>
    setSelectedFiltersAction(dispatch, selectedFilters);

  const setPriceFilters = (priceValues) =>
    setPriceFiltersAction(dispatch, priceValues);

  const setSortMethod = (sort) => setSortMethodAction(dispatch, sort);

  const setSearchValue = (value) => setSearchValueAction(dispatch, value);

  const removeAllFilters = () => removeAllFiltersAction(dispatch);

  const toggleCategoryCardFilter = () =>
    setSelectedCategoryCard(!isSelectedCategoryCard);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const isClothesPageChanged = !pathname.includes(routes.clothes);
    if (isClothesPageChanged) removeAllFilters();
  }, [pathname]);

  const values = {
    state,
    allFilters,
    getCategories,
    setCategoryFilters,
    setPriceFilters,
    setSortMethod,
    setSearchValue,
    removeAllFilters,
    toggleCategoryCardFilter,
    isSelectedCategoryCard,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
