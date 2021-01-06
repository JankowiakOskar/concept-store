import { useState } from 'react';

const useSavedValues = (initialValues) => {
  const [savedValues, saveValues] = useState(initialValues || {});

  return [savedValues, saveValues];
};

export default useSavedValues;
