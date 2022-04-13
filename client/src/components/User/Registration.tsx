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
import { callbackify } from "util";

const schema = yup.object().shape({
  FirstName: yup
    .string()
    .required()
    .min(1, "FirstName Should be atleast 6 character")
    .max(20, "FirstName must not exceeds 20 character"),
  LastName: yup
    .string()
    .required()
    .min(1, "LastName Should be atleast 6 character")
    .max(20, "LastName must not exceeds 20 character"),
  Email: yup.string().email().required().email("Email is Invalid"),
  City: yup.string().required(),
  //   Role: yup.string().required(),
  Password: yup
    .string()
    .required()
    .min(6, "password must be atleast 6 character")
    .max(15, "password must not exceed 15 character"),
});

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate=useNavigate();
      const nav=()=>{
          navigate('/login');
      }

  const submitForm = (data: any) => {
    console.log("data : ", data);
    Axios.post("http://localhost:3001/insert", data)
    .then(() => {
        alert("Registered Successfully");
        nav();
    });
  };

//   const redirect = () => {
//     <Navigate to="/login" replace={true} />
//   }

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
          Sign Up
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
            id="FirstName"
            label="First Name"
            {...register("FirstName")}
            name="FirstName"
            autoComplete="FirstName"
            autoFocus
          />
          <span> {errors.FirstName?.message} </span>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="LastName"
            label="Last Name"
            {...register("LastName")}
            name="LastName"
            autoComplete="LastName"
          />
          <span> {errors.LastName?.message} </span>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="City"
            label="City"
            {...register("City")}
            name="City"
            autoComplete="City"
          />
          <span> {errors.City?.message} </span>
          {/* <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="Role"
                        label="role"
                        {...register('Role')}
                        name="Role"
                        autoComplete="Role"
                     
                        autoFocus
                    />
                     <p> {errors.Role?.message} </p> */}
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Button
                sx={{ my: 2, color: "red", display: "block" }}
                component={Link}
                to="/login"
              >
                Already Have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default Registration;
