import { fireEvent, screen } from "@testing-library/react-native";
import { Breeds } from "../../../src/screens";
import { renderComponent } from "../../utils/renderComponent";
import { useGetBreeds } from "@/src/data/useGetBreeds";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation";
import { RouteProp } from "@react-navigation/native";
import { Breed } from "@/api/generated";
import { MockBreeds } from "../../utils/mockData/breeds";
import { TestIds } from "@/src/utils/TestIds";

jest.mock("@/src/data/useGetBreeds");
jest.mock("@/src/data/useGetVotes");
jest.mock("@/src/data/useGetFavourites");
jest.useFakeTimers();

type BreedsScreenProp = NativeStackScreenProps<RootStackParamList, "Breeds">;
type BreedsRouteProp = RouteProp<RootStackParamList, "Breeds">;
describe("Breeds", () => {
  const mockOnBreedSelect = (breedID: Breed) => {};

  const mockProps: BreedsScreenProp = {
    navigation: { goBack: jest.fn() },
    route: {
      params: { onBreedSelect: mockOnBreedSelect },
    },
  };

  it("should render Loading", async () => {
    (useGetBreeds as jest.Mock).mockReturnValue({
      isLoading: true,
      data: {},
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    renderComponent(<Breeds {...mockProps} />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("should render error", async () => {
    (useGetBreeds as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {},
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isError: true,
    });
    renderComponent(<Breeds {...mockProps} />);
    expect(screen.getByText("Something went wrong.")).toBeDefined();
  });

  it("should render breeds", async () => {
    (useGetBreeds as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { pages: [MockBreeds] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isError: false,
    });
    renderComponent(<Breeds {...mockProps} />);
    expect(screen.getByTestId(TestIds.BreedsList)).toBeDefined();
  });

  it("should call next page", async () => {
    const mockFetchNextPage = jest.fn();

    (useGetBreeds as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { page: [MockBreeds] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: true,
    });

    renderComponent(<Breeds {...mockProps} />);
    expect(screen.getByTestId(TestIds.BreedsList)).toBeDefined();
    fireEvent(screen.getByTestId(TestIds.BreedsList), "endReached");
    expect(mockFetchNextPage).toHaveBeenCalled();
  });
});
