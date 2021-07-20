import AuthContext from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import RegisteredUserHome from "./RegisteredUserHome";
import { Snackbar, Slide, Container, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import ListAlt from "@material-ui/icons/ListAlt";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, currentUser, state, loadUser, fetchApplications } =
    authContext;

  useEffect(() => {
    loadUser();
    if (currentUser && currentUser.title) {
      const interval = setInterval(() => {
        const filterApplications = (list) => {
          return list.filter((user) => user.application);
        };

        fetchApplications();

        if (
          filterApplications(state.users).length > listLen &&
          state.justLogged === false
        ) {
          setMuiState({
            open: true,
            SlideTransition,
          });

          setTimeout(() => {
            setMuiState({
              ...muiState,
              open: false,
            });
          }, 2500);

          setListLen(filterApplications(state.users).length);
        }
      }, 3000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line
  }, [state.users]);

  const [muiState, setMuiState] = useState({
    open: false,
  });

  const [listLen, setListLen] = useState(
    state.users.filter((appl) => appl.application).length
  );

  const handleClose = () => {
    setMuiState({
      ...muiState,
      open: false,
    });
  };

  return (
    <Container maxWidth="lg" style={{ height: "80vh" }}>
      {isAuthenticated ? (
        <Paper elevation={2}>
          <>
            {currentUser.title ? (
              <div>
                <>
                  <div style={{ textAlign: "left" }}>
                    <h1 style={{ textAlign: "center" }}>
                      Καλώς ήλθατε στην Εφαρμογή Υποβολής Αιτήσεων
                      Συνταξιοδότησης
                    </h1>
                    <br></br>
                    <ul>
                      <li>
                        <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
                          Για προβολή όλων των αιτήσεων πατήστε αριστερά στο
                          κουμπί{" "}
                          {
                            <ListAlt
                              style={{
                                fontSize: "1.7rem",
                                verticalAlign: "text-bottom",
                              }}
                            />
                          }{" "}
                          "Αιτήσεις" .
                        </p>
                      </li>
                      <li>
                        <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
                          Για έλεγχο και αξιολόγηση νέας αίτησης επιλέξτε την
                          αίτηση απο την λίστα και πατήστε "ΕΓΚΡΙΣΗ" ή
                          "ΑΠΟΡΡΙΨΗ".
                        </p>
                      </li>
                      <li>
                        <p
                          style={{
                            textAlign: "left",
                            fontSize: "1.4rem",
                            paddingBottom: "1rem",
                          }}
                        >
                          Ο πολίτης ενημερώνεται αυτόματα με e-mail έπειτα απο
                          την έγκριση ή την απόρριψη της αίτησής του.
                        </p>
                      </li>
                    </ul>
                  </div>
                </>
                <Snackbar
                  open={muiState.open}
                  onClose={handleClose}
                  TransitionComponent={muiState.Transition}
                  message="Υπάρχει νέα αίτηση"
                />
              </div>
            ) : (
              <>
                <RegisteredUserHome />
              </>
            )}
          </>
        </Paper>
      ) : (
        <Paper elevation={2}>
          <div>
            <h1 style={{ textAlign: "center" }}>
              Καλώς ήλθατε στην Εφαρμογή Υποβολής Αιτήσεων Συνταξιοδότησης
            </h1>
            <br></br>
            <ul style={{ textAlign: "left" }}>
              <li>
                <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
                  Για να κάνετε χρήση της εφαρμογής πρέπει να είστε
                  εγγεγραμμένος χρήστης.
                  <br></br>Για να εγγραφείτε πατήστε το κουμπί "Εγγραφή" ή κάντε
                  κλίκ <Link to={"/register"}>εδώ</Link>.
                </p>
              </li>
              <li>
                <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
                  Αν είστε εγγεγραμμένος χρήστης, για την χρήση της εφαρμογής
                  πρέπει να συνδεθείτε. <br></br>Για σύνδεση στην εφαρμογή
                  πατήστε το κουμπί "Σύνδεση" ή κάντε κλίκ{" "}
                  <Link to={"/login"}>εδώ</Link>.
                </p>
              </li>
              <li>
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "1.4rem",
                    paddingBottom: "1rem",
                  }}
                >
                  Αν θέλετε να κάνετε εγγραφή ως υπάλληλος διαχείρησης θα
                  χρειαστείτε τον κατάλληλο κωδικό αυθεντικοποίησης. <br></br>
                  Κατά την εγγραφή σας επιλέξτε την επιλογή "Υπάλληλος" και
                  πληκτρολογήστε τον κωδικό στο πεδίο που εμφανίζεται.
                </p>
              </li>
            </ul>
          </div>
        </Paper>
      )}
    </Container>
  );
};

export default Home;

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};
