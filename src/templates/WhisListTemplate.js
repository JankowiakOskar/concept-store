import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EmptyCard from 'components/molecules/EmptyCart/EmptyCart';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  text-align: center;
`;

const WishListTemplate = ({ children }) => {
  return (
    <Wrapper>
      {children.length ? (
        children
      ) : (
        <EmptyCard
          title="You haven't any clothes on wishlist"
          description="Let's find something with your style."
          type="wishList"
        />
      )}
    </Wrapper>
  );
};

WishListTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

WishListTemplate.defaultProps = {
  children: [],
};

export default WishListTemplate;
