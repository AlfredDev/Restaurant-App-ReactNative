import { useState } from "react";

export const useForm = (initilForm = {}) => {
  const [form, setForm] = useState(initilForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const resetHandler = () => {
    setForm(initilForm);
  };

  return {
    ...form,
    form,
    onInputChange,
    resetHandler,
  };
};
