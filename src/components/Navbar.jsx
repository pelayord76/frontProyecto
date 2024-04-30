import MenuIcon from "@mui/icons-material/Menu";
import QueryStatsSharpIcon from "@mui/icons-material/QueryStatsSharp";
import { Zoom } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import "../navbar.css";
import { blue } from "@mui/material/colors";

const paginas = ["Usuario", "Maquina", "Cliente", "Recaudacion", "Factura"];
const settings = ["Ajustes", "Cerrar sesión"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

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

  const handlePagina = (pagina) => {
    navigate(`/${pagina.toLowerCase()}`);
    handleCloseNavMenu();
  };

  return (
    <React.Fragment>
        <AppBar position="fixed">
          <Container maxWidth="l">
            <Toolbar>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <QueryStatsSharpIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, ml: -3 }}/>
                <Tooltip title="Inicio" arrow TransitionComponent={Zoom}>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 5,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".2rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    RfsAdmin
                  </Typography>
                </Tooltip>
              </Box>
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
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {paginas.map((pagina) => (
                    <MenuItem key={pagina} onClick={() => handlePagina(pagina)}>
                      <Typography textAlign="center">{pagina}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {paginas.map((pagina) => (
                  <Button
                    key={pagina}
                    onClick={() => handlePagina(pagina)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {pagina}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Opciones" arrow TransitionComponent={Zoom}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: blue[900] }}>G</Avatar> 
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
    </React.Fragment>
  );
}

export default Navbar;