/* eslint-disable import/prefer-default-export */
export const allDataQueryParam = '_limit=-1';

export const limitQueryParam = (currentProducts, fetchLimit) => {
  const numCurrentProducts = [...currentProducts].length;
  return numCurrentProducts === 0
    ? `_start=${numCurrentProducts}&_limit=${fetchLimit}`
    : `_start=${numCurrentProducts}&${allDataQueryParam}`;
};
