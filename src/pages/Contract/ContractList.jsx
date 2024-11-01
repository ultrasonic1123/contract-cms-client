import { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ContractList = () => {
  // Dữ liệu giả hợp đồng
  const [contracts, setContracts] = useState([
    {
      id: 1,
      name: "Hợp Đồng Xây Dựng 1",
      serviceName: "Dịch Vụ Xây Dựng",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      progress: "50%",
    },
    {
      id: 2,
      name: "Hợp Đồng Bảo Trì 2",
      serviceName: "Dịch Vụ Bảo Trì",
      startDate: "2023-05-01",
      endDate: "2024-04-30",
      progress: "75%",
    },
    // Thêm dữ liệu khác nếu cần
  ]);

  // Cấu hình các cột của DataGrid
  const columns = [
    { field: "name", headerName: "Tên Hợp Đồng", flex: 2 },
    { field: "serviceName", headerName: "Tên Dịch Vụ", flex: 2 },
    { field: "startDate", headerName: "Ngày Bắt Đầu", flex: 1 },
    { field: "endDate", headerName: "Ngày Kết Thúc", flex: 1 },
    { field: "progress", headerName: "Tiến Độ", flex: 1 },
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

  return (
    <Box sx={{ p: 3, maxWidth: "900px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Danh Sách Hợp Đồng
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/contracts/create"
        sx={{ mb: 2 }}
      >
        Thêm Hợp Đồng
      </Button>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={contracts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default ContractList;
