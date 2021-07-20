import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Drawer,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
} from "@material-ui/core";

import {
  ExitToApp,
  ChevronLeft,
  ChevronRight,
  ListAlt,
  FolderShared,
  Menu,
} from "@material-ui/icons";
import clsx from "clsx";
import VersionNumber from "../VersionNumber";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  listItemText: {
    fontSize: "1.3rem",
  },
  root: {
    flexGrow: 1,
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: "none",
  },
  buttons: {
    "&:hover": {
      color: "white",
    },

    margin: "0.4rem",
  },
  welcomeMsg: {
    fontSize: "0.875rem",
    fontFamily: "Roboto",
    padding: "6px 8px",
    marginRight: "1rem",
  },
}));

const Navbar = ({ title, icon }) => {
  const handleClickAway = () => {
    setOpen(false);
  };

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, currentUser, showSingleApplication } =
    authContext;

  const onLogout = () => {
    logout();
  };

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const authLinks = (
    <>
      <span>
        <Button
          variant="contained"
          className={classes.buttons}
          component={Link}
          style={{
            textTransform: "none",
            color: "#000000",
            fontSize: "1rem",
          }}
          color="inherit"
          onClick={onLogout}
          to="#!"
        >
          Αποσύνδεση <ExitToApp style={{ fontSize: "1.1rem" }} />
        </Button>
      </span>
    </>
  );

  const guestLinks = (
    <>
      <Button
        variant="contained"
        className={classes.buttons}
        component={Link}
        to={"/login"}
        style={{
          textTransform: "none",
          color: "#000000",
          fontSize: "1rem",
        }}
        color="inherit"
      >
        Σύνδεση
      </Button>
      <Button
        variant="contained"
        className={classes.buttons}
        component={Link}
        to={"/register"}
        style={{
          textTransform: "none",
          color: "#000000",
          fontSize: "1rem",
        }}
        color="inherit"
      >
        Εγγραφή
      </Button>
    </>
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          style={{ backgroundColor: "#349aa0" }}
          position="static"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            {isAuthenticated && (
              <IconButton
                onClick={handleDrawerOpen}
                edge="start"
                color="inherit"
                aria-label="menu"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <Menu style={{ fontSize: "2.1rem" }} />
              </IconButton>
            )}
            <div className={classes.title}>
              <Typography
                variant="h5"
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                  fontSize: "1.6rem",
                  textShadow: "rgb(0 0 0 / 40%) 1px 1px 4px",
                }}
                component={Link}
                to={"/"}
              >
                Εφαρμογή Συνταξιοδότησης
              </Typography>
            </div>

            <Button
              variant="contained"
              className={classes.buttons}
              component={Link}
              to={"/"}
              style={{
                textTransform: "none",
                color: "#000000",
                fontSize: "1rem",
              }}
              color="inherit"
            >
              Αρχική
            </Button>
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
        {isAuthenticated && (
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {currentUser.title ? (
                <ListItem
                  onClick={() => showSingleApplication(false)}
                  button
                  key={"Αιτήσεις"}
                  component={Link}
                  to={"/applications"}
                >
                  <ListItemIcon>
                    <ListAlt style={{ fontSize: "2.1rem" }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary={"Αιτήσεις"}
                  />
                </ListItem>
              ) : (
                <>
                  <ListItem
                    button
                    key={"Ο φάκελός μου"}
                    component={Link}
                    to={"/folder"}
                  >
                    <ListItemIcon>
                      <FolderShared style={{ fontSize: "2.1rem" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={"Ο φάκελός μου"}
                      classes={{ primary: classes.listItemText }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    key={"Αίτηση"}
                    component={Link}
                    to={"/application"}
                  >
                    <ListItemIcon>
                      <ListAlt style={{ fontSize: "2.1rem" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={"Αίτηση"}
                      classes={{ primary: classes.listItemText }}
                    />
                  </ListItem>
                </>
              )}
              {open && <VersionNumber />}
            </List>
          </Drawer>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Navbar;
