import { useState, useContext, useEffect } from "react";
import AuthContext from "./../../context/authContext";

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  CssBaseline,
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

const Register = (props) => {
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated, raiseError } =
    authContext;

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        props.history.push("/");
      }, 1800);
    }

    if (error) {
      setTimeout(() => {
        clearErrors();
      }, 3000);

      if (
        error[0].msg === "please enter a pass with 6+ chars" ||
        error === "passwords do not match"
      ) {
        setUser({ ...user, password: "", password2: "" });
      } else if (error[0].msg === "wrong code") {
        setUser({ ...user, code: "" });
      } else if (error[0].msg === "include a valid email") {
        setUser({ ...user, email: "" });
      } else {
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          password2: "",
          code: "",
        });
      }
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    code: "",
  });

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const { firstName, lastName, email, password, password2, code } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      raiseError("passwords do not match");
    } else {
      register({
        firstName,
        lastName,
        email,
        password,
        code,
      });
    }
  };

  const classes = useStyles();

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ height: "80vh", minWidth: "31rem" }}
    >
      <Paper elevation={3}>
        <CssBaseline />
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
                    transitionDuration: "0.5s",
                    transitionTimingFunction: "ease-out",
                    transitionDelay: "0.3s",
                  }
            }
            className={classes.avatar}
          >
            <PermIdentity />
          </Avatar>
          <Typography
            component="h1"
            variant="h6"
            style={{ fontSize: "1.5rem", width: "29rem", textAlign: "center" }}
          >
            Δημιουργία λογαριασμού{" "}
            {isAuthenticated && (
              <>
                <span>επιτυχής!</span>
                <Check
                  style={{
                    color: "#4caf50",
                    verticalAlign: "bottom",
                    fontSize: "2rem",
                  }}
                />{" "}
              </>
            )}{" "}
          </Typography>

          <form onSubmit={onSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ style: { fontSize: "1.4rem" } }}
                  value={firstName}
                  onChange={onChange}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Όνομα"
                  autoFocus
                  disabled={isAuthenticated}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ style: { fontSize: "1.4rem" } }}
                  value={lastName}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Επώνυμο"
                  name="lastName"
                  autoComplete="lname"
                  disabled={isAuthenticated}
                />
              </Grid>
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
                  minLength="6"
                  disabled={isAuthenticated}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ style: { fontSize: "1.4rem" } }}
                  value={password2}
                  onChange={onChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Επαλήθευση κωδικού χρήστη"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  disabled={isAuthenticated}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        name="checked"
                        disabled={isAuthenticated}
                      />
                    }
                    label="Υπάλληλος;"
                  />
                  {checked && (
                    <TextField
                      label="10-ψήφιος κωδικός"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      onChange={onChange}
                      value={code}
                      name="code"
                      type="password"
                      required
                      disabled={isAuthenticated}
                    />
                  )}
                </FormGroup>
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
              Εγγραφη
            </Button>{" "}
            {error && (
              <div
                style={{
                  float: "right",
                }}
              >
                {error[0].msg === "user already exists" && (
                  <span>Υπάρχει ήδη χρήστης με τέτοιο email!</span>
                )}
                {error[0].msg === "wrong code" && (
                  <span>Λάθος 10-ψήφιος κωδικός!</span>
                )}
                {error[0].msg === "include a valid email" && (
                  <span>Παρακαλώ εισάγετε ένα έγκυρο email!</span>
                )}
                {error[0].msg === "please enter a pass with 6+ chars" && (
                  <span>
                    Παρακαλώ εισάγετε κωδικό χρήστη τουλάχιστον 6 χαρακτήρων
                  </span>
                )}
                {error === "passwords do not match" && (
                  <span>
                    Κωδικός χρήστη διαφορετικός από τον κωδικό επαλήθευσης!
                  </span>
                )}
                <Close style={{ color: "red", verticalAlign: "bottom" }} />
              </div>
            )}
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default Register;
