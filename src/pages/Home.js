import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import routes from 'routes';
import { StoreContext } from 'store/StoreProvider';
import styled from 'styled-components';
import SectionHeading from 'components/atoms/SectionHeading/SectionHeading';
import Slider from 'components/organisms/Slider/Slider';
import CategoriesTemplate from 'templates/CategoriesTemplate';
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

const Section = styled.section`
  padding: 50px 0;
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
  } = useContext(StoreContext);

  const topSellingProducts = products.filter(
    (product) => product.sellingRatio >= 8.2
  );

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
            <Section>
              <SectionHeading
                title="Top selling products"
                subtitle="on this week"
              />
              <Carousel>
                {topSellingProducts.map(
                  ({ id, name, price, picture: { url } }) => (
                    <ProductCard
                      key={id}
                      id={id}
                      name={name}
                      price={price}
                      pictureURL={url}
                      cardType="productCard"
                      handleWishlist={handleWishlist}
                      onWishlist={wishlist.some((product) => product.id === id)}
                    />
                  )
                )}
              </Carousel>
            </Section>
          </InnerWrapper>
          <ImageBox url={manWithCamera}>
            <ImageBoxDescription>
              <ImageBoxTitle>New winter trends</ImageBoxTitle>
              <ImageBoxSubtitle>which you cannot miss</ImageBoxSubtitle>
              <ArrowLink routeURL={routes.clothes} title="Check out" />
            </ImageBoxDescription>
          </ImageBox>
          <InnerWrapper>
            <Section>
              <SectionHeading
                title="Our partners"
                subtitle="well known brands"
              />
              <PartnersCarousel />
            </Section>
          </InnerWrapper>
        </Wrapper>
      </TransitionProvider>
    </LoadingProvider>
  );
};

export default Home;
