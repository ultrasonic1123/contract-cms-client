import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  Breadcrumbs,
  Input,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../const/api";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ModalJobs from "./ModalJobs";
import WorkIcon from "@mui/icons-material/Work";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import ModalCancel from "./ModalCancel";
import { ContractStatus } from "../../const/constant";

const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

  const getListContract = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contract`);
      const { data } = await res.json();
      if (data?.results) {
        console.log({ data });
        const contracts = data.results.map((item) => ({
          ...item,
          serviceProvided: item.service?.id,
          documentCount: item.documents.length,
        }));
        setContracts(contracts);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListContract();
  }, []);

  const columns = [
    {
      field: "contractName",
      headerName: "Tên Hợp Đồng",
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "signingDate",
      headerName: "Ngày Ký",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "serviceProvided",
      headerName: "Dịch Vụ Cung Cấp",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "documentCount",
      headerName: "Số Tài Liệu",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      headerName: "Tình trạng",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (_, row) => {},
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            component={Link}
            to={`/contracts/edit/${params.row.id}`}
            color="primary"
            aria-label="view"
          >
            <Visibility />
          </IconButton>

          <IconButton
            onClick={() => {
              setIsOpenModal(true);
              setSelectedContract(params.row);
            }}
            color="primary"
            aria-label="jobs"
            disabled={[ContractStatus.Cancel].includes(params.row.status)}
          >
            <WorkHistoryIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              setSelectedContract(params.row);
              setIsOpenModalCancel(true);
            }}
            color="primary"
            aria-label="cancel"
            disabled={[
              ContractStatus.Cancel,
              ContractStatus.Done,
              ContractStatus.PendingCancel,
            ].includes(params.row.status)}
          >
            <DoDisturbOnIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleClose = () => {
    getListContract();
    setIsOpenModal(false);
    setSelectedContract(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, justifyContent: "flex-start", width: "100%" }}
      >
        <Link to="/">Trang Chủ</Link>
        <Typography color="text.primary">Danh Sách Hợp Đồng</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/contracts/manage-jobs"
          sx={{ mb: 2, mr: 2 }}
          endIcon={<WorkIcon />}
        >
          Quản lý công việc
        </Button>
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
          loading={loading}
          rows={contracts}
          columns={columns}
          pagination={false}
          disableColumnFilter
          hideFooter
        />
        {contracts.length === 0 && !loading && (
          <Typography variant="h6" color="text.secondary" align="center" my={6}>
            Không có hợp đồng để hiển thị.
          </Typography>
        )}
      </Card>
      <ModalJobs
        open={isOpenModal}
        handleClose={handleClose}
        selected={selectedContract}
      />

      <ModalCancel
        open={isOpenModalCancel}
        handleClose={() => {
          setSelectedContract(null);
          setIsOpenModalCancel(false);
        }}
        selected={selectedContract}
        refresh={getListContract}
      />
    </Box>
  );
};

export default ContractList;
