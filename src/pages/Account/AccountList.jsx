import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Card,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../const/api";
import { useEffect, useState } from "react";
import { Add, Visibility } from "@mui/icons-material";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "fullname",
    headerName: "Tên Nhân Viên",
    width: 200,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "username",
    headerName: "Tên Tài Khoản",
    width: 200,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "role",
    headerName: "Vai Trò",
    width: 150,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "active",
    headerName: "Hoạt động",
    width: 150,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "actions",
    headerName: "Chi tiết",
    flex: 1,
    renderCell: (params) => (
      <IconButton
        color="primary"
        component={Link}
        to={`/accounts/${params.row.id}`}
        aria-label="view"
      >
        <Visibility />
      </IconButton>
    ),
    sortable: false,
    disableColumnMenu: true,
  },
];

const AccountList = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    const { data } = await axios.get(`${BASE_URL}/user`);
    setRows(data.data);
    setLoading(false);
  };

  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate("/accounts/create");
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, justifyContent: "flex-start", width: "100%" }}
      >
        <Link to="/">Trang Chủ</Link>
        <Typography color="text.primary">Quản Lý Tài Khoản</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateAccount}
          sx={{ mb: 2 }}
          endIcon={<Add />}
        >
          Thêm Tài Khoản
        </Button>
      </Box>
      <Card style={{ width: "100%" }}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          className="whiteDataGrid"
          disableColumnFilter
          hideFooter
        />
      </Card>
    </Box>
  );
};

export default AccountList;
