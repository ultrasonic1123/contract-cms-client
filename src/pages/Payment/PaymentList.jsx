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
import { Add, Cancel, Done, Payment, Visibility } from "@mui/icons-material";
import { BASE_URL } from "../../const/api";
import { useEffect, useState } from "react";
import ModalQR from "./ModalQR";
import { BillStatus } from "../../const/constant";
import { confirm, ConfirmProvider } from "material-ui-confirm";
import axios from "axios";
import formatMoney from "../../helpers/formatMoney";

const PaymentList = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [payment, setPayment] = useState();

  const handleSubmit = (type, id) => {
    const title = type
      ? "Bạn muốn hoàn thành thanh toán này?"
      : "Bạn muốn hủy thanh toán này?";
    confirm({
      description: title,
    }).then(async () => {
      setLoading(true);
      try {
        const response = await axios.patch(
          `${BASE_URL}/payment/${id}/${type ? "done" : "cancel"}`
        );
        getPayments();
        return response;
      } catch (error) {
        console.error("Error uploading data and files:", error);
      } finally {
        setLoading(false);
      }
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "contractId",
      width: 150,
      headerName: "ID Hợp Đồng",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "amount",
      headerName: "Số Tiền",
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (value) => formatMoney(value),
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
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Chi tiết",
      flex: 1,
      renderCell: (params) => {
        const payment = params.row;
        return (
          <Box>
            <IconButton
              color="primary"
              component={Link}
              to={`/payments/edit/${params.row.id}`}
              aria-label="view"
            >
              <Visibility />
            </IconButton>
            {[BillStatus.Pending].includes(payment.status) &&
              payment.paymentMethod == "tranfer" && (
                <IconButton
                  color="primary"
                  aria-label="view"
                  onClick={() => {
                    setPayment(params.row);
                    setIsOpenModal(true);
                  }}
                >
                  <Payment />
                </IconButton>
              )}

            {[BillStatus.Pending].includes(payment.status) && (
              <IconButton
                color="primary"
                aria-label="view"
                onClick={() => {
                  handleSubmit(true, payment.id);
                }}
              >
                <Done />
              </IconButton>
            )}

            {[BillStatus.Pending].includes(payment.status) && (
              <IconButton
                color="primary"
                aria-label="view"
                onClick={() => {
                  handleSubmit(false, payment.id);
                }}
              >
                <Cancel />
              </IconButton>
            )}
          </Box>
        );
      },
      sortable: false,
      disableColumnMenu: true,
    },
  ];

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
        {payments.length === 0 && !loading && (
          <Typography variant="h6" color="text.secondary" align="center" my={6}>
            Không có thanh toán để hiển thị.
          </Typography>
        )}
      </Card>
      <ModalQR
        open={isOpenModal}
        handleClose={() => {
          setPayment(undefined);
          setIsOpenModal(false);
        }}
        value={payment?.id}
      />
    </Box>
  );
};

export default PaymentList;
