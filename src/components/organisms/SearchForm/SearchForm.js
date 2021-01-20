import React, { useState, useContext } from 'react';
import routes from 'routes';
import { useHistory } from 'react-router-dom';
import { FilterContext } from 'contexts/FilterContext';
import { StoreContext } from 'store/StoreProvider';
import PropTypes from 'prop-types';
import SearchBar from 'components/molecules/SearchBar/SearchBar';

const SearchForm = ({ onNavBar }) => {
  const { setSearchValue, allFilters } = useContext(FilterContext);
  const history = useHistory();
  const { fetchProducts, removeAllProducts } = useContext(StoreContext);
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => history.push(routes.clothes), 200);
    setSearchValue(value);
    removeAllProducts();
    fetchProducts({ ...allFilters, searchValue: value });
    setSearchValue('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchBar
        onNavBar={onNavBar}
        value={value}
        setValue={(searchValue) => setValue(searchValue)}
      />
    </form>
  );
};

SearchForm.propTypes = {
  onNavBar: PropTypes.bool,
};

SearchForm.defaultProps = {
  onNavBar: false,
};

export default SearchForm;
