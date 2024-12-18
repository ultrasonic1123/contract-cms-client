import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Card,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../const/api";
import { Add, PlayCircle, Visibility } from "@mui/icons-material";
import { PermissionWarp } from "../../layout/components";
import { ContractStatus, ProjectStatus, UserRole } from "../../const/constant";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import ModalCancel from "../Project/ModalCancel";
import { confirm } from "material-ui-confirm";
import InputSearch from "../../components/InputSearch";

const ProjectList = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState();
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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
          <Tooltip title="Xem">
            <IconButton
              color="primary"
              component={Link}
              to={`/projects/edit/${params.row.id}`}
              aria-label="view"
              disabled={![ProjectStatus.Doing].includes(params.row.status)}
            >
              <Visibility />
            </IconButton>
          </Tooltip>

          <PermissionWarp role={[UserRole.SuperAdmin, UserRole.Director]}>
            <Tooltip title="Hủy">
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
            </Tooltip>

            <Tooltip title="Hoàn thành">
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
            </Tooltip>
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
      const filterText =
        filter !== "all" ? `filter={"status": "${filter}"}` : "";

      const { data } = await axios.get(
        `${BASE_URL}/project?search=${search}&${filterText}`
      );
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
  }, [search, filter]);

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

      <Box sx={{ display: "flex" }}>
        <InputSearch value={search} setValue={setSearch} />
        <Box sx={{ minWidth: 240, marginInlineStart: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Trạng thái"
              onChange={(e) => setFilter(e.target.value)}
              size="small"
            >
              {Object.values(ProjectStatus).map((v, index) => {
                return (
                  <MenuItem key={index} value={v}>
                    {v}
                  </MenuItem>
                );
              })}
              <MenuItem value={"all"}>Tất cả</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

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
          pagination={true}
          disableColumnFilter
          // hideFooter
          loading={loading}
          pageSizeOptions={[1, 5, 10, 25]}
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
