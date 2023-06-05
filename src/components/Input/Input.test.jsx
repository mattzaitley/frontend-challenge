import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="test placeholder" />);
    expect(screen.getByPlaceholderText("test placeholder")).not.toBeNull();
  });

  it("calls onChange callback on change event", () => {
    const onChange = jest.fn();
    render(<Input placeholder="test placeholder" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("test placeholder"), {
      target: { value: "23" },
    });
    expect(onChange).toHaveBeenCalledWith("23");
  });
});
