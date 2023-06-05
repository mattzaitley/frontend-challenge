import { useNavigate } from "react-router";
import { useFormContext } from "../../context/FormContext";
import { Button, ButtonGroup, Form } from "../../components";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { resetForm } = useFormContext();
  const handleSubmit = () => {
    resetForm();
    navigate("/");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Error</h1>
      <p>Uh oh, something went wrong!</p>
      <ButtonGroup>
        <Button type="submit">Restart</Button>
      </ButtonGroup>
    </Form>
  );
};
