import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
import YouTubeIcon from "@mui/icons-material/YouTube";
// import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Outlet } from "react-router-dom";
// import { margin } from "@mui/system";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { exit } from "../Redux/reducers/authSlice";

const sxStyles = {
  color: "#1976d2",
  textDecoration: "none",
  marginRight: "20px",
  marginLeft: "10px",
};

const activeLink = {
  ...sxStyles,
  textDecoration: "underline",
};

const Header = () => {
  const isAuth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  return (
    <>
      <AppBar
        sx={{
          background: "white",
          height: "80px",
          p: "1em 0",
        }}
        position="static"
      >
        <Container
          sx={{
            "@media (min-width: 0px)": {
              // Обнуляем стили для всех медиа
              maxWidth: "none",
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 0,
              paddingRight: 0,
            },
            "@media (min-width: 600px)": {
              padding: 0,
              margin: "0 auto",
              maxWidth: "1200px",
            },
          }}
        >
          <Toolbar variant="dense">
            <YouTubeIcon
              color="primary"
              sx={{
                "@media (min-width: 0px)": {
                  // Обнуляем стили для всех медиа
                  maxWidth: "none",
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                },
                marginRight: 0,
                fontSize: "60px",
                "&:hover": {
                  color: "grey",
                },
              }}
            />

            {/* <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <YouTubeIcon fontSize="lg" />
            </IconButton> */}
            <NavLink
              style={({ isActive }) => (isActive ? activeLink : sxStyles)}
              to="/"
            >
              <Typography variant="h6">SEARCH</Typography>
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeLink : sxStyles)}
              to="/favorites"
            >
              <Typography variant="h6">FAVORITES</Typography>
            </NavLink>
            <NavLink
              style={{ ...sxStyles, marginLeft: "auto", marginRight: 0 }}
              // to="/login"
              to="/"
              onClick={() => dispatch(exit())}
            >
              <Typography variant="h6">EXIT</Typography>
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Header;
