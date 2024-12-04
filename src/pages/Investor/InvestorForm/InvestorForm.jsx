import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Breadcrumbs,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Save } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "../../../const/api";

const InvestorForm = () => {
  const { id } = useParams();
  const isCreate = Boolean(!id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const handleGetInvestor = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/investor/${id}`);
      const { data } = await res.json();
      if (data) {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isCreate) {
      handleGetInvestor();
    }
  }, []);

  if (loading)
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Đang tải dữ liệu...
        </Typography>
      </Box>
    );

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
        <Link to="/investors">Danh Sách Chủ Đầu Tư</Link>
        <Typography color="text.primary">{`${
          isCreate ? "Thêm" : "Cập Nhật"
        } Chủ Đầu Tư`}</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        Thêm Chủ Đầu Tư
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Tên Chủ Đầu Tư"
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
