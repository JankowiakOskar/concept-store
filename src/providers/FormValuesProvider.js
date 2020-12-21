import { useState } from 'react';

const FormValuesProvider = ({ children }) => {
  const [savedValues, setValues] = useState({});

  const handleSavingValues = (valuesToSave) => {
    setValues(valuesToSave);
  };
  console.log(children);
  const values = {
    savedValues,
    handleSavingValues,
  };

  return children(values);
};

export default FormValuesProvider;
