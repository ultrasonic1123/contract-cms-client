// InvestorList.js
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Breadcrumbs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../const/api";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Tên Nhà Đầu Tư", width: 200 },
  { field: "phone", headerName: "Số Điện Thoại", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
];

const InvestorList = () => {
  const navigate = useNavigate();

  const handleCreateInvestor = () => {
    navigate("/investors/create");
  };

  const [rows, setRows] = useState([]);

  const getInvestors = async () => {
    const { data } = await axios.get(`${BASE_URL}/investor`);
    setRows(data.data.results);
  };

  useEffect(() => {
    getInvestors();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link to="/">Trang Chủ</Link>
        <Typography color="text.primary">Danh Sách Nhà Đầu Tư</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        Danh Sách Nhà Đầu Tư
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateInvestor}
        sx={{ mb: 2 }}
      >
        Thêm Nhà Đầu Tư
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

export default InvestorList;
