import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UIContext } from 'contexts/GlobalUIContext';
import { StoreContext } from 'store/StoreProvider';
import { getFromArrByID, arrObjectsFromObjectPairs } from 'helpers';
import useSavedValues from 'hooks/useSavedValues';
import ProductCard, {
  DescriptionWrapper,
  OuterImageWrapper,
} from 'components/molecules/ProductCard/ProductCard';
import Modal from 'components/organisms/Modal/Modal';
import AddCartForm from 'components/organisms/AddCartForm/AddCartForm';

const ModalContent = styled.div`
  padding: 10px 0;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: ${({ theme }) => theme.zIndex.level10};
`;

const StyledProductCard = styled(ProductCard)`
  &&& {
    margin: 10px 0px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    ${DescriptionWrapper} {
      margin: 0 0 0 20px;
    }

    ${OuterImageWrapper} {
      max-width: 120px;
    }
  }
`;

const AddCartFormWrapper = styled.div`
  width: 100%;
  margin: 10px 0;
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
    data: { products },
    choosenID,
    setSelectedID,
    shoppingCartAmount,
  } = useContext(StoreContext);

  const { pathname } = useLocation();
  const [savedValues] = useSavedValues(shoppingCartAmount);
  const [savedPath] = useSavedValues(pathname);

  const closeModal = () => {
    toggleModal();
    setSelectedID('');
  };

  useEffect(() => {
    if (isOpen && savedValues !== shoppingCartAmount) {
      closeModal();
    }

    if (isOpen && savedPath !== pathname) {
      closeModal();
    }
  });

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
        <AddCartFormWrapper>
          <AddCartForm
            product={choosenProduct}
            sizesQuantity={formatedSizesQuantity}
          />
        </AddCartFormWrapper>
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
