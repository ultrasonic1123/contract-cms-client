import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  IconButton,
  Visibility,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../const/api";
import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Tên Nhân Viên", width: 200 },
  { field: "username", headerName: "Tên Tài Khoản", width: 200 },
  { field: "role", headerName: "Vai Trò", width: 150 },
  { field: "status", headerName: "Trạng thái", width: 150 },
  {
    field: "actions",
    headerName: "Hành Động",
    flex: 1,
    renderCell: (params) => (
      <Box>
        <IconButton
          component={Link}
          to={`/contracts/${params.row.id}`}
          color="primary"
          aria-label="view"
        >
          <Visibility />
        </IconButton>
      </Box>
    ),
  },
];

const AccountList = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    const { data } = await axios.get(`${BASE_URL}/user`, {
      "Content-Type": "application/json",
    });
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
      <Typography variant="h4" gutterBottom>
        Danh Sách Tài Khoản
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateAccount}
        sx={{ mb: 2 }}
      >
        Thêm Tài Khoản
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      </div>
    </Box>
  );
};

export default AccountList;
