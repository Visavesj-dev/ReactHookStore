import React,{ useEffect } from "react";
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Login from "./components/pages//Login";
import Register from "./components/pages/Register";
import Container from "@material-ui/core/Container";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stock from "./components/pages/Stock";
import StockCreate from "./components/pages/StockCreate";
import StockEdit from "./components/pages/StockEdit";
import * as loginActions from "./actions/login.action";

import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        padding: 0
    }
}));

 // Protected Route
 const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Redirect to="/stock" />
      ) : (
        <Login {...props} />
      )
    }
  />
);

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const loginReducer = useSelector(({loginReducer})=>loginReducer);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loginActions.reLogin())
  },[])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const redirect = () => {
    return <Redirect to="/login" />;
  };


  return (
    <Router>
     <div className={classes.root}>
    {loginReducer.result && !loginReducer.error  && (
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
    )}
    {loginReducer.result && !loginReducer.error  && ( 
      <Menu open={open} />
    )}

      <Container className={classes.content} maxWidth={false}>
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <SecuredRoute path="/stock" component={Stock} />
          <SecuredRoute path="/stockCreate" component={StockCreate} />
          <SecuredRoute path="/stockEdit/:id" component={StockEdit} />
          <Route exact={true} path="/" component={redirect} />
        </Switch>
      </Container>
      </div>
    </Router>
  );
}
