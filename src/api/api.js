import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7179/api/",
});

export const registerStore = (storeData) => {
  return api.post("Stores/RegisterStore", storeData);
};

export const loginStore = (loginCredentials) => {
  return api.post("Stores/LoginStore", loginCredentials);
};

export const getProducts = () => {
  const token = sessionStorage.getItem("token");

  return api.get("Products/Inventory", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createOrder = (orderDetails) => {
  const token = sessionStorage.getItem("token");
  return api.post("Orders/CreateOrder", orderDetails, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchCategories = () => {
  const token = sessionStorage.getItem("token");
  return api.get("Products/Category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToInventory = (productData) => {
  const token = sessionStorage.getItem("token");
  return api.post("Products/CreateProduct", productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const orderHistory = (num) => {
  const token = sessionStorage.getItem("token");
  return api.get(`Orders/OrderHistory/${num}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
