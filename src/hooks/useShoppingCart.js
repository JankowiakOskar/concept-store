import { useEffect, useState, useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import axios from 'axios';

const useShoppingCart = () => {
  const [availableProducts, setAvailableProducts] = useState([]);

  const {
    data: { shoppingCart },
  } = useContext(StoreContext);

  useEffect(() => {
    let mounted = true;
    const fetchProduct = async (id) => {
      try {
        const { data: product } = await axios.get(
          `http://192.168.100.17:8001/products/${id}`
        );
        return product;
      } catch (err) {
        throw new Error(
          'Something went wrong or product is not available anymore'
        );
      }
    };
    const fetchAll = async () => {
      const currAvilableProducts = await Promise.all(
        shoppingCart.map(({ id }) => fetchProduct(id))
      );

      setAvailableProducts(currAvilableProducts);
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
