import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from 'clsx';
import { withRouter } from 'react-router-dom'; //ใช้เวลา ไม่ได้อยู่ภายใต้ route

//import redux
import * as loginActions from "./../../actions/login.action";
import { useSelector, useDispatch } from "react-redux";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  return (
    <div className={classes.root}>
      <AppBar  position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
        >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={props.open === false ? props.handleDrawerOpen : props.handleDrawerClose}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit" onClick={()=>{
            dispatch(loginActions.logout({...props}))
          }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header)
