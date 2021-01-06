import { useState } from 'react';

const ActiveProvider = ({ defaultActive, children }) => {
  const [active, setActive] = useState(defaultActive);

  const changeActive = (to) => {
    setActive(to);
  };

  return children({ active, changeActive });
};

export default ActiveProvider;
