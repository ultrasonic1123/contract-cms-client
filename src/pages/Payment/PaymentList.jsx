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
import { BASE_URL } from "../../const/api";
import { useEffect, useState } from "react";

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
    width: 200,
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
    width: 200,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "actions",
    headerName: "Chi tiết",
    flex: 1,
    renderCell: (params) => (
      <IconButton
        color="primary"
        component={Link}
        to={`/payments/edit/${params.row.id}`}
        aria-label="view"
      >
        <Visibility />
      </IconButton>
    ),
    sortable: false,
    disableColumnMenu: true,
  },
];

const PaymentList = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/payment`);
      const { data } = await res.json();
      setPayments(
        data?.results?.map((item) => ({
          ...item,
          contractId: item.contract.id,
        }))
      );
      console.log({ data });
    } catch (e) {
      console.log("Error when get payments", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = () => {
    navigate("/payments/create");
  };

  useEffect(() => {
    getPayments();
  }, []);

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
          loading={loading}
          rows={payments}
          columns={columns}
          pagination={false}
          disableColumnFilter
          hideFooter
        />
      </Card>
      {payments.length === 0 && !loading && (
        <Typography variant="h6" color="text.secondary" align="center" my={6}>
          Không có thanh toán để hiển thị.
        </Typography>
      )}
    </Box>
  );
};

export default PaymentList;
