import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const FilterContext = React.createContext('');

const FilterContextProvider = ({ children }) => {
  const [filters, dispatch] = useReducer();
  return <FilterContext.Provider>{children}</FilterContext.Provider>;
};

FilterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterContextProvider;
