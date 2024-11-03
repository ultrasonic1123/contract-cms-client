import { Box, Button, Typography, Breadcrumbs, Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

const columns = [
  { field: "id", headerName: "ID Thanh Toán", width: 150 },
  { field: "contractId", headerName: "ID Hợp Đồng", width: 150 },
  { field: "amount", headerName: "Số Tiền", width: 120 },
  { field: "paymentMethod", headerName: "Phương Thức", width: 150 },
  { field: "paymentDate", headerName: "Ngày Thanh Toán", width: 180 },
  { field: "status", headerName: "Trạng Thái", width: 150 },
];

const rows = [
  {
    id: 1,
    contractId: "C001",
    amount: 500000,
    paymentMethod: "Chuyển khoản",
    paymentDate: "2024-10-01",
    status: "Hoàn thành",
  },
  {
    id: 2,
    contractId: "C002",
    amount: 750000,
    paymentMethod: "Thẻ tín dụng",
    paymentDate: "2024-10-05",
    status: "Đang xử lý",
  },
  {
    id: 3,
    contractId: "C003",
    amount: 300000,
    paymentMethod: "Tiền mặt",
    paymentDate: "2024-10-10",
    status: "Hoàn thành",
  },
  {
    id: 4,
    contractId: "C004",
    amount: 450000,
    paymentMethod: "Chuyển khoản",
    paymentDate: "2024-10-15",
    status: "Đã hủy",
  },
];

const PaymentList = () => {
  const navigate = useNavigate();

  const handleCreatePayment = () => {
    navigate("/payments/create");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, justifyContent: "flex-start", width: "100%" }}
      >
        <Link to="/">Trang Chủ</Link>
        <Typography color="text.primary">Danh Sách Thanh Toán</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreatePayment}
          sx={{ mb: 2 }}
          endIcon={<Add />}
        >
          Tạo Thanh Toán Mới
        </Button>
      </Box>
      <Card style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          className="whiteDataGrid"
        />
      </Card>
    </Box>
  );
};

export default PaymentList;
