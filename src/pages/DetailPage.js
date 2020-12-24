import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StoreContext } from 'store/StoreProvider';
import { useParams, useLocation } from 'react-router-dom';
import { getFromArrByID, setItemToLocalStorage } from 'helpers';
import Carousel from 'components/organisms/Carousel/Carousel';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import DetailProductTemplate from 'templates/DetailProductTemplate';
import SectionTemplate from 'templates/SectionTemplate';
import LoadingProvider from 'providers/LoadingProvider';

const Wrapper = styled.div`
  padding: 120px 20px;
`;

const ProductWrapper = styled.div`
  padding: 0 2px;
`;

const DetailPage = () => {
  const {
    data: { products, wishlist },
    handleWishlist,
  } = useContext(StoreContext);
  const storedProductRef = useRef(null);
  const { id: ID } = useParams();
  const { pathname } = useLocation();

  const choosenProduct = getFromArrByID(products, ID);

  if (!choosenProduct) {
    const [storedProduct] = JSON.parse(localStorage.getItem('choosenProduct'));
    storedProductRef.current = storedProduct;
  }

  useEffect(() => {
    if (choosenProduct) setItemToLocalStorage('choosenProduct', choosenProduct);

    return () => localStorage.removeItem('choosenProduct');
  }, [choosenProduct]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getSameCategoryProducts = (arrProducts, selectedProduct) => {
    return arrProducts.filter(
      ({ id, category }) =>
        id !== selectedProduct.id && category === selectedProduct.category
    );
  };

  const productsWithSameCategory = getSameCategoryProducts(
    products,
    storedProductRef.current || choosenProduct
  );
  return (
    <LoadingProvider>
      <Wrapper>
        <DetailProductTemplate
          product={choosenProduct || storedProductRef.current}
        />
        <SectionTemplate title="Products that you may also like">
          <Carousel>
            {productsWithSameCategory.map(
              ({ id, name, price, picture: { url } }) => (
                <ProductWrapper key={id}>
                  <ProductCard
                    id={id}
                    name={name}
                    price={price}
                    pictureURL={url}
                    cardType="productCard"
                    handleWishlist={handleWishlist}
                    onWishlist={wishlist.some((product) => product.id === id)}
                  />
                </ProductWrapper>
              )
            )}
          </Carousel>
        </SectionTemplate>
      </Wrapper>
    </LoadingProvider>
  );
};

export default DetailPage;
