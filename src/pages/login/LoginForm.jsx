import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/features/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { error, loading } = auth;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        bgcolor: "background.default",
      }}
    >
      <form
        onSubmit={(e) => handleLogin(e)}
        style={{ width: "100%", maxWidth: 600 }}
      >
        <Card sx={{ minWidth: 300, p: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              align="center"
              gutterBottom
            >
              Đăng nhập
            </Typography>
            <TextField
              label="Tên đăng nhập"
              variant="outlined"
              margin="normal"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              error={Boolean(error)}
            />
            <TextField
              label="Mật khẩu"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={Boolean(error)}
              helperText={error}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
}
