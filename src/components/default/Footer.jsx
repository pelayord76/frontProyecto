import { Typography, Link } from "@mui/material";
import { Copyright } from "./Copyright";

export const Footer = () => {
  return (
    <div
      style={{
        height: "auto",
        backgroundColor: "#1E2F42",
        justifyContent: "center",
        padding: "1%",
        marginTop: "5%",
        marginBottom: "0%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              color: "#FFFFFF",
              fontWeight: "500",
              fontSize: "1.1em",
            }}
          >
            RfsAdmin
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2%",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <Link
              href="/politica"
              sx={{
                textDecoration: "none",
                color: "#FFFFFF",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Política de privacidad
            </Link>
            <Link
              href="/licencia"
              sx={{
                textDecoration: "none",
                color: "#FFFFFF",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Licencia
            </Link>
            <Link
              href="/contacto"
              sx={{
                textDecoration: "none",
                color: "#FFFFFF",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Contacto
            </Link>
          </div>
        </div>

        <hr style={{ width: "100%", border: "1px solid #FFFFFF" }} />

        <Copyright />
      </div>
    </div>
  );
};
