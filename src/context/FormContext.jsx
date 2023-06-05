import React, { createContext, useReducer, useContext } from "react";

const formContext = createContext();

const initialState = {
  email: { value: "", error: false, isPristine: true },
  password: { value: "", error: false, isPristine: true },
  firstName: { value: "", error: false, isPristine: true },
  favoriteColor: { value: null, error: false, isPristine: true },
  agreeToTerms: { value: false, error: false, isPristine: true },
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
      action.payload.errors.forEach((error) => {
        newState[error].error = true;
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
  return password.length > 8;
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const validate = (
    fields = ["email", "password", "firstName", "favoriteColor", "agreeToTerms"]
  ) => {
    const { email, password, firstName, favoriteColor, agreeToTerms } = state;
    const emailValid = fields.includes("email")
      ? validateEmail(email.value)
      : true;
    const passwordValid = fields.includes("password")
      ? validatePassword(password.value)
      : true;
    const firstNameValid = fields.includes("firstName")
      ? firstName.value.length > 0
      : true;
    const favoriteColorValid = fields.includes("favoriteColor")
      ? favoriteColor.value !== null
      : true;
    const agreeToTermsValid = fields.includes("agreeToTerms")
      ? agreeToTerms.value
      : true;

    dispatch(
      setErrorsAction({
        email: !emailValid ? "Please enter a valid email address" : false,
        password: !passwordValid
          ? "Password must be at least 8 characters"
          : false,
        firstName: !firstNameValid ? "Please enter a first name" : false,
        favoriteColor: !favoriteColorValid
          ? "Please select a favorite color"
          : false,
        agreeToTerms: !agreeToTermsValid ? "Please agree to the terms" : false,
      })
    );

    return (
      emailValid &&
      passwordValid &&
      firstNameValid &&
      favoriteColorValid &&
      agreeToTerms.value
    );
  };

  const updateField = (key, value) => dispatch(updateFieldAction(key, value));

  console.log("what");
  return (
    <formContext.Provider value={{ state, updateField, validate }}>
      {children}
    </formContext.Provider>
  );
};

export const useFormContext = () => {
  const { state, updateField, validate } = useContext(formContext);
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

  return { errors, values, updateField, validate };
};
