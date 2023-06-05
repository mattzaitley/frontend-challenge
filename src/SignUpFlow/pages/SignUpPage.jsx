import { Button, Input, Form, PasswordInput } from "../../components";
import { useFormContext } from "../../context/FormContext";

export const SignUpPage = () => {
  const { updateField, values } = useFormContext();

  return (
    <Form>
      <h1>Sign up</h1>
      <Input
        placeholder="First Name"
        type="input"
        onChange={(value) => updateField("firstName", value)}
        value={values.firstName}
      />
      <Input
        placeholder="Email"
        type="email"
        onChange={(value) => updateField("email", value)}
        value={values.email}
      />
      <PasswordInput
        placeholder="Password"
        onChange={(value) => updateField("password", value)}
        value={values.password}
      />
    </Form>
  );
};
