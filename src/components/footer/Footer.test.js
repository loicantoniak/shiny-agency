import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../utils/test";
import Footer from "./Footer";

describe("Footer", () => {
  it("should render without crash", async () => {
    render(<Footer />);
  });

  it("should change theme", async () => {
    render(<Footer />);

    const nightModeButton = screen.getByRole("button");
    expect(nightModeButton.textContent).toBe("Changer le mode ☀️");

    fireEvent.click(nightModeButton);
    expect(nightModeButton.textContent).toBe("Changer le mode 🌙");
  });
});
