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
    { fieldName: "firstName", labelName: "Όνομα" },
    { fieldName: "lastName", labelName: "Επώνυμο" },
    { fieldName: "fName", labelName: "Πατρώνυμο" },
    { fieldName: "mName", labelName: "Μητρώνυμο" },
    { fieldName: "afm", labelName: "ΑΦΜ" },
    { fieldName: "amka", labelName: "ΑΜΚΑ" },
    { fieldName: "birthday", labelName: "Ημερομηνία Γέννησης" },
    { fieldName: "citizenship", labelName: "Υπηκοότητα" },
    { fieldName: "idNumber", labelName: "Αριθμός Ταυτότητας/Διαβατηρίου" },
    { fieldName: "municipality", labelName: "Δήμος" },
    { fieldName: "city", labelName: "Πόλη" },
    { fieldName: "address", labelName: "Διεύθυνση κατοικίας" },
    { fieldName: "postalCode", labelName: "Τ.Κ." },
    { fieldName: "phoneNumber", labelName: "Τηλέφωνο" },
    { fieldName: "mobileNumber", labelName: "Κινητό" },
    { fieldName: "email", labelName: "E-mail" },
  ];

  const classes = useStyles();

  return (
    <Container style={{ height: "100%", marginBottom: "8rem" }} maxWidth="lg">
      <Paper
        style={
          !currentUser.application
            ? { height: "1150px" }
            : currentUser.application.status === "εκκρεμής"
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
                  Αίτηση Συνταξιοδότησης
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
                    ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ
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
                    Η αίτηση της συνταξιοδότησής σας υποβλήθηκε επιτυχώς!
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
        ) : currentUser.application.status === "εκκρεμής" ? (
          <EditAppForm />
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>Δεν μπορείτε να επεξεργαστείτε την αίτησή σας</h2>
            <h2>Κατάσταση αίτησης: {currentUser.application.status}</h2>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default AppForm;
