import { httpClient } from "../api/httpClient";

export const loginService = (data) => {
  return httpClient.post("/auth", data);
};

export const getShop = () => {
  return httpClient.get("/shop-item/shop");
};

export const getProduct = (category, shop) => {
  let query = "";
  if (category) query = `?category=${category}`;
  if (shop) {
    if (category) query += `&shop=${shop}`;
    else query = `?shop=${shop}`;
  }
  return httpClient.get(`/shop-item/product${query}`);
};

export const getCategory = (shop) => {
  return httpClient.get(`/shop-item/category${shop ? `?shop=${shop}` : ""}`);
};

export const loadBank = () => {
  return httpClient.get("/bank", LoadTokenHeader());
};

export const loadCash = () => {
  return httpClient.get("/cash-desk", LoadTokenHeader());
};

const LoadTokenHeader = () => {
  const token = window.localStorage.getItem("token");
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export const setTransactionService = (data) => {
  return httpClient.post("/transaction?gift=false", data, LoadTokenHeader());
};

export const exportOrder = (data, credit) => {
  return httpClient.post(
    `/sale/shop?settle=true&credit=${credit}`,
    data,
    LoadTokenHeader()
  );
};
