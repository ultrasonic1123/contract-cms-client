import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Breadcrumbs,
  MenuItem,
  Select,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../const/api";
import axios from "axios";
import dayjs from "dayjs";

const PaymentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isCreate = Boolean(!id);
  const [contractId, setContractId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getListContract = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contract`);
      const { data } = await res.json();
      if (data?.results) {
        const contracts = data.results.map((item) => ({
          ...item,
          serviceProvided: item.service.name,
          documentCount: item.documents.length,
        }));
        setContracts(contracts);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListContract();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      if (isCreate) {
        const { data } = await axios.post(`${BASE_URL}/payment`, {
          contractId,
          paymentAmount,
          paymentDate: dayjs(paymentDate).format(),
          paymentMethod,
        });
        console.log("check", data);
        if (data.success) {
          navigate("/payments");
        }
      } else {
        const { data } = await axios.put(`${BASE_URL}/payment`, {
          id,
          contractId,
          paymentAmount,
          paymentDate: dayjs(paymentDate).format(),
          paymentMethod,
        });
        if (data.success) {
          navigate("/payments");
        }
      }
    } catch (e) {
      console.log("Error when place payment", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/payment/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        navigate("/payments");
      }
    } catch (e) {
      console.log("Error when delete payment", e);
    } finally {
      setLoading(false);
    }
  };

  const getDetailPayment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/payment/${id}`);
      const { data } = await res.json();
      setContractId(data?.contract?.id);
      setPaymentMethod(data?.paymentMethod);
      setPaymentAmount(data?.amount);
      setPaymentDate(dayjs(data?.paymentDate ? data.paymentDate : new Date()));
    } catch (e) {
      console.log("Error when get detail payment", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    handleSave();
  };

  useEffect(() => {
    if (!isCreate) getDetailPayment();
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
        <Link to="/">Trang chủ</Link>
        <Link to="/payments">Danh Sách Thanh Toán</Link>
        <Typography color="text.primary">Thanh Toán</Typography>
      </Breadcrumbs>
      <Box
        sx={{
          mt: 3,
          border: "1px solid grey",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Thanh Toán Hợp Đồng
        </Typography>
        <form
          onSubmit={handlePaymentSubmit}
          style={{ width: "100%", maxWidth: 600 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel id="demo-select-small-label">ID Hợp Đồng</InputLabel>
              <Select
                fullWidth
                size="small"
                id="demo-select-small"
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
                labelId="demo-select-small-label"
                required
              >
                {contracts.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.contractName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số Tiền Thanh Toán"
                variant="outlined"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Ngày Thanh Toán"
                value={paymentDate}
                onChange={(newValue) => setPaymentDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Phương Thức Thanh Toán"
                variant="outlined"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <MenuItem value="transfer">Chuyển khoản</MenuItem>
                <MenuItem value="credit_card">Thẻ tín dụng</MenuItem>
                <MenuItem value="cash">Tiền mặt</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          {isCreate ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Thanh Toán
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, mr: 2 }}
              >
                Cập Nhật Thanh Toán
              </Button>
              <Button
                onClick={handleDeletePayment}
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
              >
                Xóa thanh toán
              </Button>
            </>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default PaymentForm;
