import Navigator from "@/src/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, screen } from "@testing-library/react-native";

describe("Navigator", () => {
  it("should render cat screen", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Navigator />
      </QueryClientProvider>
    );
    await act(async () => {
      expect(screen.getByText("Loading...")).toBeDefined();
    });
  });

  it("should call navigate", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Navigator />
      </QueryClientProvider>
    );
    fireEvent.press(screen.getByTestId("AddCat-Button-TestID"));
    expect(screen.getByTestId("Form-TestID")).toBeDefined();
  });
});
