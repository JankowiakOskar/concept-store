import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import { UIContext } from 'contexts/GlobalUIContext';
import { FilterContext } from 'contexts/FilterContext';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransitionProvider from 'providers/TransitionProvider';
import EmptyCart from 'components/molecules/EmptyCart/EmptyCart';
import Button, { HoverPrimaryBtn } from 'components/atoms/Button/Button';
import Loader from 'react-loader-spinner';
import FilterListIcon from '@material-ui/icons/FilterList';
import { baseIconStyle } from 'components/atoms/ExternalIcon/ExternalIcon';
import Dropdown from 'components/molecules/Dropdown/Dropdown';
import FilterForm from 'components/organisms/FilterForm/FilteForm';
import GridTemplate from 'templates/GridTemplate';

const Wrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: flex;

  width: 100%;
`;

const Aside = styled.aside`
  display: none;
  height: auto;
  margin: 0 30px 0 0;

  ${({ theme }) => theme.mq.desktop} {
    display: block;
  }
`;

const StyledGridTemplate = styled(GridTemplate)`
  position: relative;
`;

const StyledFilterForm = styled(FilterForm)`
  &&& {
    padding: 0 30px 0 0;
  }
`;

const SortsWrapper = styled.div`
  min-height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme }) => theme.mq.desktop} {
    justify-content: flex-end;
  }
`;

const StyledDropdown = styled(Dropdown)`
  &&& {
    width: 175px;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.grey100};
  margin: 50px auto;

  ${HoverPrimaryBtn};

  ${({ theme }) => theme.mq.tablet} {
    grid-column: 2;
  }
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

  ${({ theme }) => theme.mq.desktop} {
    display: none;
  }
`;

const EmptyCartWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterIcon = styled(FilterListIcon)`
  ${baseIconStyle}
`;

const sortOptions = [
  { label: 'From lowest price', value: 'ascPrice' },
  { label: 'From highest price', value: 'dscPrice' },
  { label: 'A - Z', value: 'ascName' },
  { label: 'Z - A', value: 'dscName' },
];

const ProductsTemplate = ({ children, className, isAllProductsFetched }) => {
  const {
    data: { isLoadingProducts, products: currProducts },
    fetchProducts,
    removeAllProducts,
  } = useContext(StoreContext);

  const {
    state: { sortMethod },
    setSortMethod,
    allFilters,
  } = useContext(FilterContext);

  const {
    sidePanel: {
      setOpenSidePanel,
      panelTypes: { filter },
    },
  } = useContext(UIContext);

  const notFoundProducts = !isLoadingProducts && !currProducts.length;

  const isSortMethodSelected = Object.keys(sortMethod).length;

  const handleSorting = (sort) => {
    setSortMethod(sort);
    removeAllProducts();
    fetchProducts({ ...allFilters, sortMethod: sort });
  };
  return (
    <TransitionProvider>
      <Wrapper className={className}>
        <SortsWrapper>
          <FilterButton onClick={() => setOpenSidePanel(filter)}>
            Filter <FilterIcon />
          </FilterButton>
          <StyledDropdown
            title={isSortMethodSelected ? sortMethod.label : 'Sort methods'}
            listType="labels"
            list={sortOptions}
            setValue={handleSorting}
          />
        </SortsWrapper>
        <InnerWrapper>
          <Aside>
            <StyledFilterForm />
          </Aside>
          <StyledGridTemplate>
            {children}
            {notFoundProducts && (
              <EmptyCartWrapper>
                <EmptyCart
                  title="We can't match any products"
                  description="Please, change your filters"
                />
              </EmptyCartWrapper>
            )}
            {!isAllProductsFetched && (
              <StyledButton onClick={() => fetchProducts({}, currProducts)}>
                {isLoadingProducts ? (
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height={50}
                    width={50}
                  />
                ) : (
                  'Load more'
                )}
              </StyledButton>
            )}
          </StyledGridTemplate>
        </InnerWrapper>
      </Wrapper>
    </TransitionProvider>
  );
};

ProductsTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isAllProductsFetched: PropTypes.bool.isRequired,
};

ProductsTemplate.defaultProps = {
  className: '',
  children: [],
};

export default ProductsTemplate;
