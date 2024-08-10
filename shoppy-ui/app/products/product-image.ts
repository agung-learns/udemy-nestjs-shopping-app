import { API_URL } from "@/app/common/constants/api";

export const getProductImage = (productId: number) => {
  return `${API_URL}/images/products/${productId}.png`;
};
