import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../state/auth/authSlice";
import { useRouter } from "next/navigation";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const loginAuth = async (email, password) => {
    dispatch(loginAsync({ email, password }));
  };
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn || window.localStorage.getItem("token") != null) {
      router.push("/");
    }
  }, [isLoggedIn]);
  return (
    <>
      <div className="font-serif w-screen h-screen bg-background flex flex-col  justify-center items-center">
        <div className="m-4 h-2/6 w-full  grid place-items-center">
          <h1 className="gradient text-6xl p-4 ">Login !</h1>
        </div>
        <div className="w-full h-4/6 border-hidden flex justify-center items-start">
          <div className="w-2/6 flex flex-col items-center justify-start ">
            <form className="max-w-sm w-2/4 mx-auto">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-secondary focus:outline-none border-hidden text-white text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 "
                  placeholder="name@flowbite.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-white ">
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-secondary focus:outline-none border-hidden text-white text-sm rounded-lg block w-full p-2.5 "
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex justify-start align-middle mt-8">
                <button
                  type="button"
                  className="w-2/4 text-white bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9] rounded-md h-10"
                  onClick={() => {
                    loginAuth(email, password);
                  }}
                >
                  login
                </button>
              </div>
            </form>
            <div className="w-2/4 mt-5 text-md text-white inline-block">
              <p className="inline-block mr-2">or create a new account </p>
              <p className="gradient inline-block">
                {" "}
                <Link href={"/signup"}>Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default login;
