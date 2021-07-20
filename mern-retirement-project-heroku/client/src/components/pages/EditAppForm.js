import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { Check, Edit, Close } from "@material-ui/icons";

const EditAppForm = () => {
  const authContext = useContext(AuthContext);
  const { error, clearErrors, currentUser, formEdit } = authContext;

  const {
    applicationId,
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
  } = currentUser.application;

  const [edit, setEdit] = useState(false);
  const [viewAppForm, setViewAppForm] = useState(true);
  const [editSuccess, setEditSuccess] = useState(false);

  const [application, setApplication] = useState({
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
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }

    if (error === "no errors") {
      setEditSuccess(true);

      setTimeout(() => {
        setEditSuccess(false);
      }, 2000);
    }
    // eslint-disable-next-line
  }, [error]);

  const onChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleSwitchEdit = (e) => {
    setEdit(!edit);
    setViewAppForm(!viewAppForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await formEdit({
      applicationId: applicationId,
      id: currentUser._id,
      firstName: application.firstName,
      lastName: application.lastName,
      fName: application.fName,
      mName: application.mName,
      afm: application.afm,
      amka: application.amka,
      birthday: application.birthday,
      citizenship: application.citizenship,
      idNumber: application.idNumber,
      municipality: application.municipality,
      city: application.city,
      address: application.address,
      postalCode: application.postalCode,
      phoneNumber: application.phoneNumber,
      mobileNumber: application.mobileNumber,
      email: application.email,
    });

    if (!error) {
    }
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

  return (
    <div style={{ padding: "1rem", paddingBottom: "2rem", marginTop: "3rem" }}>
      {currentUser.application && (
        <>
          <h2 style={{ fontSize: "1.5rem" }}>
            Έχετε ήδη υποβάλει αίτηση συνταξιοδότησης
          </h2>
          <h2 style={{ float: "right" }}>
            Επεξεργασία αίτησης:{" "}
            <>
              <Edit onClick={handleSwitchEdit} style={{ cursor: "pointer" }} />
            </>
          </h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {formFields.map((field) => {
                return (
                  <Grid key={field.fieldName} item xs={12}>
                    <TextField
                      inputProps={{ style: { fontSize: "1.2rem" } }}
                      value={application[`${field.fieldName}`]}
                      onChange={onChange}
                      autoComplete={field.fieldName}
                      name={field.fieldName}
                      variant="outlined"
                      // required
                      fullWidth
                      id={field.fieldName}
                      label={field.labelName}
                      autoFocus
                      size="small"
                      disabled={viewAppForm && true}
                      InputLabelProps={
                        field.fieldName === "birthday"
                          ? {
                              shrink: true,
                            }
                          : null
                      }
                      type={field.fieldName === "birthday" ? "date" : null}
                    />
                  </Grid>
                );
              })}
            </Grid>
            {edit && (
              <Button
                style={{
                  marginTop: "20px",
                  background: "#349aa0",
                  color: "#ffffff",
                }}
                type="submit"
                fullWidth
                variant="contained"
              >
                ΥΠΟΒΟΛΗ
              </Button>
            )}

            {editSuccess && (
              <div style={{ paddingTop: "1rem" }}>
                <Typography component="h1" variant="h5">
                  Επεξεργασία αίτησης επιτυχής!
                  <Check
                    style={{
                      color: "#4caf50",
                      verticalAlign: "bottom",
                      fontSize: "2rem",
                    }}
                  />
                </Typography>
              </div>
            )}
            {error && error[0].msg && (
              <div
                style={{
                  float: "right",
                }}
              >
                <span>{error[0].msg}</span>

                <Close style={{ color: "red", verticalAlign: "bottom" }} />
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditAppForm;
