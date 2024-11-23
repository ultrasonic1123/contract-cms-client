import {
  Box,
  Typography,
  Breadcrumbs,
  Card,
  Stack,
  TextField,
  CircularProgress,
  Button,
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
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";
import { BASE_URL } from "../../const/api";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { FileDownloadOutlined } from "@mui/icons-material";
import formatMoney from "../../helpers/formatMoney";
import dayjs from "dayjs";

const COLORS = [
  "#72BF6A",
  "#C0C5CC",
  "#b4d3d4",
  "#ecd9bc",
  "#ff8080",
  "#7d898b",
  "#b46a75",
];

const DashboardPage = () => {
  const [contracts, setContracts] = useState([]);
  const [contractsByYear, setContractsByYear] = useState([]);
  const [projects, setProjects] = useState([]);
  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  const [startDate, setStartDate] = useState(
    dayjs(defaultStartDate.setDate(defaultStartDate.getDate() - 30))
  );
  const [endDate, setEndSate] = useState(dayjs(defaultEndDate));
  const [loading, setLoading] = useState(false);
  const [isdownLoad, setIsDownLoad] = useState(false);

  const getTotalContractsAmount = () => {
    const total = contracts.reduce((acc, curr) => acc + curr.amount, 0);
    return formatMoney(total);
  };

  const getAllContracts = async () => {
    const { data } = await axios.get(`${BASE_URL}/report/contract/year`);
    if (data.data) {
      setContractsByYear(data.data);
    } else {
      setContractsByYear([]);
    }
  };

  const downloadContractXLXS = async () => {
    try {
      setIsDownLoad(true);
      const response = await axios.get(
        `${BASE_URL}/report/contract/download-contract?startDate=${dayjs(
          startDate
        ).format("YYYY-MM-DD")}&endDate=${dayjs(endDate).format("YYYY-MM-DD")}`,
        {
          responseType: "blob",
        }
      );
      const blob = response.data;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "bao_cao_hop_dong.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setIsDownLoad(false);
    }
  };

  const getContractReport = async () => {
    const { data: resData } = await axios.get(
      `${BASE_URL}/report/contract?startDate=${dayjs(startDate).format(
        "YYYY-MM-DD"
      )}&endDate=${dayjs(endDate).format("YYYY-MM-DD")}`
    );
    if (resData.data) {
      setContracts(resData.data.map((x) => ({ ...x.contract })));
      setProjects(resData.data.map((x) => ({ ...x.project })));
    } else {
      setContracts([]);
    }
    return resData;
  };

  const getReport = async () => {
    setLoading(true);
    await Promise.all([getContractReport()]);
    setLoading(false);
  };

  const getServiceReportData = () => {
    const services = contracts.map((x) => x.service);

    return [
      {
        status: "Tư vấn",
        count: services.filter((x) => x.name === "Tư vấn").length,
      },
      {
        status: "Thiết kế",
        count: services.filter((x) => x.name === "Thiết kế").length,
      },
      {
        status: "Thẩm tra",
        count: services.filter((x) => x.name === "Thẩm tra").length,
      },
      {
        status: "Lập tài liệu",
        count: services.filter((x) => x.name === "Lập tài liệu").length,
      },
    ];
  };

  const getPaymentReportData = () => {
    const payments = contracts.reduce(
      (acc, curr) => [...acc, ...curr.payments],
      []
    );

    return [
      {
        name: "Chờ thanh toán",
        value: payments.filter((x) => x.status === "Chờ thanh toán").length,
      },
      {
        name: "Đã thanh toán",
        value: payments.filter((x) => x.status === "Đã thanh toán").length,
      },
      {
        name: "Đã hủy",
        value: payments.filter((x) => x.status === "Đã hủy").length,
      },
    ].filter((x) => x.value);
  };

  const contractStatusData = [
    {
      name: "Đang xử lý",
      value: contracts.filter((x) => x.status === "Đang sử lý").length,
    },
    {
      name: "Đã ký",
      value: contracts.filter((x) => x.status === "Đã ký").length,
    },
    {
      name: "Đang thực hiện",
      value: contracts.filter((x) => x.status === "Đang thực hiện").length,
    },
    {
      name: "Đã hoàn thành",
      value: contracts.filter((x) => x.status === "Đã hoàn thành").length,
    },
    {
      name: "Chờ duyệt hủy",
      value: contracts.filter((x) => x.status === "Chờ duyệt hủy").length,
    },
    {
      name: "Đã hủy",
      value: contracts.filter((x) => x.status === "Đã hủy").length,
    },
    {
      name: "Chờ duyệt",
      value: contracts.filter((x) => x.status === "Chờ duyệt").length,
    },
  ].filter((x) => x.value);

  useEffect(() => {
    getContractReport();
    getAllContracts();
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
        {/* Bộ lọc thời gian*/}
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
                justifyContent: "space-around",
              }}
            >
              <DatePicker
                label="Từ ngày"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
              <DatePicker
                sx={{ mx: 2 }}
                label="Đến ngày"
                value={endDate}
                onChange={(newValue) => setEndSate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
              <Button variant="outlined" onClick={getReport} disabled={loading}>
                Cập nhật dữ liệu báo cáo
              </Button>
            </Box>
          </Stack>
        </Card>
        {/* Thông tin chung */}
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
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography mb={2}>1. Thông tin chung</Typography>
              </Box>
              <Stack direction="row" gap="15px" justifyContent="space-around">
                <Box
                  sx={{
                    border: "1px solid grey",
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "#c0c5cc",
                  }}
                >
                  <Typography>
                    Tổng số hợp đồng:{" "}
                    <Typography align="center" color="info">
                      {contracts.length}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid grey",
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "#c0c5cc",
                  }}
                >
                  Tổng giá trị hợp đồng:{" "}
                  <Typography align="center" color="info">
                    {getTotalContractsAmount()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid grey",
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "#c0c5cc",
                  }}
                >
                  Tổng số dự án:{" "}
                  <Typography align="center" color="info">
                    {projects.length}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          )}
        </Card>
        {/* Thông tin hợp đồng */}
        <Card
          sx={{
            width: "90%",
            mb: 3,
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography gutterBottom>2. Trạng thái hợp đồng</Typography>
                <Button
                  disabled={isdownLoad}
                  loading={isdownLoad}
                  variant="outlined"
                  startIcon={<FileDownloadOutlined />}
                  onClick={() => {
                    console.log("Xuất báo cáo về hợp đồng");
                    downloadContractXLXS();
                  }}
                >
                  Xuất báo cáo
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart width={500} height={300}>
                  <Pie
                    data={contractStatusData}
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
                    {contractStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </Box>
            </>
          )}
        </Card>
        {/* Thông tin thanh toán */}
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography gutterBottom>3. Tỷ lệ thanh toán</Typography>
                <Button variant="outlined" startIcon={<FileDownloadOutlined />}>
                  Xuất báo cáo
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart width={600} height={300}>
                  <Pie
                    data={getPaymentReportData()}
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
                    {getPaymentReportData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </Box>
            </>
          )}
        </Card>
        {/* Thông tin dịch vụ */}
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography gutterBottom>4. Phân loại theo dịch vụ</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <BarChart
                  barSize={30}
                  width={500}
                  height={250}
                  data={getServiceReportData()}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" width="20px" />
                </BarChart>
              </Box>
            </>
          )}
        </Card>
        <Card
          sx={{
            mt: 3,
            width: "90%",
            p: 2,
            ...(loading && {
              display: "flex",
              justifyContent: "center",
              py: 6,
            }),
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom>
              5. Thống kê số hợp đồng (theo năm)
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={contractsByYear}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardPage;
