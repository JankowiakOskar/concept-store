import { useEffect, useState, useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import { fetchProduct } from 'actions/data';

const useShoppingCart = () => {
  const [availableProducts, setAvailableProducts] = useState([]);

  const {
    data: { shoppingCart },
  } = useContext(StoreContext);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      const currAvailableProducts = await Promise.all(
        shoppingCart.map(({ id }) => fetchProduct(id))
      );
      setAvailableProducts(currAvailableProducts);
    };

    if (mounted) {
      fetchAll();
    }

    return () => {
      mounted = false;
    };
  }, [shoppingCart]);

  return {
    shoppingCart,
    availableProducts,
  };
};

export default useShoppingCart;
