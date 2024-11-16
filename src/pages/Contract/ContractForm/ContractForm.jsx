import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  Breadcrumbs,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { BASE_URL } from "../../../const/api";
import axios from "axios";
import dayjs from "dayjs";
import { useParams, Link } from "react-router-dom";

const ContractCreate = () => {
  const { id } = useParams();
  const isCreate = Boolean(!id);
  const [contractName, setContractName] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [signingDate, setSigningDate] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  const handleRemoveFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const getContractDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contract/${id}`);
      const { data } = await res.json();
      if (data) {
        setContractName(data.contractName);
        setContractNumber(data.contractNumber);
        setSelectedService(1);
        setSigningDate(dayjs(data.signingDate));
        setUploadedFiles(data.documents);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("contractName", contractName);
    formPayload.append("contractNumber", contractNumber);
    formPayload.append("serviceId", selectedService);
    formPayload.append("signingDate", dayjs(signingDate).format());

    for (const file of uploadedFiles) {
      formPayload.append("files", file);
    }

    try {
      const response = await fetch(`${BASE_URL}/contract`, {
        method: "POST",
        body: formPayload,
      });
      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error uploading data and files:", error);
    }
  };

  const getAllServices = async () => {
    const res = await axios.get(`${BASE_URL}/provided-service`);
    const { data } = res.data;
    setAllServices(data);
  };

  const selectedServiceData = allServices.find((x) => x.id === selectedService);

  useEffect(() => {
    getAllServices();
    if (!isCreate) {
      getContractDetail();
    }
  }, [isCreate]);

  if (loading)
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Đang tải dữ liệu...
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ p: 3, maxWidth: "600px", mx: "auto" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link to="/">Trang Chủ</Link>
        <Link to="/contracts">Danh Sách Hợp Đồng</Link>
        <Typography color="text.primary">
          {isCreate ? "Tạo Hợp Đồng" : "Cập Nhật Hợp Đồng"}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h6" gutterBottom>
        {`${isCreate ? "Tạo" : "Cập nhật"} Hợp Đồng`}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography gutterBottom>1. Thông tin chung hợp đồng</Typography>
        <TextField
          label="Tên Hợp Đồng"
          variant="outlined"
          fullWidth
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
          sx={{ mb: 2 }}
          required
          size="small"
        />
        <TextField
          size="small"
          prefix="#CT24"
          label="Số Hợp Đồng"
          variant="outlined"
          fullWidth
          value={contractNumber}
          onChange={(e) => setContractNumber(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Divider sx={{ my: 2 }} />
        <Typography gutterBottom>2. Dịch vụ cung cấp</Typography>
        <Grid item xs={12}>
          <InputLabel id="demo-select-small-label">
            Tên dịch vụ cung cấp trong hợp đồng
          </InputLabel>
          <Select
            size="small"
            id="demo-select-small"
            value={selectedService}
            labelId="demo-select-small-label"
            onChange={(e) => {
              setSelectedService(e.target.value);
            }}
            sx={{ width: "100%" }}
          >
            {allServices.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          {selectedServiceData?.jobs?.length && (
            <>
              <Typography sx={{ my: 1 }}>
                Các công việc được cung cấp trong dịch vụ:{" "}
              </Typography>
              <List
                sx={{
                  height: "250px",
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                }}
              >
                {selectedServiceData?.jobs?.map((item) => (
                  <ListItem key={item.id}>{item.name}</ListItem>
                ))}
              </List>
            </>
          )}
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid item xs={12}>
          <Typography gutterBottom>3. Tài liệu liên quan</Typography>
          <Button variant="contained" component="label" sx={{ mb: 2 }}>
            Chọn Tệp
            <input type="file" hidden multiple onChange={handleFileUpload} />
          </Button>
          <List>
            {uploadedFiles.map((file) => (
              <ListItem
                key={file.name}
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="secondary"
                    onClick={() => handleRemoveFile(file.name)}
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid item xs={12}>
          <Typography gutterBottom>4. Ngày kí hợp đồng</Typography>
          <DatePicker
            label="Ngày kí hợp đồng"
            value={signingDate}
            onChange={(newValue) => setSigningDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Lưu Hợp Đồng
        </Button>
      </form>
    </Box>
  );
};

export default ContractCreate;
