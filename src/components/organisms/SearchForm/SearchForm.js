import React, { useState, useContext } from 'react';
import routes from 'routes';
import { useHistory } from 'react-router-dom';
import { FilterContext } from 'contexts/FilterContext';
import PropTypes from 'prop-types';
import SearchBar from 'components/molecules/SearchBar/SearchBar';

const SearchForm = ({ onNavBar }) => {
  const { setSearchValue } = useContext(FilterContext);
  const history = useHistory();
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => history.push(routes.clothes), 200);
    setSearchValue(value);
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
