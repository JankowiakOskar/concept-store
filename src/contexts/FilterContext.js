import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initialState, filterReducer } from 'reducers/filterReducer';
import {
  getCategories as getCategoriesAction,
  setSelectedFilters as setSelectedFiltersAction,
  removeAllFilters as removeAllFiltersAction,
} from 'actions/filterActions';

export const FilterContext = React.createContext('');

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const getCategories = () => getCategoriesAction(dispatch);

  const setSelectedFilters = (selectedFilters) =>
    setSelectedFiltersAction(dispatch, selectedFilters);

  const removeAllFilters = () => removeAllFiltersAction(dispatch);

  useEffect(() => {
    getCategories();
  }, []);

  const values = {
    state,
    getCategories,
    setSelectedFilters,
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
