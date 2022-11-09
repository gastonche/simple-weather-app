import React from "react";
import { render, screen } from "@testing-library/react";
import Cities from "./Cities";
import userEvent from "@testing-library/user-event";

const cities = ['ottawa', 'tokyo', 'moscow'];
const mockOnChange = jest.fn();

function renderCities(index = 0) {
  render(<Cities cities={cities} onChange={mockOnChange} currentIndex={index} />);
}

test("Renders all three cities",  () => {
  renderCities();
  cities.forEach((city) => {
    const text = screen.getByText(new RegExp(city, 'i'));
    expect(text).toBeInTheDocument();
  })
});

test("Shows the right city as active", () => {
  renderCities(2);
  const text = screen.getByText(/moscow/i);
  expect(text).toBeInTheDocument();
  expect(text.classList.length).toBe(2);
});

test("Calls the onChange prop properly", () => {
  renderCities(2);
  const text = screen.getByText(/moscow/i);
  userEvent.click(text);
  expect(mockOnChange).toBeCalledWith(2);
});