import {
  Button,
  Input,
  Form,
  PasswordInput,
  ButtonGroup,
} from "../../components";
import { useFormContext } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const { updateField, values, validate, errors } = useFormContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!validate(["name", "email", "password"])) return;
    navigate("/more-info");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <Input
        placeholder="First Name"
        type="input"
        onChange={(value) => updateField("name", value)}
        value={values.name}
        error={errors.name}
      />
      <Input
        placeholder="Email"
        type="email"
        onChange={(value) => updateField("email", value)}
        value={values.email}
        error={errors.email}
      />
      <PasswordInput
        placeholder="Password"
        onChange={(value) => updateField("password", value)}
        value={values.password}
        error={errors.password}
      />
      <ButtonGroup>
        <Button type="submit">Next</Button>
      </ButtonGroup>
    </Form>
  );
};
