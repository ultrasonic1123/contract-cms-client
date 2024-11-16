import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Breadcrumbs,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Link } from "react-router-dom";

const PaymentForm = () => {
  const [contractId, setContractId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log({
      contractId,
      paymentAmount,
      paymentDate,
      paymentMethod,
    });
    alert("Thanh toán thành công!");
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
        <Link to="/contracts">Quản Lý Hợp Đồng</Link>
        <Typography color="text.primary">Thanh Toán</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        Thanh Toán Hợp Đồng
      </Typography>
      <form
        onSubmit={handlePaymentSubmit}
        style={{ width: "100%", maxWidth: 600 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID Hợp Đồng"
              variant="outlined"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
              required
            />
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Thanh Toán
        </Button>
      </form>
    </Box>
  );
};

export default PaymentForm;
