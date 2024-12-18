import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Card,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../const/api";
import { Add, FileDownloadOutlined, Visibility } from "@mui/icons-material";
import InputSearch from "../../components/InputSearch";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "name",
    headerName: "Tên Chủ Đầu Tư",
    width: 200,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "phone",
    headerName: "Số Điện Thoại",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 200,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "actions",
    headerName: "Chi tiết",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => (
      <Box>
        <IconButton
          component={Link}
          to={`/investors/edit/${params.row.id}`}
          color="primary"
          aria-label="view"
        >
          <Visibility />
        </IconButton>
      </Box>
    ),
  },
];

const InvestorList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [isDownLoad, setIsDownLoad] = useState(false);
  const [search, setSearch] = useState("");

  const handleCreateInvestor = () => {
    navigate("/investors/create");
  };

  const getInvestors = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/investor?search=${search}`);
      setRows(data.data.results);
    } catch (e) {
      console.log("Error when get investors", e);
    } finally {
      setLoading(false);
    }
  };

  const downloadContractXLXS = async () => {
    try {
      setIsDownLoad(true);
      const response = await axios.get(
        `${BASE_URL}/report/contract/download-investor`,
        {
          responseType: "blob",
        }
      );
      const blob = response.data;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "bao_cao_doanh_thu.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setIsDownLoad(false);
    }
  };

  useEffect(() => {
    getInvestors();
  }, [search]);

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link to="/">Trang Chủ</Link>
        <Typography color="text.primary">Danh Sách Chủ Đầu Tư</Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex" }}>
        <InputSearch value={search} setValue={setSearch} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateInvestor}
          sx={{ mb: 2 }}
          endIcon={<Add />}
        >
          Thêm Chủ Đầu Tư
        </Button>
      </Box>

      <Card style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination={false}
          disableColumnFilter
          hideFooter
        />
        {rows.length === 0 && !loading && (
          <Typography variant="h6" color="text.secondary" align="center" my={6}>
            Không có chủ đầu tư để hiển thị.
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default InvestorList;
