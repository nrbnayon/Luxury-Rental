import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaSquareGooglePlus } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const [googleLoginUser, setGoogleLoginUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const { signInUser, loginWithGoogle, loginWithGithub } =
    useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setLoginError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setLoginError("Invalid email format");
      return;
    }

    try {
      const userCredential = await signInUser(email, password);
      const user = userCredential.user;

      if (user) {
        setLoginError("Login Successful");
        navigate(location?.state ? location.state : "/");
      }
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setLoginError("Invalid email or password");
      } else {
        setLoginError(error.message);
      }
    }
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((result) => {
        const newUser = result.user;
        setGoogleLoginUser(newUser);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
    console.log("Google login");
  };
  console.log("google state", googleLoginUser);

  const handleGithubSignIn = () => {
    loginWithGithub()
      .then((result) => {
        const newUser = result.user;
        console.log(newUser);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  return (
    <div className="hero min-h-[calc(100vh-100px)] bg-base-300 rounded-xl">
      <div className="card w-full md:w-2/3 lg:w-1/2 mx-auto shadow-lg bg-base-200">
        <form onSubmit={handleLogin} className="card-body">
          <h1 className="text-xl text-center md:text-3xl font-bold">
            Login Your Profile
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
            {loginError && <p>{loginError}</p>}
            <div className="mt-2">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </div>

          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link
              to="/register"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold hover:underline"
            >
              Sign up now
            </Link>
          </Typography>
          <div className="divider">OR</div>
          <h3 className="text-center text-2xl font-bold text-secondary mb-2">
            Continue with{" "}
          </h3>
          <div className="md:flex w-full mx-auto justify-between px-1">
            <button
              onClick={handleGithubSignIn}
              className="btn btn-primary w-full md:w-32 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white"
            >
              <FaGithub className="mr-1" />
              GitHub
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-primary w-full md:w-32 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white"
            >
              <FaSquareGooglePlus className="mr-1" />
              Google
            </button>
            <button className="btn btn-primary w-full md:w-32 flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white">
              <FaFacebook className="mr-1" />
              Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
