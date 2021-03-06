import { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import AuthContext from "./../../context/authContext";
import EditAppForm from "../pages/EditAppForm";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  CssBaseline,
} from "@material-ui/core";
import { ListAlt, Close, Check } from "@material-ui/icons";
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

const AppForm = (props) => {
  const authContext = useContext(AuthContext);

  const {
    error,
    clearErrors,
    isAuthenticated,
    formApplication,
    currentUser,
    applicationSubmission,
  } = authContext;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }
    if (error === "no errors" && !currentUser.application) {
      setTimeout(() => {
        props.history.push("/");
      }, 2000);
      setTimeout(() => {}, 1500);
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [application, setApplication] = useState({
    firstName: "",
    lastName: "",
    email: "",
    fName: "",
    mName: "",
    afm: "",
    amka: "",
    birthday: "",
    citizenship: "",
    idNumber: "",
    municipality: "",
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
    mobileNumber: "",
  });

  const {
    firstName,
    lastName,
    email,
    fName,
    mName,
    afm,
    amka,
    birthday,
    citizenship,
    idNumber,
    municipality,
    city,
    address,
    postalCode,
    phoneNumber,
    mobileNumber,
  } = application;

  const onChange = (e) =>
    setApplication({ ...application, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    formApplication({
      applicationId: uuid().slice(0, 13),
      firstName,
      lastName,
      fName,
      mName,
      afm,
      amka,
      birthday,
      citizenship,
      idNumber,
      municipality,
      city,
      address,
      postalCode,
      phoneNumber,
      mobileNumber,
      email,
      currentUser,
    });
  };

  const formFields = [
    { fieldName: "firstName", labelName: "??????????" },
    { fieldName: "lastName", labelName: "??????????????" },
    { fieldName: "fName", labelName: "??????????????????" },
    { fieldName: "mName", labelName: "??????????????????" },
    { fieldName: "afm", labelName: "??????" },
    { fieldName: "amka", labelName: "????????" },
    { fieldName: "birthday", labelName: "???????????????????? ????????????????" },
    { fieldName: "citizenship", labelName: "????????????????????" },
    { fieldName: "idNumber", labelName: "?????????????? ????????????????????/??????????????????????" },
    { fieldName: "municipality", labelName: "??????????" },
    { fieldName: "city", labelName: "????????" },
    { fieldName: "address", labelName: "?????????????????? ??????????????????" },
    { fieldName: "postalCode", labelName: "??.??." },
    { fieldName: "phoneNumber", labelName: "????????????????" },
    { fieldName: "mobileNumber", labelName: "????????????" },
    { fieldName: "email", labelName: "E-mail" },
  ];

  const classes = useStyles();

  return (
    <Container style={{ height: "100%", marginBottom: "8rem" }} maxWidth="lg">
      <Paper
        style={
          !currentUser.application
            ? { height: "1150px" }
            : currentUser.application.status === "????????????????"
            ? { height: "1170px" }
            : applicationSubmission
            ? { height: "8rem" }
            : { height: "8rem" }
        }
      >
        {!currentUser.application ? (
          <>
            <CssBaseline />
            <div className={classes.paper} style={{ padding: "1rem" }}>
              <Avatar
                className={classes.avatar}
                style={
                  applicationSubmission
                    ? {
                        backgroundColor: "#4caf50",
                        transitionDuration: "0.3s",
                        transitionTimingFunction: "ease-out",
                        transitionDelay: "0.2s",
                      }
                    : {
                        transitionDuration: "0.5s",
                        transitionTimingFunction: "ease-out",
                        transitionDelay: "0.3s",
                      }
                }
              >
                <ListAlt />
              </Avatar>

              <>
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: "black" }}
                >
                  ???????????? ??????????????????????????????
                </Typography>

                <form onSubmit={onSubmit} className={classes.form}>
                  <Grid container spacing={2}>
                    {formFields.map((field) => {
                      return (
                        <Grid key={field.fieldName} item xs={12}>
                          <TextField
                            inputProps={{ style: { fontSize: "1.1rem" } }}
                            value={application[`${field.fieldName}`]}
                            onChange={onChange}
                            autoComplete={field.fieldName}
                            name={field.fieldName}
                            variant="outlined"
                            disabled={applicationSubmission}
                            fullWidth
                            id={field.fieldName}
                            label={field.labelName}
                            size="small"
                            // required
                            InputLabelProps={
                              field.fieldName === "birthday"
                                ? {
                                    shrink: true,
                                  }
                                : null
                            }
                            type={
                              field.fieldName === "birthday" ? "date" : null
                            }
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={
                      applicationSubmission
                        ? { background: "#99a1a2e0", color: "#ffffff" }
                        : { background: "#349aa0", color: "#ffffff" }
                    }
                    className={classes.submit}
                    disabled={applicationSubmission}
                  >
                    ?????????????? ??????????????
                  </Button>{" "}
                  {error && error[0].msg && (
                    <div
                      style={{
                        float: "right",
                      }}
                    >
                      <span>{error[0].msg}</span>

                      <Close
                        style={{ color: "red", verticalAlign: "bottom" }}
                      />
                    </div>
                  )}
                </form>
              </>

              {applicationSubmission && (
                <>
                  <Typography component="h1" variant="h5">
                    ?? ???????????? ?????? ?????????????????????????????? ?????? ???????????????????? ????????????????!
                    <Check
                      style={{
                        color: "#4caf50",
                        verticalAlign: "bottom",
                        fontSize: "2rem",
                      }}
                    />
                  </Typography>
                </>
              )}
            </div>
          </>
        ) : currentUser.application.status === "????????????????" ? (
          <EditAppForm />
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>?????? ???????????????? ???? ???????????????????????????? ?????? ???????????? ??????</h2>
            <h2>?????????????????? ??????????????: {currentUser.application.status}</h2>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default AppForm;
