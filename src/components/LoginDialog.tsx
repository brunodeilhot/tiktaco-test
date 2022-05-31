import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateDialogStatus } from "../store/loginDialogSlice";
import LoginLogo from "../assets/LoginLogo.svg";

const LoginDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loginWithRedirect } = useAuth0();
  const open = useAppSelector((state) => state.loginDialog.open);

  const handleClose = () => {
    dispatch(updateDialogStatus(false));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="login-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: "10px",
          backgroundColor: "background.default",
        },
      }}
    >
      <Grid
        container
        flexDirection="column"
        flexWrap="nowrap"
        padding={3}
        alignItems="center"
      >
        <Box
          component="img"
          width={130}
          height={81}
          src={LoginLogo}
          alt="Large whatsinmypantry smiling taco logo"
        />
        <DialogTitle id="login-dialog-title">Welcome to TikTaco!</DialogTitle>
        <DialogActions sx={{ minWidth: "100%" }}>
          <Grid
            container
            item
            flexDirection="column"
            flexWrap="nowrap"
            gap={2}
            alignItems="center"
            minWidth="100%"
          >
            <Button
              variant="outlined"
              autoFocus
              onClick={() => loginWithRedirect()}
              sx={{
                minWidth: "100%",
                borderRadius: "20px",
                textTransform: "uppercase",
                fontWeight: 700,
                borderWidth: "3px",
                "&:hover": {
                  borderWidth: "3px",
                },
              }}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              onClick={() => loginWithRedirect()}
              sx={{
                minWidth: "100%",
                borderRadius: "20px",
                textTransform: "uppercase",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#7FD7C3",
                },
              }}
            >
              Login
            </Button>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default LoginDialog;
