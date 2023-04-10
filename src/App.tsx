import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import './App.css'
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./api/category";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "./api/product";
import LayoutAdmin from "./compronents/layoutAdmin";
import LayoutClient from "./compronents/layoutClient";
import { IProduct } from "./interface/product";
import Dashboard from "./pages/admin/Dashboard";
import AddCategory from "./pages/admin/categories/addCategory";
import AdminCategory from "./pages/admin/categories/category";
import UpdateCategory from "./pages/admin/categories/updateCategory";
import Adminproduct from "./pages/admin/products/Products";
import AddProduct from "./pages/admin/products/addProduct";
import UpdateProduct from "./pages/admin/products/updateProduct";
import HomePage from "./pages/clients/HomePage";
import ProductDetailPage from "./pages/clients/ProductDetail";
import Signin from "./pages/clients/signin";
import Signup from "./pages/clients/signup";
import { signin1 } from "./api/auth";
import { ISignup } from "./interface/user";
import NotFound from "./pages/notFoud";
import ProductPage from "./pages/clients/Products";
import { ICategory } from "./interface/category";

function App() {
  const [product, setProduct] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    getAllProduct().then(({ data }) => setProduct(data.data));
  }, []);
  useEffect(() => {
    getAllCategory().then(({ data }) => setCategory(data.data));
  }, []);
  const onHandleRemove = (id: string) => {
    deleteProduct(id).then(() =>
      setProduct(product.filter((item) => item._id !== id))
    );
  };
  const onHandleAdd = (product: IProduct) => {
    addProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProduct(data.data))
    );
  };
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProduct(data.data))
    );
  };

  const onHandleRemoveCate = (id: string) => {
    deleteCategory(id).then(() =>
      setCategory(category.filter((item: ICategory) => item._id !== id))
    );
  };
  const onHandleAddCate = (category: ICategory) => {
    addCategory(category).then(() =>
      getAllCategory().then(({ data }) => setCategory(data.data))
    );
  };
  const onHandleUpdateCate = (category: ICategory) => {
    updateCategory(category).then(() =>
      getAllCategory().then(({ data }) => setCategory(data.data))
    );
  };

  const onHandleAddTK = (signup: ISignup) => {
    signin1(signup);
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutClient categorys={category} />}>
          <Route index element={<HomePage products={product} />} />
          {category.map((item) => {
            return (
              <Route key={item._id} path={item._id} >
                <Route index element={<ProductPage products={product} categoryId={item._id} />} />
                <Route path=":id" element={<ProductDetailPage products={product} />} />
              </Route>
            );
          })}
          <Route path=":id" element={<ProductDetailPage products={product} />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup onAdd={onHandleAddTK} />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="products">
            <Route
              index
              element={
                <Adminproduct products={product} onRemove={onHandleRemove} />
              }
            />
            <Route
              path="add"
              element={<AddProduct onAdd={onHandleAdd} category={category} />}
            />
            <Route
              path=":id/update"
              element={
                <UpdateProduct
                  products={product}
                  onUpdate={onHandleUpdate}
                  category={category}
                />
              }
            />
          </Route>
          <Route path="categories">
            <Route
              index
              element={
                <AdminCategory
                  category={category}
                  onRemoveCate={onHandleRemoveCate}
                />
              }
            />
            <Route
              path="add"
              element={<AddCategory onAdd={onHandleAddCate} />}
            />
            <Route
              path=":id/update"
              element={
                <UpdateCategory
                  category={category}
                  onUpdateCate={onHandleUpdateCate}
                />
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
