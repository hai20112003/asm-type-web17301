import instance from "./instance";
import { IId, IProduct } from "../interface/product";
import { useEffect, useState } from "react";

let accessToken = "";
if (localStorage.getItem("user")) {
  const response = JSON.parse(localStorage.getItem("user")!);
  accessToken = response.accessToken;
}

const getAllProduct = () => {
  return instance.get("/products");
};
const getOneProduct = (id: string | undefined) => {
  return instance.get(`/products/${id}`);
};
const addProduct = (product: IProduct) => {
  return instance.post("/products", product, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const deleteProduct = (id: string | undefined) => {
  return instance.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const updateProduct = (product: IProduct) => {
  return instance.put("/products/" + product._id, product, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export {
  getAllProduct,
  getOneProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
