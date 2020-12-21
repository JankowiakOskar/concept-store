import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { StoreContext } from 'store/StoreProvider';
import { FilterContext } from 'contexts/FilterContext';
import { UIContext } from 'contexts/GlobalUIContext';
import { limitRequest } from 'actions/data';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import ProductsTemplate from 'templates/ProductsTemplate';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import SkeletonCardsProvider from 'providers/SkeletonCardProvider';
import TransitionProvider from 'providers/TransitionProvider';
import FilterListIcon from '@material-ui/icons/FilterList';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';

const Wrapper = styled.div`
  padding: 0 20px;
  padding: 80px 20px 0;
  width: 100%;
  height: auto;
`;

const FilterButton = styled.button`
  padding: 0 15px;
  width: 100px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.grey200};
  border-radius: 15px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.primaryLight};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const FilterIcon = styled(FilterListIcon)`
  ${baseIconStyle}
`;

const StyledProductsTemplate = styled(ProductsTemplate)`
  && {
    margin: 30px 0;
  }
`;
export const CardWrapper = styled(motion.div)`
  margin: 30px 0;
`;

export const cardVariants = {
  hidden: { opacity: 0 },
  vissible: {
    opacity: 1,
    transition: {
      type: 'ease',
      duration: 1,
    },
  },
};

const Clothes = () => {
  const {
    data: { products, wishlist, isLoadingProducts, isAllProductsFetched },
    handleWishlist,
  } = useContext(StoreContext);

  const {
    state: { filteredItems, numFetchingItems, isFiltering },
  } = useContext(FilterContext);

  const arrWithProducts = [...products, ...filteredItems];

  const {
    setOpenSidePanel,
    panelTypes: { filter },
  } = useContext(UIContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TransitionProvider>
      <Wrapper>
        <PageHeader title="Clothes" />
        <FilterButton onClick={() => setOpenSidePanel(filter)}>
          Filter <FilterIcon />
        </FilterButton>
        <StyledProductsTemplate
          isAllProductsFetched={products.length ? isAllProductsFetched : true}
        >
          <SkeletonCardsProvider
            isLoading={isFiltering || isLoadingProducts}
            limitCardRender={numFetchingItems || limitRequest}
          >
            {arrWithProducts.length > 0 &&
              arrWithProducts.map(({ id, name, price, picture: { url } }) => (
                <CardWrapper
                  variants={cardVariants}
                  initial="hidden"
                  animate="vissible"
                  key={id}
                >
                  <ProductCard
                    id={id}
                    name={name}
                    price={price}
                    pictureURL={url}
                    handleWishlist={(ID) => handleWishlist(ID, arrWithProducts)}
                    onWishlist={wishlist.some((product) => product.id === id)}
                    cardType="productCard"
                  />
                </CardWrapper>
              ))}
          </SkeletonCardsProvider>
        </StyledProductsTemplate>
      </Wrapper>
    </TransitionProvider>
  );
};

export default Clothes;
