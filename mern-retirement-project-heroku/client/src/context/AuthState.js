import { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../utils/setAuthToken";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    currentUser: null,
    loading: true,
    error: null,
    users: [],
    applicationSubmission: false,
    single_application: false,
    justLogged: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get("/api/login");

        dispatch({ type: "USER_LOADED", payload: res.data });
      } catch (error) {
        dispatch({ type: "AUTH_ERROR" });
      }
    }
  };

  // register user
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/register", formData, config);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: error.response.data.msg,
      });
    }
  };
  // login user
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/login", formData, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  // logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // clear errors
  const clearErrors = () => dispatch({ type: "CLEAR_ERRORS" });

  const formApplication = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/application", formData, config);

      dispatch({
        type: "FORM_APPLICATION",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "FORM_APPLICATION_FAIL",
        payload: error.response.data.errors,
      });
    }
  };

  const formEdit = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/application", formData, config);

      dispatch({
        type: "FORM_EDIT",
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: "FORM_EDIT_FAIL",
        payload: error.response.data.errors,
      });
    }
  };

  ///

  const fetchApplications = async (userId) => {
    const config = {
      params: {
        userId,
      },
    };

    try {
      const res = await axios.get("/api/applications", config);

      dispatch({
        type: "FETCH_APPLICATIONS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "APPLICATIONS_FETCH_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  ///

  const rejectApplications = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/applications", formData, config);

      dispatch({
        type: "REJECT_APPLICATION",
        payload: res.data,
      });

      // loadUser();
    } catch (error) {
      dispatch({
        type: "APPLICATION_HANDLE_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  const acceptApplications = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/applications", formData, config);

      dispatch({
        type: "ACCEPT_APPLICATION",
        payload: res.data,
      });

      // loadUser();
    } catch (error) {
      dispatch({
        type: "APPLICATION_HANDLE_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  const showSingleApplication = (show) => {
    dispatch({
      type: "SHOW_SINGLE_APPLICATION",
      payload: show,
    });
  };

  const justLogged = () => {
    dispatch({
      type: "JUST_LOGGED",
    });
  };

  const raiseError = (error) => {
    dispatch({
      type: "RAISE_ERROR",
      payload: error,
    });
  };

  ///////////////////////////////////

  return (
    <AuthContext.Provider
      value={{
        state: state,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        currentUser: state.currentUser,
        error: state.error,
        users: state.users,
        applicationSubmission: state.applicationSubmission,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        formApplication,
        fetchApplications,
        rejectApplications,
        acceptApplications,
        formEdit,
        showSingleApplication,
        justLogged,
        raiseError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
