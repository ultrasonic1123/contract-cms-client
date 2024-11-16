import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Card,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Add, Visibility } from "@mui/icons-material";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "contractId",
    headerName: "ID Hợp Đồng",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "amount",
    headerName: "Số Tiền",
    width: 120,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "paymentMethod",
    headerName: "Phương Thức",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "paymentDate",
    headerName: "Ngày Thanh Toán",
    width: 180,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Trạng Thái",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "actions",
    headerName: "Hành Động",
    flex: 1,
    renderCell: (params) => (
      <IconButton
        color="primary"
        component={Link}
        to={`/payments/${params.row.id}`}
        aria-label="view"
      >
        <Visibility />
      </IconButton>
    ),
    sortable: false,
    disableColumnMenu: true,
  },
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
          pagination={false}
          disableColumnFilter
          hideFooter
        />
      </Card>
    </Box>
  );
};

export default PaymentList;
