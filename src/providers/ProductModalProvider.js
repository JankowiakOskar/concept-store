import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UIContext } from 'contexts/GlobalUIContext';
import { StoreContext } from 'store/StoreProvider';
import { getFromArrByID, arrObjectsFromObjectPairs } from 'helpers';
import ProductCard, {
  DescriptionWrapper,
} from 'components/molecules/ProductCard/ProductCard';
import Modal from 'components/organisms/Modal/Modal';
import AddCartForm from 'components/organisms/AddCartForm/AddCartForm';

const StyledProductCard = styled(ProductCard)`
  &&& {
    margin: 10px 0 20px;
    flex-direction: row;
    align-items: flex-start;

    ${DescriptionWrapper} {
      margin: 10px 0 0 20px;
    }
  }
`;

const ModalContent = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.level10};
`;

const ProductModalProvider = ({ children }) => {
  const {
    modal: {
      isOpen,
      toggleModal,
      choosenType,
      modalTypes: { addNewProduct },
    },
  } = useContext(UIContext);

  const {
    data: { products, shoppingCart },
    choosenID,
    setSelectedID,
  } = useContext(StoreContext);

  const closeModal = () => {
    toggleModal();
    setSelectedID('');
  };

  useCallback(() => closeModal(), [shoppingCart, closeModal]);

  const RenderModalContent = () => {
    const choosenProduct = getFromArrByID(products, choosenID);
    const {
      id,
      name,
      price,
      sizes_quantity: sizesQuantity,
      picture: { url },
    } = choosenProduct;

    const formatedSizesQuantity =
      choosenProduct &&
      arrObjectsFromObjectPairs(sizesQuantity, 'size', 'amount');

    return (
      <ModalContent>
        <StyledProductCard id={id} name={name} price={price} pictureURL={url} />
        <AddCartForm
          product={choosenProduct}
          sizesQuantity={formatedSizesQuantity}
        />
      </ModalContent>
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen && choosenType === addNewProduct}
        closeHandler={closeModal}
      >
        {choosenID && <RenderModalContent />}
      </Modal>
      {children}
    </>
  );
};

ProductModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductModalProvider;
