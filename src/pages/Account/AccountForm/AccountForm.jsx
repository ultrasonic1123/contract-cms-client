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
import axios from "axios";
import { BASE_URL } from "../../../const/api";

const roles = [
  { value: "Super Admin", label: "Quản trị viên" },
  { value: "employee", label: "Nhân viên kinh doanh" },
  { value: "director", label: "Ban giám đốc" },
];

const AccountForm = () => {
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log({
      fullname: employeeName,
      username,
      password,
      role,
      email,
    });
    const res = await axios.post(
      `${BASE_URL}/user`,
      {
        fullname: employeeName,
        username,
        password,
        role,
        email,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log({ res });
    setLoading(false);
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
              size="small"
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
              size="small"
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
              size="small"
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
              size="small"
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
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          loading={loading}
        >
          Lưu Tài Khoản
        </Button>
      </form>
    </Box>
  );
};

export default AccountForm;
