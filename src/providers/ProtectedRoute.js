/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import PropTypes from 'prop-types';
import routes from 'routes';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    data: { orderTrackingStatus },
    orderStatus,
  } = useContext(StoreContext);

  const isOrderingCompleted = orderTrackingStatus === orderStatus.completed;

  return (
    <Route
      {...rest}
      render={(props) =>
        isOrderingCompleted ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: `${routes.home}` }} />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
