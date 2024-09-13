import { Loading } from "@/src/components";
import { render, screen } from "@testing-library/react-native";

describe("Loading", () => {
  it("should render Loading", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });
});
