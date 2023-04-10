import { Button, Image, Layout, Menu, Space } from "antd";
import Item from "antd/es/list/Item";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { IUserToken } from "../interface/user";
import { ICategory } from "../interface/category";

const { Header, Content, Footer } = Layout;
type Props = {};
const LayoutClient = ({ categorys }: { categorys: ICategory[] }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const [openLogin, setOpenLogin] = useState<boolean>(true);
  const [openProducts, setOpenProducts] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<IUserToken>();

  const [dataCategory, setDataCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    setDataCategory(categorys);
  }, [categorys]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const { user } = JSON.parse(localStorage.getItem("user")!);
      setDataUser(user);
      setOpenLogin(false);
    } else {
      setOpenLogin(true);
    }
  }, [localStorage.getItem("user")]);

  const onHandleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    let text = "Bạn có chắc chắn muốn đăng xuất không!";
    if (confirm(text) == true) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  return (
    <div className="bg-black">
      <div className="container md:mx-auto flex items-center justify-between px-12 h-[15vh]">
        <Link to={"/"}>
          <img
            className="w-16 md:w-28"
            src="https://res.cloudinary.com/dqqfnp0hk/image/upload/v1680671104/z4239361379635_4129db4f9f404aafcf286b62bfb88052_yuymyk.png"
            alt="Logo"
          />
        </Link>
        <ul
          id="menu"
          className="hidden fixed top-0 left-0 flex flex-col justify-center items-center bg-green-500 w-full h-screen md:bg-transparent md:relative md:h-auto md:flex-row md:justify-end md:flex"
        >
          <li>
            <Link
              to={"/"}
              className="block p-4 text-white hover:text-green-500"
            >
              HOME
            </Link>
          </li>
          <li
            onMouseEnter={() => setOpenProducts(true)}
            onMouseLeave={() => setOpenProducts(false)}
          >
            <div className="block p-4 text-white hover:text-green-500 cursor-pointer">
              PRODUCTS
            </div>
            {openProducts ? (
              <ul className="absolute bg-white z-10 rounded-xl">
                {dataCategory.map((item) => {
                  return (
                    <li>
                      <Link
                        key={item._id}
                        to={item._id}
                        onClick={() => setOpenProducts(false)}
                        className="block p-4 hover:bg-white hover:text-green-500 rounded-xl"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <></>
            )}
          </li>
          <li>
            {openLogin && openLogin ? (
              <Link
                to={"signin"}
                className="block text-white p-4 bg-gray-700 px-9 py-2 rounded-3xl hover:bg-green-500"
              >
                Login
              </Link>
            ) : dataUser?.role == "admin" ? (
              <Link
                to={"admin"}
                className="block p-4 text-white hover:text-green-500"
              >
                {dataUser?.name}
                <a className="uppercase"> ({dataUser.role})</a>
              </Link>
            ) : (
              <p className="block p-4 text-white hover:text-green-500">
                {dataUser?.name}
              </p>
            )}
          </li>
          {openLogin && openLogin ? (
            <></>
          ) : (
            <li>
              <Item
                className="block p-4 text-white hover:text-green-500"
                onClick={() => handleLogout()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </Item>
            </li>
          )}
        </ul>
        <div
          onClick={() => onHandleOpen()}
          id="menu-icon"
          className="z-10 md:hidden cursor-pointer relative"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white hover:text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          {open ? (
            <ul className="absolute text-white bg-green-500 border-1 border-green-500 top-10 w-40 right-0 text-right rounded-xl">
              <li className="">
                <Link
                  to={"/"}
                  className="block p-4 hover:bg-white hover:text-green-500 rounded-t-xl"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="block p-4 hover:bg-white hover:text-green-500"
                >
                  PRODUCTS
                </Link>
              </li>
              <li>
                {openLogin && openLogin ? (
                  <Link
                    to={"signin"}
                    className="block p-4 hover:bg-white hover:text-green-500"
                  >
                    Login
                  </Link>
                ) : dataUser?.role == "admin" ? (
                  <Link
                    to={"admin"}
                    className="block p-4 hover:bg-white hover:text-green-500"
                  >
                    {dataUser?.name}
                    <a className="uppercase"> ({dataUser.role})</a>
                  </Link>
                ) : (
                  <p className="block p-4 hover:bg-white hover:text-green-500">
                    {dataUser?.name}
                  </p>
                )}
              </li>
              {openLogin && openLogin ? (
                <></>
              ) : (
                <li>
                  <Item
                    className="p-4 hover:bg-white hover:text-green-500 flex justify-end"
                    onClick={() => handleLogout()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </Item>
                </li>
              )}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="min-h-[75vh]">
        <Outlet />
      </div>
      <div className="h-[10vh]">
        <div className="bg-primary">
          <div className="container px-6 md:mx-auto p-2 text-white flex flex-col md:flex-row justify-center items-center md:justify-between">
            <h2 className="text-xl my-3">VannHaii</h2>
            <div className="flex my-3">
              <div>This site was made with a</div>
              <div className="flex items-center px-9">
                <div>lot of</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="{2}"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
            {/* <div className="flex my-3">
              <img className="px-1" src="../img/a.png" alt="" />
              <img className="px-1" src="../img/b.png" alt="" />
              <img className="px-1" src="../img/c.png" alt="" />
              <img className="px-1" src="../img/d.png" alt="" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutClient;
