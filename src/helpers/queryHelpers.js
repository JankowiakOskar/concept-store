/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
export const allDataQueryParam = '_limit=-1';

export const limitQueryParam = (currentProducts, fetchLimit) => {
  const numCurrentProducts = [...currentProducts].length;
  return numCurrentProducts === 0
    ? `?_start=${numCurrentProducts}&_limit=${fetchLimit}`
    : `?_start=${numCurrentProducts}&${allDataQueryParam}`;
};

export const categoryQueryFilter = (categories) => {
  if (!categories.length) return '';

  const queryTemplate = 'category=';
  const filterStr = categories.reduce((queryStr, categoryName, currIdx) => {
    if (currIdx === 0) {
      queryStr = `${queryTemplate}${categoryName}`;
    } else {
      queryStr += `&${queryTemplate}${categoryName}`;
    }
    return queryStr;
  }, '');

  return filterStr;
};

export const priceQueryFilter = (priceValues) => {
  const { min, max } = priceValues;
  const queryTemplate = `&price_gte=${min}&price_lte=${max}`;
  return queryTemplate;
};

export const sortQueryFilter = (sortQuery) => {
  const sortTemplate = '&_sort=';
  switch (sortQuery) {
    case 'ascPrice':
      return `${sortTemplate}price:ASC`;
    case 'dscPrice':
      return `${sortTemplate}price:DESC`;
    case 'ascName':
      return `${sortTemplate}name:ASC`;
    case 'dscName':
      return `${sortTemplate}name:DESC`;
    default:
      return '';
  }
};

export const searchQueryParam = (searchValue) =>
  `&name_contains=${searchValue}`;
