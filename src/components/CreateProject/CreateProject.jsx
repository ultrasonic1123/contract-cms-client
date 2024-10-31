// CreateProject.js
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Breadcrumbs,
  Card,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Link } from "react-router-dom";
import Phase from "./Phase";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [investorInfo, setInvestorInfo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [phases, setPhases] = useState([{ phaseName: "" }]);

  const handleAddPhase = () => {
    setPhases([...phases, { phaseName: "" }]);
  };

  const handlePhaseChange = (index, value) => {
    const newPhases = [...phases];
    newPhases[index].phaseName = value;
    setPhases(newPhases);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic để lưu dự án
    console.log({
      projectName,
      investorInfo,
      startDate,
      endDate,
      phases,
    });
    alert("Dự án đã được tạo!");
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, justifyContent: "flex-start", width: "100%" }}
      >
        <Link to="/projects">Quản Lý Dự Án</Link>
        <Typography color="text.primary">Tạo Dự Án</Typography>
      </Breadcrumbs>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontSize={16}>
              1. Thông tin chung
            </Typography>
            <TextField
              size="small"
              fullWidth
              label="Tên dự án"
              variant="outlined"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Thông Tin Nhà Đầu Tư"
              variant="outlined"
              value={investorInfo}
              onChange={(e) => setInvestorInfo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontSize={16}>
              2. Các giai đoạn Dự Án
            </Typography>
            {phases.map((phase, index) => (
              <Phase key={index} {...{ phase, index, handlePhaseChange }} />
            ))}
            <Button variant="contained" onClick={handleAddPhase}>
              Thêm Phase
            </Button>
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Ngày Bắt Đầu"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField size="small" {...params} fullWidth required />
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Lưu Dự Án
        </Button>
      </form>
    </Box>
  );
};

export default CreateProject;
