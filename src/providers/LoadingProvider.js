import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import LoadingPage from 'pages/LoadingPage';

const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoading = () => setLoading(!isLoading);

    if (isLoading) setTimeout(handleLoading, 1000);

    return () => clearTimeout(handleLoading);
  }, [isLoading]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isLoading ? <LoadingPage isLoading={isLoading} /> : children}
    </AnimatePresence>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node,
};

LoadingProvider.defaultProps = {
  children: {},
};

export default LoadingProvider;
