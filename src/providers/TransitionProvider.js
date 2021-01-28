import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const wrapperVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (duration) => ({
    opacity: 1,
    transition: {
      duration: duration || 0.5,
      type: 'easeIn',
    },
  }),
  exit: { opacity: 0 },
};

const TransitionProvider = ({ children, customKey, duration }) => {
  const { pathname } = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={customKey || pathname}
        variants={wrapperVariants}
        custom={duration}
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
  customKey: PropTypes.string,
  duration: PropTypes.number,
};

TransitionProvider.defaultProps = {
  customKey: '',
  duration: 0,
};

export default TransitionProvider;
