// components/LoginForm.js
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Logic xử lý đăng nhập
    if (username && password) {
      onLogin(); // Gọi hàm đăng nhập từ App để cập nhật trạng thái
    }
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
      <Card sx={{ minWidth: 300, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Đăng nhập
          </Typography>
          <TextField
            label="Tên đăng nhập"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Mật khẩu"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Đăng nhập
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
