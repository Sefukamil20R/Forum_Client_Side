import { createContext, useContext, useEffect, useReducer } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import NotFound from "./components/NotFound.jsx";
import Ask from "./pages/Ask.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Answer from "./pages/Answer.jsx";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import { reducer } from "./context/reducer.jsx";
import Loading from "./components/Loading.jsx";

import axios from "./axios.jsx";

const AppProvider = createContext();
export const useAppData = () => useContext(AppProvider);

function App() {
  const navigate = useNavigate(); // Define navigate using useNavigate()

  const initialState = {
    user: "",
    loading: false,
    alert: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const checkUser = async () => {
    const token = localStorage.getItem("token");
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get("/user/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response && response.data) {
        const { data } = response;
        dispatch({ type: "SET_USER", payload: data.username });
      } else {
        // Handle the case where response or response.data is undefined
        console.log("Response or response.data is undefined");
      }
    } catch (error) {
      // Handle other errors here
      console.log("Error:", error);
      localStorage.setItem("token", "");
      dispatch({ type: "LOGOUT" });
      navigate("/"); // Use navigate here
    }
  };

  useEffect(() => {
    if (!state.user) {
      checkUser();
    }
  }, [state.user, navigate]); // Add navigate to the dependency array

  return (
    <AppProvider.Provider value={{ state, dispatch }}>
      <Header />
      {state.loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <Ask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-answer"
            element={
              <ProtectedRoute>
                <Answer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:id"
            element={
              <ProtectedRoute>
                <Answer />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <Footer />
    </AppProvider.Provider>
  );
}

export default App;
