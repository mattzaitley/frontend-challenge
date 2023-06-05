import { useNavigate } from "react-router";
import { useFormContext } from "../../context/FormContext";
import { Button, ButtonGroup, Form } from "../../components";

export const SuccessPage = () => {
  const navigate = useNavigate();
  const { resetForm } = useFormContext();
  const handleSubmit = () => {
    resetForm();
    navigate("/");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Success</h1>
      <p>You should receive a confirmation email soon.</p>
      <ButtonGroup>
        <Button type="submit">Restart</Button>
      </ButtonGroup>
    </Form>
  );
};
