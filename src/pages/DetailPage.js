import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { StoreContext } from 'store/StoreProvider';
import { useParams } from 'react-router-dom';
import { fetchProduct, fetchProductsWithParams } from 'actions/data';
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
    dispatch,
    data: { wishlist },
    allProducts,
    handleWishlist,
  } = useContext(StoreContext);
  const { id: ID } = useParams();
  const foundProduct = getFromArrByID(allProducts, ID);
  const [matchedProduct, setMatchedProduct] = useState(foundProduct || {});
  const [, setError] = useState({});
  const isProductFound = Object.keys(matchedProduct).length;
  const productsWithSameCategory = isProductFound
    ? getSameCategoryProducts(allProducts, matchedProduct)
    : [];

  useEffect(() => {
    let mounted = true;
    const fetchMatchedIdProduct = async () => {
      try {
        const fetchedProduct = await fetchProduct(ID);
        setMatchedProduct(fetchedProduct);
      } catch (err) {
        setError(err);
      }
    };
    if (mounted) {
      fetchMatchedIdProduct();
    }
    return () => {
      mounted = false;
    };
  }, [ID]);

  useEffect(() => {
    if (isProductFound && !productsWithSameCategory.length) {
      const { category } = matchedProduct;
      const categoryParam = categoryQueryFilter([category]);
      fetchProductsWithParams(dispatch, categoryParam);
    }
  }, [
    dispatch,
    isProductFound,
    productsWithSameCategory.length,
    matchedProduct,
  ]);

  return (
    <LoadingProvider>
      <Wrapper>
        {isProductFound && (
          <TransitionProvider duration={0.3}>
            <DetailProductTemplate product={matchedProduct} />
          </TransitionProvider>
        )}
        <SectionTemplate title="Products that you may also like">
          <Carousel>
            {productsWithSameCategory.length
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
