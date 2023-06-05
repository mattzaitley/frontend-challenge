import React, { createContext, useReducer, useContext } from "react";

const formContext = createContext();

const initialState = {
  email: { value: "", error: false, isPristine: true },
  password: { value: "", error: false, isPristine: true },
  name: { value: "", error: false, isPristine: true },
  color: { value: null, error: false, isPristine: true },
  terms: { value: false, error: false, isPristine: true },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.key]: {
          value: action.payload.value,
          error: false,
          isPristine: false,
        },
      };
    case "SET_ERRORS":
      const newState = { ...state };
      Object.entries(action.payload.errors).forEach(([key, error]) => {
        newState[key].error = error;
      });
      return {
        ...newState,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const setErrorsAction = (errors) => ({
  type: "SET_ERRORS",
  payload: { errors },
});

const updateFieldAction = (key, value) => ({
  type: "UPDATE_FIELD",
  payload: { key, value },
});

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const validate = (
    fields = ["email", "password", "name", "color", "terms"]
  ) => {
    console.trace("validate");
    const { email, password, name, color, terms } = state;
    const emailValid = fields.includes("email")
      ? validateEmail(email.value)
      : true;
    const passwordValid = fields.includes("password")
      ? validatePassword(password.value)
      : true;
    const nameValid = fields.includes("name") ? name.value.length > 0 : true;
    const colorValid = fields.includes("color") ? color.value !== null : true;
    const termsValid = fields.includes("terms") ? terms.value : true;

    dispatch(
      setErrorsAction({
        email: !emailValid ? "Please enter a valid email address" : false,
        password: !passwordValid
          ? "Password must be at least 8 characters"
          : false,
        name: !nameValid ? "Please enter a first name" : false,
        color: !colorValid ? "Please select a favorite color" : false,
        terms: !termsValid ? "Please agree to the terms" : false,
      })
    );

    return emailValid && passwordValid && nameValid && colorValid && termsValid;
  };

  const updateField = (key, value) => dispatch(updateFieldAction(key, value));

  const resetForm = () => dispatch({ type: "RESET_FORM" });

  return (
    <formContext.Provider value={{ state, updateField, validate, resetForm }}>
      {children}
    </formContext.Provider>
  );
};

export const useFormContext = () => {
  const { state, updateField, validate, resetForm } = useContext(formContext);
  const errors = Object.keys(state).reduce((acc, key) => {
    if (state[key].error) {
      acc[key] = state[key].error;
    }
    return acc;
  }, {});

  const values = Object.keys(state).reduce((acc, key) => {
    acc[key] = state[key].value;
    return acc;
  }, {});

  return { errors, values, updateField, validate, resetForm };
};
