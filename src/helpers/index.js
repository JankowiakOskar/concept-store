/* eslint-disable camelcase */
export const getFromArrByID = (arr, id) => arr.find((el) => el.id === id);

export const makeCapitalWord = (str) => {
  const capitalWord = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return capitalWord;
};

export const matchProductByKeyValue = (arr, key, value) =>
  arr.find((el) => el[key].toUpperCase() === value.toUpperCase());

export const calcArrItems = (arr) => arr.reduce((acc) => acc + 1, 0);

export const sleeper = (ms) => new Promise((r) => setTimeout(r, ms));

export const containerHasNewItem = (arr, itemObj) => {
  const [key] = Object.keys(itemObj.sizes_quantity);
  return arr.some(
    ({ id, sizes_quantity }) => id === itemObj.id && key in sizes_quantity
  );
};

export const getKeyMatchedValue = (obj, searchKey) => {
  let matchedValue;
  Object.keys(obj).forEach((key) => {
    if (key === searchKey) matchedValue = obj[key];
  });
  return matchedValue;
};

export const updateSameProduct = (arr, newItem) => {
  const [newItemSize] = Object.keys(newItem.sizes_quantity);
  const [newItemQuantity] = Object.values(newItem.sizes_quantity);
  return arr.map((item) => {
    const newItemExist =
      item.id === newItem.id && newItemSize in item.sizes_quantity;
    if (newItemExist) {
      return {
        ...item,
        sizes_quantity: { [newItemSize]: newItemQuantity },
      };
    }
    return item;
  });
};

export const setItemToLocalStorage = (key, item) => {
  const itemsContainer = JSON.parse(localStorage.getItem(key));
  const isContainerExist = itemsContainer !== null;
  if (!isContainerExist)
    return localStorage.setItem(key, JSON.stringify([item]));
  const containerContainNewItem = containerHasNewItem(itemsContainer, item);
  const replacedItems = updateSameProduct(itemsContainer, item);
  return containerContainNewItem
    ? localStorage.setItem(key, JSON.stringify([...replacedItems]))
    : localStorage.setItem(key, JSON.stringify([...itemsContainer, item]));
};

export const removeItemFromLocalStorage = (key, ID, size) => {
  const values = JSON.parse(localStorage.getItem(key));
  const filteredValues = values.filter(
    ({ id, sizes_quantity }) =>
      id !== ID || (id === ID && !sizes_quantity[size])
  );

  localStorage.setItem(key, JSON.stringify(filteredValues));
};

export const arrObjectsFromObjectPairs = (obj, firstKey, secondKey) =>
  Object.keys(obj).reduce((arr, currentValue) => {
    const newObj = {};
    newObj[firstKey] = currentValue;
    newObj[secondKey] = obj[currentValue];
    arr.push(newObj);

    return arr;
  }, []);
