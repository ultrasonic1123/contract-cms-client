// AccountList.js
import React from "react";
import { Box, Button, Typography, Breadcrumbs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "employeeName", headerName: "Tên Nhân Viên", width: 200 },
  { field: "username", headerName: "Tên Tài Khoản", width: 200 },
  { field: "role", headerName: "Vai Trò", width: 150 },
];

const rows = [
  {
    id: 1,
    employeeName: "Nguyễn Văn A",
    username: "nva123",
    role: "Quản trị viên",
  },
  { id: 2, employeeName: "Trần Thị B", username: "ttb456", role: "Nhân viên" },
  { id: 3, employeeName: "Lê Văn C", username: "lvc789", role: "Nhân viên" },
];

const AccountList = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/accounts/create");
  };

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
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default AccountList;
