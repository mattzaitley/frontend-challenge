import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../context/FormContext";
import { Button, ButtonGroup, Form, Checkbox } from "../../components";
import AsyncSelect from "react-select/async";

export const MoreInfoPage = () => {
  const { updateField, values, validate, errors } = useFormContext();
  const navigate = useNavigate();

  const getColorOptions = () => {
    return fetch("http://localhost:3001/api/colors")
      .then((res) => res.json())
      .then((data) =>
        data.map((color) => ({
          label: `${color.charAt(0).toUpperCase()}${color.slice(1)}`,
          value: color,
        }))
      );
  };

  const handleSubmit = () => {
    if (!validate(["color", "terms"])) {
      return;
    }
    navigate("/confirmation");
  };

  const dropdownStyleOverrides = errors.color ? { borderColor: "crimson" } : {};

  return (
    <Form onSubmit={handleSubmit}>
      <h1>More Info</h1>
      <AsyncSelect
        loadOptions={getColorOptions}
        cacheOptions
        defaultOptions
        onChange={(option) => updateField("color", option.value)}
        styles={{ control: (base) => ({ ...base, ...dropdownStyleOverrides }) }}
      />
      {errors.color && <p>{errors.color}</p>}
      <Checkbox
        label={<>I agree to the terms and conditions</>}
        onChange={(value) => updateField("terms", value)}
        value={values.terms}
        error={errors.terms}
      />
      <ButtonGroup>
        <Button href="/">Back</Button>
        <Button type="submit">Next</Button>
      </ButtonGroup>
    </Form>
  );
};
