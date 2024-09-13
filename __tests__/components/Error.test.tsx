import { Error } from "@/src/components";
import { render, screen } from "@testing-library/react-native";

describe("Error", () => {
  it("should render error", () => {
    render(<Error />);
    expect(screen.getByText("Something went wrong.")).toBeDefined();
  });
});
