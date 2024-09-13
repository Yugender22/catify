import { fireEvent, screen } from "@testing-library/react-native";
import { MockCats } from "../../utils/mockData/cats";
import { useGetVote } from "../../../src/data/useGetVotes";
import { useGetFavourite } from "../../../src/data/useGetFavourites";
import { MockVotes } from "../../utils/mockData/votes";
import { MockFavourites } from "../../utils/mockData/favourites";
import { renderComponent } from "../../utils/renderComponent";
import { CatListItem } from "../../../src/screens/cats/CatListItem";
import { useAddFavouriteCat } from "../../../src/data/useAddFavouriteCat";
import { useVoteCat } from "@/src/data/useVoteCat";
import { useDeleteFavouriteCat } from "@/src/data/useDeleteFavouriteCat";
import { TestIds } from "@/src/utils/TestIds";

jest.mock("@/src/data/useGetVotes");
jest.mock("@/src/data/useGetFavourites");
jest.mock("@/src/data/useVoteCat");
jest.mock("@/src/data/useAddFavouriteCat");
jest.mock("@/src/data/useDeleteFavouriteCat");
jest.useFakeTimers();

describe("CatListItem", () => {
  it("should render cats", async () => {
    (useGetVote as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockVotes.find((item) => item.image_id === image_id),
    }));
    (useGetFavourite as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockFavourites.find((item) => item.image_id === image_id),
    }));
    (useAddFavouriteCat as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: jest.fn,
    });
    (useDeleteFavouriteCat as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: jest.fn(),
    });
    (useVoteCat as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: jest.fn,
    });
    renderComponent(<CatListItem cat={MockCats[1]} />);
    expect(screen.getByTestId(TestIds.CatImage)).toBeDefined();
    expect(screen.getAllByRole("button")).toBeDefined();
  });

  it("should call add favourite on button click", async () => {
    (useGetVote as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockVotes.find((item) => item.image_id === image_id),
    }));
    (useGetFavourite as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockFavourites.find((item) => item.image_id === image_id),
    }));
    const mutateAsync = jest.fn();
    (useAddFavouriteCat as jest.Mock).mockReturnValue({
      isPending: true,
      mutateAsync: mutateAsync,
    });
    (useDeleteFavouriteCat as jest.Mock).mockReturnValue({
      isPending: true,
      mutateAsync: mutateAsync,
    });
    (useVoteCat as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: mutateAsync,
    });
    renderComponent(<CatListItem cat={MockCats[1]} />);
    fireEvent.press(screen.getAllByRole("button")[0]);
    expect(mutateAsync).toHaveBeenCalled();
  });

  it("should call remove favourite on button click", async () => {
    (useGetVote as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockVotes.find((item) => item.image_id === image_id),
    }));
    (useGetFavourite as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockFavourites.find((item) => item.image_id === image_id),
    }));
    const mutateAsync = jest.fn();
    (useAddFavouriteCat as jest.Mock).mockReturnValue({
      isPending: true,
      mutateAsync: mutateAsync,
    });
    (useDeleteFavouriteCat as jest.Mock).mockReturnValue({
      isPending: true,
      mutateAsync: mutateAsync,
    });
    (useVoteCat as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: mutateAsync,
    });
    renderComponent(<CatListItem cat={MockCats[0]} />);
    fireEvent.press(screen.getAllByRole("button")[0]);
    expect(mutateAsync).toHaveBeenCalled();
  });

  it("should call vote on up vote button click", async () => {
    (useGetVote as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockVotes.find((item) => item.image_id === image_id),
    }));
    (useGetFavourite as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockFavourites.find((item) => item.image_id === image_id),
    }));
    const mutateAsync = jest.fn();
    (useAddFavouriteCat as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: mutateAsync,
    });
    (useDeleteFavouriteCat as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: mutateAsync,
    });
    (useVoteCat as jest.Mock).mockReturnValue({
      isPending: true,
      mutateAsync: mutateAsync,
    });
    renderComponent(<CatListItem cat={MockCats[0]} />);
    fireEvent.press(screen.getAllByRole("button")[1]);
    expect(mutateAsync).toHaveBeenCalled();
    renderComponent(<CatListItem cat={MockCats[1]} />);
    fireEvent.press(screen.getAllByRole("button")[1]);
  });

  it("should call vote on down vote button click", async () => {
    (useGetVote as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockVotes.find((item) => item.image_id === image_id),
    }));
    (useGetFavourite as jest.Mock).mockImplementation((image_id) => ({
      isLoading: false,
      data: MockFavourites.find((item) => item.image_id === image_id),
    }));
    const mutateAsync = jest.fn();
    (useAddFavouriteCat as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: mutateAsync,
    });
    (useDeleteFavouriteCat as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: mutateAsync,
    });
    (useVoteCat as jest.Mock).mockReturnValue({
      isPending: true,
      mutateAsync: mutateAsync,
    });
    renderComponent(<CatListItem cat={MockCats[0]} />);
    fireEvent.press(screen.getAllByRole("button")[2]);
    expect(mutateAsync).toHaveBeenCalled();
    renderComponent(<CatListItem cat={MockCats[1]} />);
    fireEvent.press(screen.getAllByRole("button")[2]);
  });
});
