import Card from "./Card";
import { screen } from "@testing-library/react";
import { render } from "../../utils/test";

describe("Card", () => {
  it("should render without crash", () => {
    render(<Card title="Bruce Lee" picture="/myPicture.png" />);

    expect(screen.getByText("Bruce Lee")).toBeTruthy();
    expect(screen.getByRole("img").src).toBe("http://localhost/myPicture.png");
  });
});
