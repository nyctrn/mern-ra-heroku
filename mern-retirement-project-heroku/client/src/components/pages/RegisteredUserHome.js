import ListAlt from "@material-ui/icons/ListAlt";
import FolderSharedIcon from "@material-ui/icons/FolderShared";

const RegisteredUserHome = () => {
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>
          Καλώς ήλθατε στην Εφαρμογή Υποβολής Αιτήσεων Συνταξιοδότησης
        </h1>
        <br></br>
        <ul>
          <li>
            <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
              Για δημιουργία και υποβολή αίτησης συνταξιοδότησης πατήστε
              αριστερά στο κουμπί{" "}
              {
                <ListAlt
                  style={{ fontSize: "1.7rem", verticalAlign: "text-bottom" }}
                />
              }{" "}
              "Αίτηση" .
            </p>
          </li>
          <li>
            <p style={{ textAlign: "left", fontSize: "1.4rem" }}>
              Για προβολή κάποιας υπάρχουσας αίτησης ή επεξεργασία πατήστε
              αριστερά στο κουμπί{" "}
              {
                <FolderSharedIcon
                  style={{ fontSize: "1.7rem", verticalAlign: "text-bottom" }}
                />
              }{" "}
              "Ο φάκελός μου" .
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
              Για παραλαβή της αίτησής σας, εφόσον έχει εγκριθεί, πατήστε στο
              κουμπί{" "}
              {
                <FolderSharedIcon
                  style={{ fontSize: "1.7rem", verticalAlign: "text-bottom" }}
                />
              }{" "}
              "Ο φάκελός μου" και επιλέξτε την αίτησή σας, στη συνέχεια επιλέξτε
              "Λήψη αίτησης σε PDF"
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RegisteredUserHome;
