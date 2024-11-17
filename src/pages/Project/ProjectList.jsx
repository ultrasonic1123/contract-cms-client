import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Card,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../const/api";
import { Add, Visibility } from "@mui/icons-material";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "name",
    headerName: "Tên Dự Án",
    width: 200,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "createdAt",
    headerName: "Ngày Tạo",
    width: 180,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "actions",
    headerName: "Xem Chi Tiết",
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <IconButton
        color="primary"
        component={Link}
        to={`/projects/edit/${params.row.id}`}
        aria-label="view"
      >
        <Visibility />
      </IconButton>
    ),
  },
];

const ProjectList = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  const getProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/project`);
      setRows(
        data.data.results.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt).toLocaleDateString(),
        }))
      );
    } catch (e) {
      console.log("Error when getting projects", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

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
          endIcon={<Add />}
        >
          Tạo Dự Án
        </Button>
      </Box>
      <Card style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination={false}
          disableColumnFilter
          hideFooter
          loading={loading}
        />
        {rows.length === 0 && !loading && (
          <Typography variant="h6" color="text.secondary" align="center" my={6}>
            Không có dự án nào để hiển thị.
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default ProjectList;
