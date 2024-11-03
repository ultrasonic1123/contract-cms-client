import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Breadcrumbs,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Save } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "../../../const/api";

const InvestorForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      name,
      phone,
      email,
      address,
    });

    const res = await axios.post(`${BASE_URL}/investor`, {
      name,
      phone,
      email,
      address,
    });
    console.log({ res });
    navigate("/investors");
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
        <Link to="/investors">Danh Sách Nhà Đầu Tư</Link>
        <Typography color="text.primary">Thêm Nhà Đầu Tư</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        Thêm Nhà Đầu Tư
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Tên Nhà Đầu Tư"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Số Điện Thoại"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
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
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Địa Chỉ"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          endIcon={<Save />}
        >
          Lưu Thông Tin
        </Button>
      </form>
    </Box>
  );
};

export default InvestorForm;
