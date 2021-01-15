import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const wrapperVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      type: 'ease',
      duration: 0.5,
    },
  },
  exit: { opacity: 0 },
};

const TransitionProvider = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={pathname}
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

TransitionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransitionProvider;
