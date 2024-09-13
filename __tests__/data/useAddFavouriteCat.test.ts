import { renderHook, act } from "@testing-library/react-native";
import { useAddFavouriteCat } from "../../src/data/useAddFavouriteCat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MockFavourites } from "../utils/mockData/favourites";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("axios");

describe("useAddFavouriteCat", () => {
  it("should handle successful mutation", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      status: 200,
      data: { message: "Data submitted successfully" },
    });

    const mockMutateAsync = jest
      .fn()
      .mockResolvedValue({ message: "Data submitted successfully" });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isLoading: false,
      isError: false,
      data: null,
      error: null,
    });

    const { result } = renderHook(() => useAddFavouriteCat());

    await act(async () => {
      await result.current.mutateAsync(MockFavourites);
    });
  });

  it("should handle loading state", async () => {
    const mockMutateAsync = jest.fn();

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
      isError: false,
      data: null,
      error: null,
    });

    const { result } = renderHook(() => useAddFavouriteCat());

    act(() => {
      result.current.mutateAsync({ some: "data" });
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it("should handle error state", async () => {
    const mockMutateAsync = jest
      .fn()
      .mockRejectedValue(new Error("Error submitting data"));

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
      isError: true,
      data: null,
      error: new Error("Error submitting data"),
    });

    const { result } = renderHook(() => useAddFavouriteCat());

    await act(async () => {
      await result.current.mutateAsync({ some: "data" }).catch(() => {});
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(new Error("Error submitting data"));
    expect(result.current.data).toBeNull();
  });
});
