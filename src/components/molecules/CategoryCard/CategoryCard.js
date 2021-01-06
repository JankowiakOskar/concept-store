import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import { Link } from 'react-router-dom';
import routes from 'routes';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';

const WrapperCard = styled.div`
  margin: 10px 0;
  position: relative;
  width: 100%;
  height: 250px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 10px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(rgba(53, 129, 200, 0.2), rgba(0, 25, 32, 0.3));
  }
`;

const CategoryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CategoryCard = ({ className, image, categoryType: categoryName }) => {
  const { removeAllProducts, fetchProducts } = useContext(StoreContext);

  const handleRedirect = () => {
    removeAllProducts();
    fetchProducts([{ categoryName }]);
  };
  return (
    <Link to={routes.clothes}>
      <WrapperCard className={className} onClick={handleRedirect}>
        <CategoryImg src={image} />
        <StyledButton secondary>{categoryName}</StyledButton>
      </WrapperCard>
    </Link>
  );
};

CategoryCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  categoryType: PropTypes.string.isRequired,
};

CategoryCard.defaultProps = {
  className: '',
};

export default CategoryCard;
