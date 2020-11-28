export const getFromArrByID = (arr, id) => arr.find((el) => el.id === id)

export const setItemToLocalStorage = (key, item) => {
  const itemFromStorage = JSON.parse(localStorage.getItem(key))
  const isItemExist = itemFromStorage !== null
  return isItemExist
    ? localStorage.setItem(key, JSON.stringify([...itemFromStorage, item]))
    : localStorage.setItem(key, JSON.stringify([item]))
}

export const removeItemFromLocalStorage = (key, item) => {
  const values = JSON.parse(localStorage.getItem(key))
  const filteredValues = values.filter(({ id }) => id !== item.id)
  localStorage.setItem(key, JSON.stringify(filteredValues))
}
