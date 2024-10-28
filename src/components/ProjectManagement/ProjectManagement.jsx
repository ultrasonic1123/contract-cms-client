import { Box, Button, Typography, Breadcrumbs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Tên Dự Án", width: 200 },
  { field: "status", headerName: "Trạng Thái", width: 150 },
  { field: "createdDate", headerName: "Ngày Tạo", width: 180 },
];

const rows = [
  { id: 1, name: "Dự Án A", status: "Đang diễn ra", createdDate: "2024-10-01" },
  { id: 2, name: "Dự Án B", status: "Hoàn thành", createdDate: "2024-09-15" },
  { id: 3, name: "Dự Án C", status: "Chưa bắt đầu", createdDate: "2024-10-10" },
];

const ProjectManagement = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  return (
    <Box sx={{ p: 3, justifyContent: "start", width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          mb: 2,
        }}
      >
        <Typography color="text.primary">Quản Lý Dự Án</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProject}
          sx={{ mb: 2 }}
        >
          Tạo Dự Án
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
};

export default ProjectManagement;
