jest.mock("@clerk/nextjs", () => ({
  UserButton: () => <div>UserButton</div>, // Mock UserButton
}));

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../header";

describe("Header", () => {
  it("should render the header component", () => {
    render(<Header />);
    const headingElement = screen.getByText(/Eventopia/i);
    const discoverEventsElement = screen.getByText(/Discover Events/i);
    const myAdventuresElement = screen.getByText(/My Adventures/i);
    const userButtonElement = screen.getByText(/UserButton/i);

    expect(headingElement).toBeInTheDocument();
    expect(discoverEventsElement).toBeInTheDocument();
    expect(myAdventuresElement).toBeInTheDocument();
    expect(userButtonElement).toBeInTheDocument();
  });
});
