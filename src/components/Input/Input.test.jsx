import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="test placeholder" />);
    expect(screen.getByPlaceholderText("test placeholder")).toBeInTheDocument();
  });

  it("calls onChange callback on change event", () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Input placeholder="test placeholder" onChange={onChange} />);
    user.keyboard(screen.getByPlaceholderText("test placeholder"), "23");
    expect(onChange).toHaveBeenCalledWith("23");
  });
});
