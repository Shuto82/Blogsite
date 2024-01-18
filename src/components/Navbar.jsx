import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const pages = [
  { path: "/", name: "Kezdőoldal" },
  { path: "about", name: "Rólam" }  
];
const settings = [
  { path: "profile", name: "Profil" },
  { path: "/", name: "Kijelentkezés" },
];

export const Navbar = () => {
  const { user, logOutUser } = useContext(UserContext);
  const [navPages, setNavPages] = useState(pages);


  useEffect (() => {
    if (user) {
      setNavPages([...pages, { path: "create", name: "Poszt készítése" }])
    }
    else {setNavPages(pages)}
  }, [user])

  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navPages.map((obj) => (
                <NavLink key={obj.name} to={obj.path}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{obj.name}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>

          {/* Laptop-kijelzős rész*/}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navPages.map((obj) => (
              <NavLink
                key={obj.name}
                to={obj.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ color: "white", display: "block" }}
                >
                  {obj.name}
                </Button>
              </NavLink>
            ))}
          </Box>

          {!user ? (
            <>
              <Box sx={{ flexGrow: 0, display: { md: "flex" } }}>
                <NavLink
                  to="signinup/up"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ color: "white", display: "block" }}
                  >
                    Feliratkozás
                  </Button>
                </NavLink>
              </Box>

              <Box sx={{ flexGrow: 0, display: { md: "flex" } }}>
                <NavLink
                  to="signinup/in"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ color: "white", display: "block" }}
                  >
                    Bejelentkezés
                  </Button>
                </NavLink>
              </Box>
            </>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((obj) => (
                  <MenuItem key={obj.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => obj.name == 'Kijelentkezés' ? logOutUser() : navigate(obj.path)}>
                      {obj.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
