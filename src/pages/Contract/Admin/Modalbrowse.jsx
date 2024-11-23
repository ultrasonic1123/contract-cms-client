import React, { useEffect, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  Card,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../const/api";
import { ContractStatus } from "../../../const/constant";
import { DataGrid } from "@mui/x-data-grid";
import { Cancel, Done } from "@mui/icons-material";
import { confirm } from "material-ui-confirm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function ModalBrowse({ open, handleClose, refresh }) {
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getListContract = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/contract?filter={"status":"${
          value == 0 ? ContractStatus.Comfirm : ContractStatus.PendingCancel
        }"}`
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
  }, [value]);

  const submit = (type, id) => {
    confirm({
      description: <>Chấp nhận hành động này?</>,
    }).then(async () => {
      setLoading(true);
      let url = "";
      if (value == 0) {
        url = type ? "complete" : "cancel-complete";
      } else url = type ? "allow-cancel" : "deny-cancel";
      try {
        const response = await axios.patch(`${BASE_URL}/contract/${id}/${url}`);
        await getListContract();
        refresh();
        return response;
      } catch (error) {
        console.error("Error uploading data and files:", error);
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
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
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
            color="primary"
            aria-label="done"
            onClick={() => submit(true, params.row.id)}
          >
            <Done />
          </IconButton>

          <IconButton
            color="primary"
            aria-label="cancel"
            onClick={() => submit(false, params.row.id)}
          >
            <Cancel />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Duyệt hoàn thành hợp đồng" />
            <Tab label="Duyệt hủy hợp đồng" />
          </Tabs>
        </Box>

        <Box sx={{ p: "10px 0 20px" }}>
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
              <Typography
                variant="h6"
                color="text.secondary"
                align="center"
                my={6}
              >
                Không có hợp đồng để hiển thị.
              </Typography>
            )}
          </Card>
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 10,
            right: 20,
          }}
        >
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalBrowse;
