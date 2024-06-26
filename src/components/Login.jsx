import { useState, useRef, useEffect } from "react";
import { useAppData } from "../App";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function Auth() {
  const { state, dispatch } = useAppData();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true); // State variable to track whether login form should be displayed initially

  const emailDom = useRef();
  const passDom = useRef();

  const usernameDom = useRef();
  const emailrDom = useRef();
  const passrDom = useRef();
  const fnameDom = useRef();
  const lnameDom = useRef();

  const inputAlert = (dom) => {
    dom.current.classList.add("bg-red-100");
    dom.current.classList.add("border-1");
    dom.current.classList.add("border-red-500");
    dom.current.focus();
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const login = async (e) => {
    e.preventDefault();
    emailDom.current.classList.remove("bg-red-100");
    emailDom.current.classList.remove("border-1");
    emailDom.current.classList.remove("border-red-500");

    passDom.current.classList.remove("bg-red-100");
    passDom.current.classList.remove("border-1");
    passDom.current.classList.remove("border-red-500");
    if (!emailDom.current.value) {
      inputAlert(emailDom);
      return;
    }
    if (!passDom.current.value) {
      inputAlert(passDom);
      return;
    }

    try {
      dispatch({ type: "CLEAR_ALERT" });
      setLoading(true);
      const { data } = await axios.post("/user/login", {
        email: emailDom.current.value,
        password: passDom.current.value,
      });

      localStorage.setItem("token", data.token);
      dispatch({ type: "SET_USER", payload: data.username });
      navigate("/home");
      setLoading(false);
    } catch ({ response }) {
      setLoading(false);
      dispatch({
        type: "ALERT",
        payload: response?.data?.error
          ? "Incorrect email or password"
          : "Something went wrong try again later",
      });
      console.log(response.data);
    }
  };

  const register = async (e) => {
    e.preventDefault();

    usernameDom.current.classList.remove("bg-red-100");
    usernameDom.current.classList.remove("border-1");
    usernameDom.current.classList.remove("border-red-500");

    fnameDom.current.classList.remove("bg-red-100");
    fnameDom.current.classList.remove("border-1");
    fnameDom.current.classList.remove("border-red-500");

    lnameDom.current.classList.remove("bg-red-100");
    lnameDom.current.classList.remove("border-1");
    lnameDom.current.classList.remove("border-red-500");

    emailrDom.current.classList.remove("bg-red-100");
    emailrDom.current.classList.remove("border-1");
    emailrDom.current.classList.remove("border-red-500");


    passrDom.current.classList.remove("bg-red-100");
    passrDom.current.classList.remove("border-1");
    passrDom.current.classList.remove("border-red-500");


    if (!usernameDom.current.value) {
      inputAlert(usernameDom);
      return;
    }
    if (!fnameDom.current.value) {
      inputAlert(fnameDom);
      return;
    }
    if (!lnameDom.current.value) {
      inputAlert(lnameDom);
      return;
    }
    if (!emailrDom.current.value) {
      inputAlert(emailrDom);
      return;
    }
    if (!passrDom.current.value) {
      inputAlert(passrDom);
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/user/register", {
        username: usernameDom.current.value,
        firstname: fnameDom.current.value,
        lastname: lnameDom.current.value,
        email: emailrDom.current.value,
        password: passrDom.current.value,
      });

      localStorage.setItem("token", data.token);
      dispatch({ type: "SET_USER", payload: data.username });
      navigate("/home");
      setLoading(false);
    } catch ({ response }) {
      setLoading(false);
      dispatch({
        type: "ALERT",
        payload: response?.data?.error
          ? response.data.error
          : "Something went wrong try again later",
      });
      console.log(response?.data);
    }
  };

  useEffect(() => {
    setIsLoginForm(true);
  }, []);

  return (
    <div className="text-center">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            {isLoginForm ? (
              <div className="login" style={{ margin: "20px" }}>
                {" "}
                <h5>Login to your account</h5>
                <div>
                  Don’t have an account?{" "}
                  <span
                    onClick={toggleForm}
                    className="text-blue-500 cursor-pointer"
                  >
                    Create a new account
                  </span>
                </div>
                <form onSubmit={login} className="">
                  <div className="form-input mb-3">
                    <input
                      ref={emailDom}
                      type="email"
                      placeholder="Email address"
                      className="px-4 py-2 w-full  border focus:outline-none rounded"
                    />
                  </div>
                  <div className="form-input relative mb-3">
                    <input
                      ref={passDom}
                      type={`${show ? "text" : "password"}`}
                      placeholder="Password"
                      className="px-4 py-2 w-full border focus:outline-none rounded"
                    />
                    <span
                      onClick={() => setShow(!show)}
                      className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-orange-500"
                    >
                      {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </span>
                  </div>
                  <div className="forgot mb-3">
                    <a href="#" className="text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                  <div className="btn-login">
                    <button
                      disabled={loading}
                      className={`${loading ? "cursor-not-allowed opacity-50" : ""
                        } bg-blue-500 text-white font-semibold px-4 py-2 w-full rounded ${loading ? "" : "hover:bg-blue-600"
                        }`}
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="register" style={{ margin: "20px" }}>
                {" "}
                {/* Apply margin to the registration form */}
                <h5>Join the network</h5>
                <div>
                  Already have an account?{" "}
                  <span
                    onClick={toggleForm}
                    className="text-blue-500 cursor-pointer"
                  >
                    Sign in
                  </span>
                </div>
                <form onSubmit={register}>
                  <div className="form-input mb-3">
                    <input
                      ref={usernameDom}
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="px-4 py-2 w-full  border focus:outline-none rounded"
                    />
                  </div>

                  <div className="flex mb-3">
                    <div className="form-input w-1/2 pr-2">
                      <input
                        ref={fnameDom}
                        className="px-4 py-2 w-full  border focus:outline-none rounded"
                        type="text"
                        placeholder="First name"
                      />
                    </div>
                    <div className="form-input w-1/2 pl-2">
                      <input
                        ref={lnameDom}
                        className="px-4 py-2 w-full  border focus:outline-none rounded"
                        type="text"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div className="form-input mb-3">
                    <input
                      ref={emailrDom}
                      type="email"
                      placeholder="Email address"
                      className="px-4 py-2 w-full  border focus:outline-none rounded"
                    />
                  </div>
                  <div className="form-input relative mb-3">
                    <input
                      ref={passrDom}
                      type={`${show ? "text" : "password"}`}
                      placeholder="Password"
                      className="px-4 py-2 w-full  border focus:outline-none rounded"
                    />
                    <span
                      onClick={() => setShow(!show)}
                      className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-orange-500 "
                    >
                      {show ? <AiOutlineEye className="text-gray-500" /> : <AiOutlineEyeInvisible />}
                    </span>
                  </div>
                  <div className="privacy text-xs mb-3">
                    I agree to the{" "}
                    <a href="#" className="text-blue-500">
                      privacy policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500">
                      terms of service
                    </a>
                    .
                  </div>
                  <div className="btn-register mb-3">
                    <button
                      disabled={loading}
                      className={`${loading ? "cursor-not-allowed opacity-50" : ""
                        } bg-blue-500 text-white font-semibold px-4 py-2 w-full rounded ${loading ? "" : "hover:bg-blue-600"
                        }`}
                      type="submit"
                    >
                      Agree and Join
                    </button>
                  </div>
                  <div className="text-blue-500 cursor-pointer">
                    <span onClick={toggleForm}>Already have an account?</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
