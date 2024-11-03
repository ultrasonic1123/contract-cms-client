// Report.js
import React from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";
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
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const projectData = [
  { name: "Chưa bắt đầu", value: 5 },
  { name: "Đang tiến hành", value: 10 },
  { name: "Hoàn thành", value: 7 },
];

const paymentData = [
  { status: "Hoàn thành", count: 15 },
  { status: "Đang xử lý", count: 5 },
  { status: "Đã hủy", count: 3 },
];

const phaseProgressData = [
  { month: "Tháng 1", progress: 20 },
  { month: "Tháng 2", progress: 40 },
  { month: "Tháng 3", progress: 60 },
  { month: "Tháng 4", progress: 80 },
  { month: "Tháng 5", progress: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Report = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, justifyContent: "flex-start", width: "100%" }}
      >
        <Link to="/">Trang Chủ</Link>
        <Typography color="text.primary">Báo Cáo Thống Kê</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        Báo Cáo Thống Kê Dự Án
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        {/* Biểu đồ tiến độ dự án */}
        <Box sx={{ width: "30%" }}>
          <Typography variant="h6" gutterBottom>
            Tiến Độ Dự Án
          </Typography>
          <PieChart width={300} height={300}>
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Box>

        {/* Biểu đồ trạng thái thanh toán */}
        <Box sx={{ width: "30%" }}>
          <Typography variant="h6" gutterBottom>
            Trạng Thái Thanh Toán
          </Typography>
          <BarChart width={300} height={300} data={paymentData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </Box>

        {/* Biểu đồ tiến độ các phase */}
        <Box sx={{ width: "30%" }}>
          <Typography variant="h6" gutterBottom>
            Tiến Độ Các Phase
          </Typography>
          <LineChart width={300} height={300} data={phaseProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="progress" stroke="#ff7300" />
          </LineChart>
        </Box>
      </Box>
    </Box>
  );
};

export default Report;
