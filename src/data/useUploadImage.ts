import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_KEY } from "../utils/Constants";
import { ImagePickerAsset } from "expo-image-picker";
import axios from "axios";
import FormData from "form-data";

interface UploadProps {
  image: ImagePickerAsset;
  subId?: string;
  breedIds?: string;
}

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ image, subId, breedIds }: UploadProps) => {
      return uploadImage(image, subId, breedIds);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cats"] });
    },
  });
};

const uploadImage = async (
  image: ImagePickerAsset,
  subId?: string,
  breedIds?: string
) => {
  const fileName = image.uri.split("/").pop();
  const formData = new FormData();
  formData.append("file", {
    uri: image.uri,
    name: fileName,
    type: image.mimeType,
  });
  formData.append("sub_id", subId || "");
  formData.append("breed_ids", breedIds || "");

  const apiClient = axios.create({
    baseURL: "https://api.thecatapi.com/v1",
  });
  return apiClient.request({
    url: "images/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": API_KEY,
    },
    method: "POST",
  });
};
