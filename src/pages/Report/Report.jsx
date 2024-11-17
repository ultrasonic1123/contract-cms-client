import { Box, Typography, Breadcrumbs, Card } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
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

const COLORS = ["#72BF6A", "#C0C5CC"];

const Report = () => {
  const [contracts, setContracts] = useState([]);
  const [projects, setProjects] = useState([]);
  const paidContracts = contracts.filter((item) => item.payment);
  const unpaidContracts = contracts.filter((item) => !item.payment);
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
    <Box sx={{ p: 3 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, justifyContent: "flex-start", width: "100%" }}
      >
        <Link to="/">Trang Chủ</Link>
        <Typography color="text.primary">Báo Cáo Thống Kê</Typography>
      </Breadcrumbs>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          p: 3,
        }}
      >
        <Card sx={{ width: "90%", p: 3 }}>
          <Typography variant="h6" gutterBottom>
            1. Tổng quan thanh toán
          </Typography>
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
        </Card>
        <Card sx={{ width: "90%", mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            2. Tổng quan dự án
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <BarChart width={300} height={300} data={paymentData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Report;
