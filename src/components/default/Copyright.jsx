import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export const Copyright = (props) => {
  return (
    <Typography variant="body2" color="#FFFFFF" align="center" {...props}>
      {"© "} {new Date().getFullYear()}{" "}
      <Link color="#FFFFFF" href="https://linktr.ee/pelayord">
        RfsAdmin
      </Link>
      {"™"}
    </Typography>
  );
};
