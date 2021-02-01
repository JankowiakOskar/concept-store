import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { StoreContext } from 'store/StoreProvider';
import { useParams } from 'react-router-dom';
import { fetchProduct } from 'actions/data';
import { getSameCategoryProducts, getFromArrByID } from 'helpers';
import { categoryQueryFilter } from 'helpers/queryHelpers';
import LoadingProvider from 'providers/LoadingProvider';
import TransitionProvider from 'providers/TransitionProvider';
import SkeletonCard from 'components/molecules/SkeletonCard/SkeletonCard';
import Carousel from 'components/organisms/Carousel/Carousel';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import DetailProductTemplate from 'templates/DetailProductTemplate';
import SectionTemplate from 'templates/SectionTemplate';

const Wrapper = styled.div`
  padding: 120px 20px 0;
  max-width: 1500px;
  margin: 0 auto;

  ${({ theme }) => theme.mq.tablet} {
    padding: 120px 40px;
  }
`;

const ProductWrapper = styled.div`
  padding: 0 5px;
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.mq.tablet} {
    padding: 0 10px;
  }
`;

const DetailPage = () => {
  const {
    data: { products, wishlist, highlightedProducts },
    handleWishlist,
    fetchProductsWithParams,
  } = useContext(StoreContext);
  const { id: ID } = useParams();
  const [fetchedProduct, setFetchedProduct] = useState({});
  const [, setError] = useState({});
  const productFromGlobalState = getFromArrByID(products, ID) || {};
  const isLocalProductExist = Object.keys(productFromGlobalState).length;
  const anyProductFound =
    isLocalProductExist || Object.keys(fetchedProduct).length;
  const productsWithSameCategory = isLocalProductExist
    ? getSameCategoryProducts(products, productFromGlobalState)
    : getSameCategoryProducts(highlightedProducts, fetchedProduct);

  useEffect(() => {
    let mounted = true;
    const fetchMatchedIdProduct = async () => {
      try {
        const matchedProduct = await fetchProduct(ID);
        setFetchedProduct(matchedProduct);
      } catch (err) {
        setError(err);
      }
    };
    if (mounted && !isLocalProductExist) {
      fetchMatchedIdProduct();
    }
    return () => {
      mounted = false;
    };
  }, [ID, isLocalProductExist]);

  useEffect(() => {
    const isFetchedProduct = Object.keys(fetchedProduct).length;
    const areProductsWithSameCategory = productsWithSameCategory.length;
    if (isFetchedProduct && !areProductsWithSameCategory) {
      const { category } = fetchedProduct;
      const categoryParam = categoryQueryFilter([category]);
      fetchProductsWithParams(categoryParam);
    }
  }, [
    fetchedProduct,
    productsWithSameCategory.length,
    fetchProductsWithParams,
  ]);

  return (
    <LoadingProvider>
      <Wrapper>
        {anyProductFound && (
          <TransitionProvider duration={0.3}>
            <DetailProductTemplate
              product={
                isLocalProductExist ? productFromGlobalState : fetchedProduct
              }
            />
          </TransitionProvider>
        )}
        <SectionTemplate title="Products that you may also like">
          <Carousel>
            {productsWithSameCategory.length > 0
              ? productsWithSameCategory.map(
                  ({ id, name, price, picture: { url } }) => (
                    <TransitionProvider customKey={id} key={id} duration={0.3}>
                      <ProductWrapper>
                        <ProductCard
                          id={id}
                          name={name}
                          price={price}
                          pictureURL={url}
                          cardType="productCard"
                          handleWishlist={handleWishlist}
                          onWishlist={wishlist.some(
                            (wishProduct) => wishProduct.id === id
                          )}
                        />
                      </ProductWrapper>
                    </TransitionProvider>
                  )
                )
              : Array.from({ length: 3 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  // eslint-disable-next-line react/no-array-index-key
                  <ProductWrapper key={index}>
                    <SkeletonCard />
                  </ProductWrapper>
                ))}
          </Carousel>
        </SectionTemplate>
      </Wrapper>
    </LoadingProvider>
  );
};

export default DetailPage;
