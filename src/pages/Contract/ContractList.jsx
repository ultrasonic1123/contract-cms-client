import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  Breadcrumbs,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ContractList = () => {
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
  ]);

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
    <Box sx={{ p: 3 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, justifyContent: "flex-start", width: "100%" }}
      >
        <Link to="/">Trang Chủ</Link>
        <Typography color="text.primary">Danh Sách hợp đồng</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/contracts/create"
          sx={{ mb: 2 }}
          endIcon={<Add />}
        >
          Thêm Hợp Đồng
        </Button>
      </Box>
      <Card style={{ width: "100%" }}>
        <DataGrid
          rows={contracts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Card>
    </Box>
  );
};

export default ContractList;
