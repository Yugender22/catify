import { act, fireEvent, screen } from "@testing-library/react-native";
import { Cats } from "../../../src/screens";
import { MockCats } from "../../utils/mockData/cats";
import { useGetCats } from "@/src/data/useGetCats";
import { useGetVote, useGetVotes } from "@/src/data/useGetVotes";
import { useGetFavourite, useGetFavourites } from "@/src/data/useGetFavourites";
import { MockVotes } from "../../utils/mockData/votes";
import { MockFavourites } from "../../utils/mockData/favourites";
import { renderComponent } from "../../utils/renderComponent";
import { TestIds } from "@/src/utils/TestIds";

jest.mock("@/src/data/useGetCats");
jest.mock("@/src/data/useGetVotes");
jest.mock("@/src/data/useGetFavourites");
jest.useFakeTimers();

describe("Cats", () => {
  it("should render Loading", async () => {
    (useGetCats as jest.Mock).mockReturnValue({
      isLoading: true,
      data: {},
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (useGetVotes as jest.Mock).mockReturnValue({
      isLoading: true,
      data: {},
    });
    (useGetFavourites as jest.Mock).mockReturnValue({
      isLoading: true,
      data: MockFavourites,
    });
    renderComponent(<Cats />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("should render error", async () => {
    (useGetCats as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {},
      isError: true,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (useGetVotes as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {},
    });
    (useGetFavourites as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MockFavourites,
    });
    renderComponent(<Cats />);
    expect(screen.getByText("Something went wrong.")).toBeDefined();
  });

  it("should render cats", async () => {
    (useGetCats as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        pages: [MockCats],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });
    (useGetVotes as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MockVotes,
    });
    (useGetVote as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockVotes.find((item) => item.image_id === image_id),
    }));
    (useGetFavourites as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MockFavourites,
    });
    (useGetFavourite as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockFavourites.find((item) => item.image_id === image_id),
    }));
    renderComponent(<Cats />);
    expect(screen.getByTestId(TestIds.CatsList)).toBeDefined();
  });

  it("should call next page", async () => {
    const mockFetchNextPage = jest.fn();
    (useGetCats as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        pages: [MockCats],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: true,
    });
    (useGetVotes as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MockVotes,
    });
    (useGetVote as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockVotes.find((item) => item.image_id === image_id),
    }));
    (useGetFavourites as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MockFavourites,
    });
    (useGetFavourite as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockFavourites.find((item) => item.image_id === image_id),
    }));
    renderComponent(<Cats />);
    expect(screen.getByTestId(TestIds.CatsList)).toBeDefined();
    fireEvent(screen.getByTestId(TestIds.CatsList), "endReached");
    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  it("should call refetch on ", async () => {
    const refetch = jest.fn();
    (useGetCats as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        pages: [MockCats],
      },
      fetchNextPage: jest.fn(),
      refetch: refetch,
      hasNextPage: true,
      isFetchingNextPage: false,
    });
    (useGetVotes as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MockVotes,
      refetch: refetch,
    });
    (useGetVote as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockVotes.find((item) => item.image_id === image_id),
    }));
    (useGetFavourites as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MockFavourites,
      refetch: refetch,
    });
    (useGetFavourite as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockFavourites.find((item) => item.image_id === image_id),
    }));
    renderComponent(<Cats />);
    expect(screen.getByTestId(TestIds.CatsList)).toBeDefined();
    const scrollView = screen.getByTestId(TestIds.CatsList);
    const { refreshControl } = scrollView.props;
    await act(async () => {
      refreshControl.props.onRefresh();
    });

    expect(refetch).toHaveBeenCalled();
  });
});
