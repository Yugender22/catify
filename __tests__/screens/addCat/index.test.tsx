import { fireEvent, screen } from "@testing-library/react-native";
import { AddCat } from "../../../src/screens";
import { renderComponent } from "../../utils/renderComponent";
import { useUploadImage } from "@/src/data/useUploadImage";
import { Breed } from "@/api/generated";
import { TestIds } from "@/src/utils/TestIds";

jest.mock("@/src/data/useUploadImage");

jest.useFakeTimers();

const mockNavigate = jest.fn();
const mockGoack = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoack,
    }),
  };
});

describe("Breeds", () => {
  const mockOnBreedSelect = (breedID: Breed) => {};

  it("should render image upload form", async () => {
    (useUploadImage as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: jest.fn,
    });
    renderComponent(<AddCat />);
    expect(screen.getByTestId(TestIds.Form)).toBeDefined();
  });

  it("should render Camera and Gallery option on Edit image click", async () => {
    (useUploadImage as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: jest.fn,
    });
    renderComponent(<AddCat />);
    fireEvent.press(screen.getByTestId(TestIds.EditImage));
  });

  it("should navigate be called when edit breed press", async () => {
    (useUploadImage as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: jest.fn,
    });
    renderComponent(<AddCat />);
    fireEvent.press(screen.getByTestId(TestIds.EditBreed));
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should show Uploading file", async () => {
    (useUploadImage as jest.Mock).mockReturnValue({
      isPending: true,
      mutateAsync: jest.fn,
    });
    renderComponent(<AddCat />);
    expect(screen.getByText("Uploading file")).toBeDefined();
  });

  it("should show error", async () => {
    (useUploadImage as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: jest.fn,
      isError: true,
    });
    renderComponent(<AddCat />);
    expect(screen.getByText("Something went wrong.")).toBeDefined();
  });

  it("should call goback on isSuccess", async () => {
    (useUploadImage as jest.Mock).mockReturnValue({
      isPending: false,
      mutateAsync: jest.fn,
      isSuccess: true,
    });
    renderComponent(<AddCat />);
    expect(mockGoack).toHaveBeenCalled();
  });
});
