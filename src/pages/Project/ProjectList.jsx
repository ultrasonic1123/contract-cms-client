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
import { Add, PlayCircle, Visibility } from "@mui/icons-material";
import { PermissionWarp } from "../../layout/components";
import { ProjectStatus, UserRole } from "../../const/constant";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import ModalCancel from "../Project/ModalCancel";
import { confirm } from "material-ui-confirm";

const ProjectList = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState();
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

  const handleSubmit = (item) => {
    confirm({
      description: <>Hoàn thành dự án này?</>,
    }).then(async () => {
      setLoading(true);
      try {
        const response = await axios.patch(
          `${BASE_URL}/project/${item.id}/complete`
        );
        getProjects();
        return response;
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    });
  };

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
      width: 250,
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
      field: "status",
      headerName: "Trạng thái",
      width: 180,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            component={Link}
            to={`/projects/edit/${params.row.id}`}
            aria-label="view"
            disabled={![ProjectStatus.Doing].includes(params.row.status)}
          >
            <Visibility />
          </IconButton>

          <PermissionWarp role={[UserRole.SuperAdmin, UserRole.Director]}>
            <IconButton
              onClick={() => {
                setSelected(params.row);
                setIsOpenModalCancel(true);
              }}
              color="primary"
              aria-label="cancel"
              disabled={![ProjectStatus.Doing].includes(params.row.status)}
            >
              <DoDisturbOnIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                handleSubmit(params.row);
              }}
              color="primary"
              aria-label="doing"
              disabled={
                ![ProjectStatus.Doing].includes(params.row.status) ||
                params.row.phases.filter(
                  (p) => p.contract.status != ContractStatus.Done
                ).length > 0
              }
            >
              <PlayCircle />
            </IconButton>
          </PermissionWarp>
        </Box>
      ),
    },
  ];

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
        <Link to="/">Trang chủ</Link>
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

      <ModalCancel
        open={isOpenModalCancel}
        handleClose={() => {
          setIsOpenModalCancel(false);
          setSelected(false);
        }}
        selected={selected}
        refresh={getProjects}
      />
    </Box>
  );
};

export default ProjectList;
