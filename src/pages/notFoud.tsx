import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 15000);
  }, []);
  return (
    <div className="bg-black text-white h-[100vh]">
      <h1 className="text-9xl text-center pt-56">404</h1>
      <div className="flex gap-x-1 justify-center mt-16">
        <p>Bạn muốn chuyển về trang chủ click vào đây </p>
        <button onClick={() => navigate("/")} className="bg-green-500 px-2 rounded-md hover:opacity-[0.7]">here</button>
      </div>
    </div>
  );
};
export default NotFound;
