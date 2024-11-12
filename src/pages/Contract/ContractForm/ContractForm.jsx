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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { BASE_URL } from "../../../const/api";
import axios from "axios";

const ContractCreate = () => {
  const [contractName, setContractName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  console.log({ selectedService });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allServices, setAllServices] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  const handleRemoveFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("contractName", contractName);
    formPayload.append("serviceName", serviceName);
    formPayload.append("startDate", startDate);
    formPayload.append("endDate", endDate);

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
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: "600px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Tạo Hợp Đồng
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên Hợp Đồng"
          variant="outlined"
          fullWidth
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <InputLabel id="demo-select-small-label">
              Tên dịch vụ cung cấp trong hợp đồng
            </InputLabel>
            <Select
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
            <Typography sx={{ my: 1 }}>
              Các công việc được cung cấp trong dịch vụ:{" "}
            </Typography>
            <List sx={{ height: "250px", overflowY: "scroll" }}>
              {selectedServiceData?.jobs?.map((item) => (
                <ListItem key={item.id}>{item.name}</ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Ngày Bắt Đầu"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Ngày Kết Thúc"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </Grid>
        </Grid>
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Chọn Tệp
          <input type="file" hidden multiple onChange={handleFileUpload} />
        </Button>
        {/* Hiển thị danh sách tệp đã chọn */}
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
