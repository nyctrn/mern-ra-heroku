import { useState, useContext, useEffect } from "react";
import SingleApplication from "../pages/SingleApplication";
import AuthContext from "../../context/authContext";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Container,
  Snackbar,
  Slide,
  CircularProgress,
} from "@material-ui/core";

const columns = [
  { id: "firstName", label: "Όνομα", minWidth: 170 },
  { id: "lastName", label: "Επώνυμο", minWidth: 170 },
  { id: "afm", label: "ΑΦΜ", minWidth: 100 },
  { id: "amka", label: "AMKA", minWidth: 100 },
  { id: "status", label: "Κατάσταση αίτησης", minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 700,
  },
});

const Applications = (props) => {
  const authContext = useContext(AuthContext);

  const [muiState, setMuiState] = useState({
    open: false,
  });

  const {
    users,
    currentUser,
    loading,
    fetchApplications,
    showSingleApplication,
    state,
    loadUser,
    justLogged,
  } = authContext;

  const [listLen, setListLen] = useState(
    state.users.filter((appl) => appl.application).length
  );

  const handleClose = () => {
    setMuiState({
      ...muiState,
      open: false,
    });
  };

  const filterApplications = (list) => {
    return list.filter((user) => user.application);
  };

  useEffect(() => {
    setListLen(filterApplications(state.users).length);

    loadUser();
    if (currentUser && currentUser.title) {
      const interval = setInterval(() => {
        fetchApplications(currentUser._id);
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
        if (state.justLogged) {
          setTimeout(() => justLogged(), 4000);
        }
      }, 3000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line
  }, [state.users]);

  const [applicant, setApplicant] = useState(null);

  const openApplication = (event, appl) => {
    setApplicant(appl);
    showSingleApplication(true);
  };

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container style={{ height: "100%", marginBottom: "3px" }} maxWidth="lg">
      <Snackbar
        open={muiState.open}
        onClose={handleClose}
        TransitionComponent={muiState.Transition}
        message="Υπάρχει νέα αίτηση"
      />

      {state.single_application ? (
        <SingleApplication applicant={applicant} />
      ) : (
        <>
          <Paper elevation={2}>
            <h1>Αιτήσεις</h1>
            {loading ? (
              <CircularProgress style={{ margin: "5% 50%" }} />
            ) : users.length ? (
              <>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              fontSize: "1.2rem",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={uuid()}
                            >
                              {columns.map((column) => {
                                const value = row.application[column.id];
                                return (
                                  <TableCell
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "1.1rem",
                                    }}
                                    onClick={(e) => {
                                      openApplication(e, row);
                                    }}
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  labelRowsPerPage="Αιτήσεις ανά σελίδα"
                />
              </>
            ) : (
              <h2 style={{ textAlign: "center" }}>Δεν υπάρχουν αιτήσεις</h2>
            )}
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Applications;

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};
