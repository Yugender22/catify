import { renderHook, act } from "@testing-library/react-native";
import { useDeleteFavouriteCat } from "../../src/data/useDeleteFavouriteCat";
import { useMutation } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

describe("useDeleteFavouriteCat", () => {
  it("should handle successful mutation", async () => {
    const mockMutateAsync = jest
      .fn()
      .mockResolvedValue({ message: "Data submitted successfully" });

    // Mock useMutation to return successful mutation function
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
      isError: false,
      data: { message: "Data submitted successfully" },
      error: null,
    });

    const { result } = renderHook(() => useDeleteFavouriteCat());

    // Call mutateAsync with some test data
    await act(async () => {
      await result.current.mutateAsync("123");
    });

    expect(mockMutateAsync).toHaveBeenCalledWith("123");
    expect(result.current.data).toEqual({
      message: "Data submitted successfully",
    });
    expect(result.current.isPending).toBe(false);
    expect(result.current.isError).toBe(false);
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

    const { result } = renderHook(() => useDeleteFavouriteCat());

    act(() => {
      result.current.mutateAsync("123");
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

    const { result } = renderHook(() => useDeleteFavouriteCat());

    await act(async () => {
      await result.current.mutateAsync("123").catch(() => {});
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(new Error("Error submitting data"));
    expect(result.current.data).toBeNull();
  });
});
