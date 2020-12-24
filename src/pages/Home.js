import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import routes from 'routes';
import { StoreContext } from 'store/StoreProvider';
import { FilterContext } from 'contexts/FilterContext';
import styled from 'styled-components';
import Slider from 'components/organisms/Slider/Slider';
import CategoriesTemplate from 'templates/CategoriesTemplate';
import SectionTemplate from 'templates/SectionTemplate';
import CategoryCard from 'components/molecules/CategoryCard/CategoryCard';
import LoadingProvider from 'providers/LoadingProvider';
import TransitionProvider from 'providers/TransitionProvider';
import Carousel from 'components/organisms/Carousel/Carousel';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import manWithCamera from 'assets/images/manWithCamera.jpg';
import ArrowLink from 'components/atoms/ArrowLink/ArrowLink';
import PartnersCarousel from 'components/organisms/PartnersCarousel/PartnersCarousel';

const Wrapper = styled(motion.div)`
  width: 100%;
  min-height: 100%;
`;

const InnerWrapper = styled.div`
  padding: 0 20px;
`;

const ProductCardWrapper = styled.div`
  margin: 0 2px;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 300px;
  background-image: linear-gradient(
      rgba(53, 129, 200, 0.3),
      rgba(0, 25, 32, 0.8)
    ),
    url(${({ url }) => url});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ImageBoxDescription = styled.div`
  padding: 30px 0;
  width: 90%;
  color: ${({ theme }) => theme.white};
`;
const ImageBoxTitle = styled.h3`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.large};
`;

const ImageBoxSubtitle = styled.p`
  font-size: ${({ theme }) => theme.font.size.medium};
`;

const Home = () => {
  const {
    data: { slides, categoriesCards, products, wishlist },
    handleWishlist,
    fetchProducts,
    removeAllProducts,
  } = useContext(StoreContext);

  const {
    state: { selectedFilters },
    removeAllFilters,
  } = useContext(FilterContext);

  const topSellingProducts = products.filter(
    (product) => product.sellingRatio >= 8.2
  );

  useEffect(() => {
    const isAnyFilterSelected = Object.keys(selectedFilters).length;
    if (isAnyFilterSelected) {
      const fetchProductsActions = () => {
        removeAllFilters();
        removeAllProducts();
        fetchProducts();
      };
      fetchProductsActions();
    }
  }, [fetchProducts, removeAllFilters, selectedFilters, removeAllProducts]);

  return (
    <LoadingProvider>
      <TransitionProvider>
        <Wrapper>
          <Slider slides={slides} />
          <InnerWrapper>
            <CategoriesTemplate>
              {categoriesCards.map(({ category, image }) => (
                <CategoryCard
                  key={category}
                  image={image}
                  categoryType={category}
                />
              ))}
            </CategoriesTemplate>
            <SectionTemplate
              title="Top selling products"
              subtitle="on this week"
            >
              <Carousel>
                {topSellingProducts.map(
                  ({ id, name, price, picture: { url } }) => (
                    <ProductCardWrapper key={id}>
                      <ProductCard
                        id={id}
                        name={name}
                        price={price}
                        pictureURL={url}
                        cardType="productCard"
                        handleWishlist={handleWishlist}
                        onWishlist={wishlist.some(
                          (product) => product.id === id
                        )}
                      />
                    </ProductCardWrapper>
                  )
                )}
              </Carousel>
            </SectionTemplate>
          </InnerWrapper>
          <ImageBox url={manWithCamera}>
            <ImageBoxDescription>
              <ImageBoxTitle>New winter trends</ImageBoxTitle>
              <ImageBoxSubtitle>which you cannot miss</ImageBoxSubtitle>
              <ArrowLink routeURL={routes.clothes} title="Check out" />
            </ImageBoxDescription>
          </ImageBox>
          <InnerWrapper>
            <SectionTemplate title="Our partners" subtitle="well known brands">
              <PartnersCarousel />
            </SectionTemplate>
          </InnerWrapper>
        </Wrapper>
      </TransitionProvider>
    </LoadingProvider>
  );
};

export default Home;
