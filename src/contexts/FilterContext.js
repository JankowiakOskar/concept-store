import React, { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import routes from 'routes';
import PropTypes from 'prop-types';
import { initialState, filterReducer } from 'reducers/filterReducer';
import {
  getCategories as getCategoriesAction,
  removeAllProducts as removeAllProductsAction,
} from 'actions/data';

export const FilterContext = React.createContext('');

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const { filteredItems } = state;
  const { pathname } = useLocation();
  const getCategories = (filters) => getCategoriesAction(dispatch, filters);

  const removeAllFilteredProducts = () => removeAllProductsAction(dispatch);

  useEffect(() => {
    getCategories();
  }, []);

  const values = {
    state,
    getCategories,
    removeAllFilteredProducts,
  };

  useEffect(() => {
    const isClothesPageChanged = !pathname.includes(routes.clothes);
    if (isClothesPageChanged && filteredItems.length)
      removeAllFilteredProducts();
  }, [pathname, filteredItems]);

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
