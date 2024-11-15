import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import toast from "react-hot-toast";
import axios from "axios";
import config from "../../config/api"
import { LoginProps, FirebaseUser, ApiResponse } from "../../interface/type";

const Login = ({ navigateTo }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const SignInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user as FirebaseUser;
      const firebaseToken = user.accessToken ?? "";

      // Make the API request with axios 
      const response = await axios.post<ApiResponse>(`${config.baseUrl}/v1/login`, {
        token: firebaseToken,
      });

      // Access the access token from the API response
      const accessToken = response.data?.data?.access_token;
      localStorage.setItem("accessToken", accessToken);

      // Navigate to the profile page
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Sorry, could not log in");
    }
  };
  const handleLogin = () => {
    // Todo for integrate login api
    toast.error("Sorry, could not log in");
  }
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate(navigateTo ?? "/profile");
    }
  }, [navigate, navigateTo]);

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1 text-blue-500 text-lg font-semibold">Sign in with</label>
          <div className="flex items-center justify-center border-gray-300">
            <button
              className="mt-2 w-full px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              onClick={SignInWithGoogle}
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span className="text-gray-800">Login with Google</span>
            </button>
          </div>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <form
          onSubmit={handleLogin}
        >
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            {/* <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a> */}
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <span
            className="text-red-600 hover:underline hover:underline-offset-4 cursor-pointer"
            onClick={handleRegister}
          >
            Register
          </span>
        </div>
      </div>
    </section>
  );
};

export default Login;
