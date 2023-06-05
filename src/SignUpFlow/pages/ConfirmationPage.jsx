import { useNavigate } from "react-router";
import { Button, Form, ButtonGroup, Spinner } from "../../components";
import { useFormContext } from "../../context/FormContext";
import { useState } from "react";

export const ConfirmationPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { values, validate } = useFormContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsFetching(true);
    if (!validate()) navigate("/error");
    fetch("http://localhost:3001/api/submit", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          navigate("/success");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        navigate("/error");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Confirmation</h1>
      <ul>
        <li>First Name: {values.name}</li>
        <li>Email: {values.email}</li>
        <li>Password: {values.password.replaceAll(/./g, "*")}</li>
        <li>Favorite Color: {values.color}</li>
        <li>Terms and Conditions: {values.terms ? "Agreed" : "Not Agreed"}</li>
      </ul>
      <ButtonGroup>
        <Button href="/more-info">Back</Button>
        <Button type="submit">{isFetching ? <Spinner /> : "Submit"}</Button>
      </ButtonGroup>
    </Form>
  );
};
