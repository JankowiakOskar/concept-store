import { useState, useContext, useEffect } from 'react';
import { StoreContext } from 'store/StoreProvider';
import { calcArrItems } from 'helpers';

const useNumStoredItems = (ref) => {
  const { data } = useContext(StoreContext);
  const searchedItems = data[ref];
  const [numItems, setNumItems] = useState(calcArrItems(searchedItems));

  useEffect(() => {
    setNumItems(calcArrItems(searchedItems));
  }, [searchedItems]);

  return [numItems];
};

export default useNumStoredItems;
