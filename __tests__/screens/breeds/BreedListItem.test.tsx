import { fireEvent, screen } from "@testing-library/react-native";
import { renderComponent } from "../../utils/renderComponent";
import { BreedListItem } from "../../../src/screens/breeds/BreedListItem";
import { MockBreeds } from "../../utils/mockData/breeds";
jest.useFakeTimers();

describe("BreedListItem", () => {
  const mockPress = jest.fn();

  it("should render breeed item", async () => {
    renderComponent(
      <BreedListItem breed={MockBreeds[0]} onPress={mockPress} />
    );
    expect(screen.getByText("Abyssinian")).toBeDefined();
  });

  it("should call mockPress on button click", async () => {
    renderComponent(
      <BreedListItem breed={MockBreeds[0]} onPress={mockPress} />
    );
    fireEvent.press(screen.getByText("Abyssinian"));
    expect(mockPress).toHaveBeenCalled();
  });
});
