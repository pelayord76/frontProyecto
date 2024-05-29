import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

const ActionButtons = ({ row, onEdit, onDelete }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={() => onEdit(row.id)}
        variant="contained"
        color="warning"
        endIcon={<SendIcon />}
      >
        Editar
      </Button>
      <Button
        onClick={() => onDelete(row.id)}
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
      >
        Borrar
      </Button>
    </Stack>
  );
};

export default ActionButtons;
