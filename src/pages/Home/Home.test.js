import Home from "./Home";

import { screen } from "@testing-library/react";
import { render } from "../../utils/test";

describe("Home", () => {
  it("should render without title", () => {
    render(<Home />);

    expect(
      screen.getByRole(
        "heading",
        { level: 2 },
        "Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents"
      )
    ).toBeTruthy();
  });
});
