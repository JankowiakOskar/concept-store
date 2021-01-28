import { useState, useEffect } from 'react';

const useSavedValues = (values) => {
  const [savedValues, saveValues] = useState('');

  useEffect(() => {
    saveValues(values);
  }, [values]);

  return [savedValues, saveValues];
};

export default useSavedValues;
