import { Route, Routes } from "react-router";
import {
  SignUpPage,
  MoreInfoPage,
  ConfirmationPage,
  SuccessPage,
  ErrorPage,
} from "./pages";
export const SignUpFlow = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/more-info" element={<MoreInfoPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
};
