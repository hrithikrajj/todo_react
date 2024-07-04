import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signupAsync } from "../state/auth/authSlice";
const signup = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();
  const startSignup = (username, email, password1, password2) => {
    dispatch(signupAsync({ username, email, password1, password2 }));
  };
  useEffect(() => {
    if (window.localStorage.getItem("token") != null) {
      router.push("/");
    }
  }, [isLoggedIn]);
  return (
    <>
      <div className="font-serif w-screen h-screen bg-background flex flex-col  justify-center items-center">
        <div className="m-4 h-2/6 w-full  grid place-items-center">
          <h1 className="gradient text-6xl p-4 ">Sign up !</h1>
        </div>
        <div className="w-full h-4/6 border-hidden flex justify-center items-start">
          <div className="w-2/6 flex flex-col items-center justify-start ">
            <form className="max-w-sm w-2/4 mx-auto">
              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  class="bg-secondary focus:outline-none border-hidden text-white text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 "
                  placeholder="Jack raj"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  class="bg-secondary focus:outline-none border-hidden text-white text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 "
                  placeholder="name@flowbite.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mb-5">
                <label class="block mb-2 text-sm font-medium text-white ">
                  Enter password
                </label>
                <input
                  type="password"
                  id="password1"
                  class="bg-secondary focus:outline-none border-hidden text-white text-sm rounded-lg block w-full p-2.5 "
                  required
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
              <div class="mb-5">
                <label class="block mb-2 text-sm font-medium text-white ">
                  Renter Your password
                </label>
                <input
                  type="password"
                  id="password2"
                  class="bg-secondary focus:outline-none border-hidden text-white text-sm rounded-lg block w-full p-2.5 "
                  required
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-start align-middle mt-8">
                <button
                  type="button"
                  className="w-2/4 text-white bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9] rounded-md h-10"
                  onClick={() =>
                    startSignup(username, email, password1, password2)
                  }
                >
                  Sing up
                </button>
              </div>
            </form>
            <div className="w-2/4 mt-5 text-md text-white inline-block">
              <p className="inline-block mr-2">Already have a account </p>
              <p className="gradient inline-block">
                {" "}
                <Link href={"/login"}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default signup;
