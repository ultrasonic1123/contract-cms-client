import {
  Box,
  Typography,
  Breadcrumbs,
  Card,
  Stack,
  TextField,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { BASE_URL } from "../../const/api";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

const COLORS = ["#72BF6A", "#C0C5CC"];

const DashboardPage = () => {
  const [contracts, setContracts] = useState([]);
  const [projects, setProjects] = useState([]);
  const paidContracts = contracts.filter((item) => item.payment);
  const unpaidContracts = contracts.filter((item) => !item.payment);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndSate] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPayments = async () => {
    const { data: resData } = await axios.get(`${BASE_URL}/contract`);
    if (resData.success) {
      setContracts(resData.data.results);
    }
  };

  const getProjects = async () => {
    const { data: resData } = await axios.get(`${BASE_URL}/project`);
    if (resData.success) {
      setProjects(resData.data.results);
    }
  };

  const getDoneProjects = () => {
    return projects.filter((project) =>
      project.phases.every((phase) =>
        paidContracts.some((x) => x.id === phase.contract.id)
      )
    ).length;
  };

  const projectData = [
    {
      name: "Đã thanh toán",
      value: paidContracts.length,
    },
    {
      name: "Chưa thanh toán",
      value: unpaidContracts.length,
    },
  ];
  const paymentData = [
    { status: "Hoàn thành", count: getDoneProjects() },
    { status: "Chưa hoàn thành", count: projects.length - getDoneProjects() },
  ];

  useEffect(() => {
    getPayments();
    getProjects();
  }, []);

  return (
    <Box sx={{ m: 1 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ justifyContent: "flex-start", width: "100%" }}
      >
        <Typography color="text.primary">Trang Chủ</Typography>
      </Breadcrumbs>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Card
          sx={{
            width: "90%",
            p: 2,
            mb: 3,
            display: "flex",
          }}
        >
          <Stack direction="column">
            <Typography gutterBottom>{"Lọc báo cáo theo thời gian"}</Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <DatePicker
                sx={{ width: "45%" }}
                label="Từ ngày"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
              <DatePicker
                sx={{ width: "45%" }}
                label="Đến ngày"
                value={endDate}
                onChange={(newValue) => setEndSate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </Box>
          </Stack>
        </Card>
        <Card
          sx={{
            width: "90%",
            p: 2,
            mb: 3,
            ...(loading && {
              display: "flex",
              justifyContent: "center",
              py: 6,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography gutterBotom>1. Tóm tắt thông tin</Typography>
              <Stack direction="row" gap="15px">
                <Box sx={{ border: "1px solid grey", p: 3, borderRadius: 3 }}>
                  Tổng số hợp đồng
                </Box>
                <Box sx={{ border: "1px solid grey", p: 3, borderRadius: 3 }}>
                  Tổng số hợp đồng
                </Box>
              </Stack>
            </>
          )}
        </Card>
        <Card
          sx={{
            width: "90%",
            p: 2,
            ...(loading && {
              display: "flex",
              justifyContent: "center",
              py: 6,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography gutterBottom>2. Tổng quan thanh toán</Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart width={500} height={300}>
                  <Pie
                    data={projectData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </Box>
            </>
          )}
        </Card>
        <Card
          sx={{
            width: "90%",
            mt: 3,
            p: 2,
            ...(loading && {
              display: "flex",
              justifyContent: "center",
              py: 6,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography gutterBottom>3. Tổng quan dự án</Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <BarChart width={300} height={300} data={paymentData}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </Box>
            </>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardPage;
