import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

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
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
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
