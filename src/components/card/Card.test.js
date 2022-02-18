import Card from "./Card";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../utils/test";

describe("Card", () => {
  it("should render without crash", () => {
    render(<Card title="Bruce Lee" picture="/myPicture.png" />);

    expect(screen.getByText("Bruce Lee")).toBeTruthy();
    expect(screen.getByRole("img").src).toBe("http://localhost/myPicture.png");
  });

  it("should add star around title", () => {
    render(<Card title="Bruce Lee" />);

    const title = screen.getByText("Bruce Lee");
    const wrapper = title.closest("div");

    fireEvent.click(wrapper);
    expect(title.textContent).toEqual("⭐️ Bruce Lee ⭐️");
  });
});
