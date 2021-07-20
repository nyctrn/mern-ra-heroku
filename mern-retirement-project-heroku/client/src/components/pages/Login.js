import { useState, useContext, useEffect } from "react";
import AuthContext from "./../../context/authContext";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  CssBaseline,
  Paper,
} from "@material-ui/core";
import { Close, Check, PermIdentity } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated, state } = authContext;

  useEffect(() => {
    if (isAuthenticated && state.currentUser.title) {
      setTimeout(() => {
        props.history.push("/");
      }, 1400);
    } else if (isAuthenticated) {
      setTimeout(() => {
        props.history.push("/");
      }, 1400);
    }

    if (error) {
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }

    if (error) {
      setUser({
        email: "",
        password: "",
      });
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  const classes = useStyles();

  return (
    <Container style={{ height: "80vh", minWidth: "31rem" }} maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3}>
        <div className={classes.paper} style={{ padding: "1rem" }}>
          <Avatar
            style={
              isAuthenticated
                ? {
                    backgroundColor: "#4caf50",
                    transitionDuration: "0.3s",
                    transitionTimingFunction: "ease-out",
                    transitionDelay: "0.2s",
                  }
                : error
                ? {
                    backgroundColor: "red",
                    transitionDuration: "0.5s",
                    transitionTimingFunction: "ease-out",
                    transitionDelay: "0.3s",
                  }
                : {
                    transitionDuration: "0.5",
                    transitionTimingFunction: "ease-out",
                    transitionDelay: "0.3s",
                  }
            }
            className={classes.avatar}
          >
            <PermIdentity />
          </Avatar>
          <Typography component="h1" variant="h5">
            Σύνδεση χρήστη{" "}
            {isAuthenticated && (
              <>
                <span>επιτυχής!</span>
                <Check
                  style={{
                    color: "#4caf50",
                    verticalAlign: "bottom",
                    fontSize: "2rem",
                  }}
                />
              </>
            )}
          </Typography>
          <form onSubmit={onSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ style: { fontSize: "1.4rem" } }}
                  value={email}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  disabled={isAuthenticated}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ style: { fontSize: "1.4rem" } }}
                  value={password}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Κωδικός χρήστη"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  disabled={isAuthenticated}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={
                isAuthenticated
                  ? { background: "#99a1a2e0", color: "#ffffff" }
                  : { backgroundColor: "#349aa0", color: "#ffffff" }
              }
              className={classes.submit}
            >
              ΣΥΝΔΕΣΗ
            </Button>{" "}
            {error && (
              <div
                style={{
                  float: "right",
                }}
              >
                Λάθος στοιχεία!
                <Close style={{ color: "red", verticalAlign: "bottom" }} />
              </div>
            )}
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
