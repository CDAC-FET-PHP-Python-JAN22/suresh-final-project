import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { FormEvent, useState, ChangeEvent } from "react";
import { Navigate } from "react-router-dom";

const schema = yup.object().shape({
  Email: yup.string().email().required().email("Email is Invalid"),
  Password: yup.string().required(),
});

type LoginProps = {
  setLogin: (Login: boolean) => void;
};

function Login({ setLogin }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const adminNav = () => {
    navigate("/adminHome");
    setLogin(true);
  };

  const reporterNav = () => {
    navigate("/reporterHome");
    setLogin(true);
  };

  const submitForm = (data: any) => {
    // console.log("data : ",data);
    Axios.post("http://localhost:3001/signin", data).then((res) => {
      console.log(res.data.length);

      if(res.data.length == 1 && data.Email==="admin@gmail.com"){
        alert("Welcome Admin")
        window.location.replace("http://localhost:3002");
        // adminNav();
      } else if (res.data.length == 1) {
        alert("Login successfull");
        localStorage.setItem('city',res.data[0].city);
        reporterNav();
      } else {
        alert("Wrong credentials");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{}}
        >
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            {...register("Email")}
            name="Email"
            autoComplete="email"
            autoFocus
          />
          <span> {errors.Email?.message} </span>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            {...register("Password")}
            name="Password"
            label="Password"
            type="Password"
            id="Password"
            autoComplete="current-password"
          />
          <span> {errors.Password?.message} </span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Grid container>
            <Grid item xs>
              <Button
                sx={{ my: 2, color: "red", display: "block" }}
                component={Link}
                to="/registration"
                replace
              >
                Dont Have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default Login;
