import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import routes from 'routes';
import { StoreContext } from 'store/StoreProvider';
import { FilterContext } from 'contexts/FilterContext';
import styled from 'styled-components';
import Slider from 'components/organisms/Slider/Slider';
import CategoriesTemplate from 'templates/CategoriesTemplate';
import SectionTemplate from 'templates/SectionTemplate';
import CategoryCard from 'components/molecules/CategoryCard/CategoryCard';
import TransitionProvider from 'providers/TransitionProvider';
import LoadingProvider from 'providers/LoadingProvider';
import Carousel from 'components/organisms/Carousel/Carousel';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import manWithCamera from 'assets/images/manWithCamera.jpg';
import ArrowLink from 'components/atoms/ArrowLink/ArrowLink';
import SkeletonCard from 'components/molecules/SkeletonCard/SkeletonCard';

const Wrapper = styled(motion.div)`
  width: 100%;
  min-height: 100%;
`;

const InnerWrapper = styled.div`
  max-width: 1500px;
  margin: 60px auto;
  padding: 0 20px;

  ${({ theme }) => theme.mq.tablet} {
    padding: 0 40px;
  }
`;

const ProductCardWrapper = styled.div`
  margin: 0 5px;

  ${({ theme }) => theme.mq.desktop} {
    margin: 0 20px;
  }
`;

const StyledProductCard = styled(ProductCard)`
  ${({ theme }) => theme.mq.desktop} {
    flex: 1;
  }
`;

const StyledCategoryCard = styled(CategoryCard)`
  ${({ theme }) => theme.mq.tablet} {
    height: 280px;
  }
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
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

  ${({ theme }) => theme.mq.bigTablet} {
    height: 450px;
  }
`;

const ImageBoxDescription = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 30px 20px;
  width: 100%;
  color: ${({ theme }) => theme.white};

  ${({ theme }) => theme.mq.tablet} {
    padding: 30px 40px;
  }
`;
const ImageBoxTitle = styled.h3`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.large};

  ${({ theme }) => theme.mq.bigTablet} {
    font-size: ${({ theme }) => theme.font.size.xl};
  }
`;

const ImageBoxSubtitle = styled.p`
  font-size: ${({ theme }) => theme.font.size.medium};

  ${({ theme }) => theme.mq.bigTablet} {
    font-size: ${({ theme }) => theme.font.size.large};
  }
`;

const Home = () => {
  const {
    data: { slides, categoriesCards, products, wishlist, topSellingRatio },
    handleWishlist,
  } = useContext(StoreContext);

  const history = useHistory();

  const { setCategoryFilters, toggleCategoryCardFilter } = useContext(
    FilterContext
  );

  const handleRedirect = (categoryName) => {
    setTimeout(() => history.push(routes.clothes), 50);
    toggleCategoryCardFilter();
    setCategoryFilters([{ categoryName }]);
  };

  const topSellingProducts = products.filter(
    (product) => product.sellingRatio >= topSellingRatio
  );

  return (
    <LoadingProvider>
      <TransitionProvider>
        <Wrapper>
          <Slider slides={slides} />
          <InnerWrapper>
            <CategoriesTemplate>
              {categoriesCards.map(({ category, image }) => (
                <StyledCategoryCard
                  key={category}
                  image={image}
                  categoryType={category}
                  handleRedirect={handleRedirect}
                />
              ))}
            </CategoriesTemplate>
            <SectionTemplate
              title="Top selling products"
              subtitle="on this week"
            >
              <Carousel>
                {products.length
                  ? topSellingProducts.map(
                      ({ id, name, price, picture: { url } }) => (
                        <ProductCardWrapper key={id}>
                          <StyledProductCard
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
                    )
                  : Array.from({ length: 4 }).map((_, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <ProductCardWrapper key={index}>
                        <SkeletonCard />
                      </ProductCardWrapper>
                    ))}
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
        </Wrapper>
      </TransitionProvider>
    </LoadingProvider>
  );
};

export default Home;
