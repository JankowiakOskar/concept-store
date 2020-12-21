import { useState } from 'react';

const useSavedValues = () => {
  const [savedValues, setValues] = useState({});

  const handleSavingValues = (valuesObj) => setValues(valuesObj);

  return [savedValues, handleSavingValues];
};

export default useSavedValues;
