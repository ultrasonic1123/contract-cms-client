import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  Breadcrumbs,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Add,
  Assessment,
  BrowserUpdated,
  PlayCircle,
  Visibility,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../const/api";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ModalJobs from "../ModalJobs";
import WorkIcon from "@mui/icons-material/Work";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import ModalCancel from "../ModalCancel";
import { ContractStatus } from "../../../const/constant";
import Modalbrowse from "./Modalbrowse";
import InputSearch from "../../../components/InputSearch";
import axios from "axios";
import { confirm } from "material-ui-confirm";

const ContractListAdmin = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
  const [isOpenModalBrowse, setIsOpenModalBrowse] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const getListContract = async () => {
    try {
      setLoading(true);
      const filterText =
        filter !== "all" ? `filter={"status": "${filter}"}` : "";
      const res = await fetch(
        `${BASE_URL}/contract?search=${search}&${filterText}`
      );
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
  }, [filter, search]);

  const handleSubmit = (item, status) => {
    confirm({
      description: <>Xác nhận hành động này?</>,
    }).then(async () => {
      setLoading(true);
      try {
        const response = await axios.patch(
          `${BASE_URL}/contract/${item.id}/${status}`
        );
        getListContract();
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
      field: "contractName",
      headerName: "Tên Hợp Đồng",
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "amount",
      headerName: "Giá trị hợp đồng",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (value) => value?.toLocaleString() + " vnd",
    },
    {
      field: "r",
      headerName: "Đã thanh toán",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (_, record) =>
        (record.amount - record.remaining)?.toLocaleString() + " vnd",
    },
    {
      field: "signingDate",
      headerName: "Ngày Ký",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "expectedCompleteDate",
      headerName: "Ngày Hoàn thành dự kiến",
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
      flex: 1.8,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            component={Link}
            to={`/contracts/edit/${params.row.id}`}
            color="primary"
            aria-label="view"
            disabled={![ContractStatus.Pending].includes(params.row.status)}
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
            disabled={[
              ContractStatus.Doing,
              ContractStatus.Done,
              ContractStatus.PendingCancel,
              ContractStatus.Comfirm,
              ContractStatus.Pending,
            ].includes(params.row.status)}
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
              ContractStatus.Pending,
              ContractStatus.Comfirm,
              ContractStatus.Signing,
            ].includes(params.row.status)}
          >
            <DoDisturbOnIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              handleSubmit(params.row, "sign");
            }}
            color="primary"
            aria-label="sign"
            disabled={![ContractStatus.Pending].includes(params.row.status)}
          >
            <Assessment />
          </IconButton>

          <IconButton
            onClick={() => {
              handleSubmit(params.row, "doing");
            }}
            color="primary"
            aria-label="doing"
            disabled={![ContractStatus.Signing].includes(params.row.status)}
          >
            <PlayCircle />
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
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
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
                {Object.values(ContractStatus).map((v, index) => {
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
            sx={{ mb: 2, mr: 2 }}
            endIcon={<BrowserUpdated />}
            onClick={() => setIsOpenModalBrowse(true)}
          >
            Duyệt
          </Button>
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
        </Box>
      </Box>

      <Card style={{ width: "100%" }}>
        <DataGrid
          loading={loading}
          rows={contracts}
          columns={columns}
          pagination
          disableColumnFilter
          // hideFooter

          pageSizeOptions={[5, 10, 25]}
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

      <Modalbrowse
        open={isOpenModalBrowse}
        handleClose={() => setIsOpenModalBrowse(false)}
        refresh={getListContract}
      ></Modalbrowse>
    </Box>
  );
};

export default ContractListAdmin;