import AuthContext from "../../context/authContext";
import { useContext } from "react";
import { jsPDF } from "jspdf";
import { Container, Button, Paper } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import font from "../../fonts/LiberationSerif-Regular-normal";

var callAddFont = function () {
  this.addFileToVFS("LiberationSerif-Regular-normal.ttf", font);
  this.addFont(
    "LiberationSerif-Regular-normal.ttf",
    "LiberationSerif-Regular",
    "normal"
  );
};
jsPDF.API.events.push(["addFonts", callAddFont]);

const Folder = () => {
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;

  const formatDate = (date) => {
    let datePart = date.match(/\d+/g),
      year = datePart[0].substring(2),
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  };

  const generatePdf = () => {
    var doc = new jsPDF("p", "pt");

    doc.setFont("LiberationSerif-Regular");
    doc.text(
      20,
      20,
      `Η αίτηση συνταξιοδότησης με κωδικό ${currentUser.application.applicationId}:`
    );
    doc.text(
      20,
      60,
      `
      Όνομα: ${currentUser.application.firstName}
      Επώνυμο: ${currentUser.application.lastName}
      Πατρώνυμο: ${currentUser.application.fName}
      Μητρώνυμο: ${currentUser.application.mName}
      ΑΦΜ: ${currentUser.application.afm}
      ΑΜΚΑ: ${currentUser.application.amka}
      Ημερομηνία Γέννησης: ${formatDate(currentUser.application.birthday)}
      Υπηκοότητα: ${currentUser.application.citizenship}
      Αριθμός Ταυτότητας/Διαβατηρίου: ${currentUser.application.idNumber}
      Δήμος: ${currentUser.application.municipality}
      Πόλη: ${currentUser.application.city}
      Διεύθυνση κατοικίας: ${currentUser.application.address}
      Τ.Κ.: ${currentUser.application.postalCode}
      Τηλέφωνο: ${currentUser.application.phoneNumber}
      Κινητό: ${currentUser.application.mobileNumber}
      E-mail: ${currentUser.application.email}
                                    
                                    Εγκρίνεται`
    );
    doc.save("αίτηση_συνταξιοδότησης.pdf");
  };

  return (
    <Container style={{ height: "80vh", minWidth: "20vw" }} maxWidth="lg">
      <Paper>
        <h1 style={{ textAlign: "center", backgroundColor: "#b1bac163" }}>
          Φάκελος χρήστη
        </h1>

        {currentUser && (
          <h2 style={{ fontSize: "1.5rem" }}>
            Κατάσταση αίτησης:{" "}
            {currentUser.application
              ? currentUser.application.status
              : "Δεν έχει γίνει αίτηση"}
          </h2>
        )}

        {currentUser.application &&
          (currentUser.application.status === "δεκτή" ||
            currentUser.application.status === "μη δεκτή" ||
            currentUser.application.status === "εκκρεμής") && (
            <div>
              {currentUser.application.status === "εκκρεμής" && (
                <>
                  <p style={{ fontSize: "1.4rem" }}>Η αίτηση που υποβάλατε: </p>
                  <p style={{ fontSize: "1.4rem" }}>
                    Κωδικός αίτησης: {currentUser.application.applicationId}
                  </p>
                </>
              )}

              {(currentUser.application.status === "δεκτή" ||
                currentUser.application.status === "μη δεκτή") && (
                <p style={{ fontSize: "1.4rem" }}>
                  Η αίτηση συνταξιοδότησης με κωδικό{" "}
                  {currentUser.application.applicationId}:
                </p>
              )}

              <ul
                style={{
                  listStyleType: "none",
                  fontSize: "1.4rem",
                  paddingBottom: "1rem",
                }}
              >
                <li>Όνομα: {currentUser.application.firstName}</li>
                <li>Επώνυμο: {currentUser.application.lastName}</li>
                <li>Πατρώνυμο: {currentUser.application.fName}</li>
                <li>Μητρώνυμο: {currentUser.application.mName}</li>
                <li>ΑΦΜ: {currentUser.application.afm}</li>
                <li>ΑΜΚΑ: {currentUser.application.amka}</li>
                <li>
                  Ημερομηνία Γέννησης:{" "}
                  {formatDate(currentUser.application.birthday)}
                </li>
                <li>Υπηκοότητα: {currentUser.application.citizenship}</li>
                <li>
                  Αριθμός Ταυτότητας/Διαβατηρίου:{" "}
                  {currentUser.application.idNumber}
                </li>
                <li>Δήμος: {currentUser.application.municipality}</li>
                <li>Πόλη: {currentUser.application.city}</li>
                <li>Διεύθυνση κατοικίας: {currentUser.application.address}</li>
                <li>Τ.Κ.: {currentUser.application.postalCode}</li>
                <li>Τηλέφωνο: {currentUser.application.phoneNumber}</li>
                <li>Κινητό: {currentUser.application.mobileNumber}</li>
                <li>E-mail: {currentUser.application.email}</li>
              </ul>
              {(currentUser.application.status === "δεκτή" ||
                currentUser.application.status === "μη δεκτή") && (
                <>
                  <p
                    style={{
                      textAlign: "right",
                      fontSize: "1.5rem",
                      paddingRight: "10rem",
                    }}
                  >
                    {currentUser.application.status === "δεκτή" && (
                      <span style={{ color: "green" }}>Εγκρίνεται</span>
                    )}
                    {currentUser.application.status === "μη δεκτή" && (
                      <>
                        <span style={{ color: "red", textAlign: "left" }}>
                          Απορρίπτεται
                        </span>
                        <br></br>
                        <br></br>
                      </>
                    )}
                  </p>

                  {currentUser.application.status === "μη δεκτή" && (
                    <p style={{ fontSize: "1.2rem", paddingBottom: "1rem" }}>
                      Για περισσότερες πληροφορίες μπορείτε να επικοινωνήσετε
                      μαζί μας: <br></br>Τηλέφωνα εξυπηρέτησης πολιτών: 209
                      987546213, 208 987546248
                      <br></br>
                      Ηλεκτρονικό ταχυδρομείο: aitisi@syntaxiouxosthagino.gr
                    </p>
                  )}
                  {currentUser.application.status === "δεκτή" && (
                    <Button
                      onClick={generatePdf}
                      type="primary"
                      variant="contained"
                      style={{
                        marginBottom: "10px",
                        textTransform: "none",
                        backgroundColor: "#349aa0",
                        color: "#ffffff",
                      }}
                      startIcon={<GetAppIcon />}
                    >
                      Λήψη αίτησης σε PDF
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
      </Paper>
    </Container>
  );
};

export default Folder;
