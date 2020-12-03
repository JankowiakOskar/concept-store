export const getFromArrByID = (arr, id) => arr.find((el) => el.id === id)

export const calcArrItems = (arr) => arr.reduce((acc) => acc + 1, 0)

export const sleeper = (ms) => new Promise((r) => setTimeout(r, ms))

export const setItemToLocalStorage = (key, item) => {
  const itemFromStorage = JSON.parse(localStorage.getItem(key))
  const isItemExist = itemFromStorage !== null
  return isItemExist
    ? localStorage.setItem(key, JSON.stringify([...itemFromStorage, item]))
    : localStorage.setItem(key, JSON.stringify([item]))
}

export const removeItemFromLocalStorage = (key, ID) => {
  const values = JSON.parse(localStorage.getItem(key))
  const filteredValues = values.filter(({ id }) => id !== ID)
  localStorage.setItem(key, JSON.stringify(filteredValues))
}

export const arrObjectsFromObjectPairs = (obj, firstKey, secondKey) =>
  Object.keys(obj).reduce((arr, currentValue) => {
    const newObj = {}
    newObj[firstKey] = currentValue
    newObj[secondKey] = obj[currentValue]
    arr.push(newObj)

    return arr
  }, [])
