import { useNavigate } from "react-router";
import { Button, Form, ButtonGroup } from "../../components";
import { useFormContext } from "../../context/FormContext";

export const ConfirmationPage = () => {
  const { values, validate } = useFormContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
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
        <Button type="submit">Submit</Button>
      </ButtonGroup>
    </Form>
  );
};
