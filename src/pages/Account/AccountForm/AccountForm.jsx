// AccountForm.js
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Breadcrumbs,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const roles = [
  { value: "admin", label: "Quản trị viên" },
  { value: "employee", label: "Nhân viên" },
];

const AccountForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic xử lý lưu tài khoản mới hoặc cập nhật tài khoản
    console.log({
      employeeName,
      username,
      password,
      role,
    });
    alert("Tài khoản đã được lưu!");
    navigate("/accounts");
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, justifyContent: "flex-start", width: "100%" }}
      >
        <Link to="/accounts">Quản Lý Tài Khoản</Link>
        <Typography color="text.primary">Tạo Tài Khoản</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        Tạo Tài Khoản Nhân Viên
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên Nhân Viên"
              variant="outlined"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên Tài Khoản"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mật Khẩu"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Vai Trò"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Lưu Tài Khoản
        </Button>
      </form>
    </Box>
  );
};

export default AccountForm;
