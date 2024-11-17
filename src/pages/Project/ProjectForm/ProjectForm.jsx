import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Breadcrumbs,
  InputLabel,
  Select,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Link } from "react-router-dom";
import Phase from "./Phase";
import { Add, Save } from "@mui/icons-material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import { BASE_URL } from "../../../const/api";

dayjs.extend(customParseFormat);

const CreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [investors, setInvestors] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [investorInfo, setInvestorInfo] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [phases, setPhases] = useState([
    { name: "", description: "", contractId: "" },
  ]);

  const handleAddPhase = () => {
    setPhases([...phases, { name: "", description: "", contractId: "" }]);
  };

  const handlePhaseChange = (newPhases) => {
    setPhases(newPhases);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      projectName,
      investorInfo,
      startDate: dayjs(startDate).format(),
      endDate: dayjs(endDate).format(),
      phases,
    });
    handleSave();
  };

  const getInvestors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/investor`);
      setInvestors(data?.data?.results);
      setInvestorInfo(data?.data?.results[0]?.id);
    } catch (e) {
      console.log("Error when get investors' info", e);
    } finally {
      setLoading(false);
    }
  };

  const getContracts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contract`);
      const { data } = await res.json();
      if (data?.results) {
        const contracts = data.results.map((item) => ({
          ...item,
          serviceProvided: item.service.name,
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

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/project`, {
        projectName,
        investorInfo,
        startDate: dayjs(startDate).format(),
        endDate: dayjs(endDate).format(),
        phases,
      });
      console.log({ res });
    } catch (e) {
      console.log("Error when create or update project", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvestors();
    getContracts();
  }, []);

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
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
            <InputLabel id="demo-select-small-label">
              {"Thông Tin Nhà Đầu Tư *"}
            </InputLabel>
            <Select
              size="small"
              id="demo-select-small"
              value={investorInfo}
              labelId="demo-select-small-label"
              onChange={(e) => {
                setInvestorInfo(e.target.value);
              }}
              sx={{ width: "100%" }}
            >
              {investors.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontSize={16}>
              2. Các giai đoạn Dự Án
            </Typography>
            {phases.map((phase, index) => (
              <Phase
                key={index}
                {...{ phases, index, handlePhaseChange, contracts }}
              />
            ))}
            <Button
              variant="contained"
              onClick={handleAddPhase}
              endIcon={<Add />}
            >
              Thêm giai đoạn
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" fontSize={16}>
              3. Thời gian dự án
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Ngày Bắt Đầu"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField size="small" {...params} fullWidth required />
              )}
              sx={{ width: "100%" }}
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
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          endIcon={<Save />}
        >
          Lưu Dự Án
        </Button>
      </form>
    </Box>
  );
};

export default CreateProject;
