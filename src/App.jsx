import React, { Component } from "react";
import "normalize.css";
import "./App.css";
import { FormProvider } from "./context/FormContext";
import { BrowserRouter } from "react-router-dom";
import { SignUpFlow } from "./SignUpFlow";
const App = () => {
  return (
    <BrowserRouter>
      <FormProvider>
        <SignUpFlow />
      </FormProvider>
    </BrowserRouter>
  );
};

export default App;
