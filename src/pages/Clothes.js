import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { StoreContext } from 'store/StoreProvider';
import { UIContext } from 'contexts/GlobalUIContext';
import { getFromArrByID } from 'helpers';
import { limitRequest } from 'actions/data';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import ProductsTemplate from 'templates/ProductsTemplate';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import SkeletonCard from 'components/molecules/SkeletonCard/SkeletonCard';
import TransitionProvider from 'providers/TransitionProvider';
import FilterListIcon from '@material-ui/icons/FilterList';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';

const Wrapper = styled.div`
  padding: 0 20px;
  padding: 80px 20px 0;
  width: 100%;
  height: auto;
`;

const CardWrapper = styled(motion.div)`
  margin: 30px 0;
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

const cardVariants = {
  hidden: { opacity: 0 },
  vissible: {
    opacity: 1,
    transition: {
      type: 'ease',
      duration: 0.5,
    },
  },
};

const Clothes = () => {
  const {
    data: { products, wishlist, isLoadingProducts },
    addToWishlist,
    removeFromWishlist,
  } = useContext(StoreContext);
  const {
    setOpenSidePanel,
    panelTypes: { filter },
  } = useContext(UIContext);

  const handleWishlist = (id) => {
    const choosenProduct = getFromArrByID(products, id);
    const isOnWishlist = wishlist.some(
      (product) => product.id === choosenProduct.id
    );
    return isOnWishlist
      ? removeFromWishlist(id)
      : addToWishlist(choosenProduct);
  };
  return (
    <TransitionProvider>
      <Wrapper>
        <PageHeader title="Clothes" />
        <FilterButton onClick={() => setOpenSidePanel(filter)}>
          Filter <FilterIcon />
        </FilterButton>
        <ProductsTemplate>
          {products.length && !isLoadingProducts
            ? products.map(({ id, name, price, picture: { url } }) => (
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
                    handleWishlist={handleWishlist}
                    onWishlist={wishlist.some((product) => product.id === id)}
                    cardType="productCard"
                  />
                </CardWrapper>
              ))
            : Array.from({ length: limitRequest }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <CardWrapper key={index}>
                  <SkeletonCard />
                </CardWrapper>
              ))}
        </ProductsTemplate>
      </Wrapper>
    </TransitionProvider>
  );
};

export default Clothes;
