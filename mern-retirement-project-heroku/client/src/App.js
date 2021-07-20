import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import AuthState from "./context/AuthState";
import setAuthToken from "./utils/setAuthToken";
import AppForm from "./components/pages/AppForm";
import Applications from "./components/pages/Applications";
import Folder from "./components/pages/Folder";
import PrivateRoute from "./components/routing/PrivateRoute";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const classes = useStyles();
  return (
    <AuthState>
      <Router>
        <div className="container">
          <div className={classes.root}>
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/application" component={AppForm} />
              <PrivateRoute
                exact
                path="/applications"
                component={Applications}
              />
              <PrivateRoute exact path="/folder" component={Folder} />
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthState>
  );
};

export default App;
