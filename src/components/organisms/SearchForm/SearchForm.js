import React, { useState, useContext } from 'react';
import routes from 'routes';
import { useHistory, useLocation } from 'react-router-dom';
import { StoreContext } from 'store/StoreProvider';
import { FilterContext } from 'contexts/FilterContext';
import { UIContext } from 'contexts/GlobalUIContext';
import PropTypes from 'prop-types';
import SearchBar from 'components/molecules/SearchBar/SearchBar';

const SearchForm = ({ onNavBar }) => {
  const { setSearchValue, allFilters } = useContext(FilterContext);
  const { fetchProducts, removeAllProducts } = useContext(StoreContext);
  const {
    sidePanel: { isOpen, hideSidePanel },
  } = useContext(UIContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isClothesRoute = pathname === routes.clothes;
    setSearchValue(value);
    removeAllProducts();
    if (isOpen) {
      hideSidePanel();
    }
    if (!isClothesRoute) {
      history.push(routes.clothes);
    }
    if (value.length) {
      fetchProducts({ ...allFilters, searchValue: value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchBar
        onNavBar={onNavBar}
        value={value}
        setValue={(searchValue) => {
          setValue(searchValue);
          setSearchValue(searchValue);
        }}
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
