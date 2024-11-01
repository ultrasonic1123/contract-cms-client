import { useState } from "react";
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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

const ContractCreate = () => {
  const [contractName, setContractName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  const handleRemoveFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      contractName,
      serviceName,
      startDate,
      endDate,
      files: uploadedFiles,
    });
    alert("Hợp đồng đã được tạo!");
  };

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
        <TextField
          label="Tên Dịch Vụ"
          variant="outlined"
          fullWidth
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Grid container spacing={2} sx={{ mb: 2 }}>
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
