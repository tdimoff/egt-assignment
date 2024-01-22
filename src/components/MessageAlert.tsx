import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Alert, IconButton } from "@mui/material";

interface IMessageAlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  setShowAlert: (showAlert: boolean) => void;
}

const MessageAlert = ({ message, type, setShowAlert }: IMessageAlertProps) => {
  return (
    <Alert
      severity={type}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {message}
      <IconButton onClick={() => setShowAlert(false)}>
        <CloseRoundedIcon />
      </IconButton>
    </Alert>
  );
};

export default MessageAlert;
