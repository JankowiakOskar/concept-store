/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
export const allDataQueryParam = '_limit=-1';

export const limitQueryParam = (currentProducts, fetchLimit) => {
  const numCurrentProducts = [...currentProducts].length;
  return numCurrentProducts === 0
    ? `_start=${numCurrentProducts}&_limit=${fetchLimit}`
    : `_start=${numCurrentProducts}&${allDataQueryParam}`;
};

export const categoryQueryFilter = (categories) => {
  const queryTemplate = 'name=';
  const filterStr = categories.reduce((queryStr, categoryName, currIdx) => {
    if (currIdx === 0) {
      queryStr = `?${queryTemplate}${categoryName}`;
    } else {
      queryStr += `&${queryTemplate}${categoryName}`;
    }
    return queryStr;
  }, '');

  return filterStr;
};
