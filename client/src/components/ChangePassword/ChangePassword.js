import "./ChangePassword.css";
import Button from "@material-ui/core/Button";
import { Container, Box, TextField } from "@mui/material";

function ChangePassword() {
  return (
    // Need to make sure current password is right, then change password/confirm change.
    <Container maxWidth="sm">
      <h1>Change Password</h1>
      <Box
        component="form"
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          // value={formData.confirmPassword}
          // onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="New Password"
          type="password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
        />
        <Button type="submit" variant="contained">
          Change Password
        </Button>
      </Box>
    </Container>
  );
}

export default ChangePassword;
