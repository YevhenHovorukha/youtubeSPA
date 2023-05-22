import { Container } from "@mui/system";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Card, CardContent, TextField, Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { signIn } from "../Redux/reducers/authSlice";

const Login = () => {
  const isAuth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onChangeHandler = (event) => {
    setFormData(() => {
      return { ...formData, [event.target.name]: event.target.value };
    });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    const loginIn = async () => {
      try {
        const response = await axios.post(
          "https://first-node-js-app-r.herokuapp.com/api/auth/login",
          formData
        );

        if (response.status === 200) {
          dispatch(signIn());
          setFormData({ email: "", password: "" });
          console.log(isAuth);
        }
        console.log(response.status);
      } catch (error) {
        // Обработка ошибки
        console.error(error);
      }
    };
    loginIn();
  };

  return (
    <Container
      sx={{
        "@media (min-width: 100px) and (max-width:2000px)": {
          padding: 0,
          margin: "0 auto",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        },
      }}
    >
      <Card>
        <CardContent>
          <YouTubeIcon
            color="primary"
            sx={{
              display: "block",
              margin: "0 auto",
              fontSize: "150px",
              "&:hover": {
                color: "grey",
              },
            }}
          />
          <Typography
            variant="h5"
            component="div"
            color="primary"
            sx={{ width: "100px", margin: "0 auto", marginBottom: 2 }}
          >
            SIGN IN
          </Typography>
          <form onSubmit={handlerSubmit}>
            <TextField
              label="Login"
              name="email"
              type="email"
              fullWidth
              sx={{ marginBottom: 2 }}
              onChange={onChangeHandler}
              value={formData.email}
            />
            <TextField
              onChange={onChangeHandler}
              name="password"
              label="Password"
              type="password"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={formData.password}
            />
            <Button variant="contained" fullWidth type="submit">
              ENTER
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
