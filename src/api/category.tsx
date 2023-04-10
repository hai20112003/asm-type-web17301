import { useEffect, useState } from "react";
import instance from "./instance";
import { ICategory } from "../interface/category";

let accessToken = "";
if (localStorage.getItem("user")) {
  const response = JSON.parse(localStorage.getItem("user")!);
  accessToken = response.accessToken;
}

const getAllCategory = () => {
  return instance.get("/categories");
};
const getOneCategory = (id: string | undefined) => {
  return instance.get(`/categories/${id}`);
};
const addCategory = (category: ICategory) => {
  return instance.post("/categories", category, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const deleteCategory = (id: string | undefined) => {
  return instance.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const updateCategory = (category: ICategory) => {
  return instance.put("/categories/" + category._id, category, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export {
  getAllCategory,
  getOneCategory,
  addCategory,
  deleteCategory,
  updateCategory,
};
