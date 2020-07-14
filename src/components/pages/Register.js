import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import { httpClient } from "./../../utils/HttpClient";
//import redux
import * as loginActions from "./../../actions/login.action";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";

import { server } from "../../Constants";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const [isError, setIsError] = useState(false);

  function showForm({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) {
    return (
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth //กระจายให้เต็ม
          value={values.username}
          onChange={handleChange}
          id="username"
          label="Username"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth //กระจายให้เต็ม
          value={values.password}
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        {isError && <Alert severity="error">Error !! </Alert>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting} //กำลัง submit อยู่น่ะ
          className={classes.submit}
        >
          Register
        </Button>
        <Button
          onClick={() => props.history.goBack()}
          fullWidth
          size="small"
          color="primary"
        >
          Cancle
        </Button>
      </form>
    );
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Register
        </Typography>

        <Formik
          initialValues={{ username: "admin", password: "1234" }}
          onSubmit={(values, { setSubmitting }) => {
            httpClient
              .post(server.REGISTER_URL, values)
              .then((res) => {
                setSubmitting(false);
                // alert(JSON.stringify(result.data));
                const { data } = res;
                // debugger;
                if (data.result == "ok") {
                  // dispatch(loginActions.setSuccess());
                  setIsError(false);
                  Swal.fire({
                    icon: "Success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setTimeout(() => {
                    props.history.push("/login");
                  }, 500);
                } else {
                  // dispatch(
                  //   loginActions.hasError(
                  //     "Error, your information is not correct!"
                  //   )
                  // );
                  setIsError(true);
                }
              })
              .catch((error) => {
                // alert(JSON.stringify(error));
                setIsError(true);
              });
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </CardContent>
    </Card>
  );
}
