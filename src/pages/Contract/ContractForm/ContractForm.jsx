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
  CircularProgress,
  Breadcrumbs,
  ListItemButton,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { BASE_URL } from "../../../const/api";
import axios from "axios";
import dayjs from "dayjs";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FileDownload } from "@mui/icons-material";
import ModalViewPdf from "../ModalViewPdf";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const ContractCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isCreate = Boolean(!id);
  const [contractName, setContractName] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [signingDate, setSigningDate] = useState(null);
  const [expectedCompleteDate, setExpectedCompleteDate] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([]);

  console.log({ selectedJobs });

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
        setSelectedService(data.service?.id);
        setSigningDate(dayjs(data.signingDate));
        setUploadedFiles(data.documents);
        setSelectedJobs(
          data.jobs ??
            allServices.find((x) => x.id === data.service?.id).jobs ??
            []
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formPayload = new FormData();
    console.log({ id });
    id && formPayload.append("id", id);
    formPayload.append("contractName", contractName);
    formPayload.append("contractNumber", contractNumber);
    formPayload.append("serviceId", selectedService);
    formPayload.append("signingDate", dayjs(signingDate).format());

    selectedJobs.forEach((v, index) => {
      formPayload.append("jobs", JSON.stringify(v));
    });

    // formPayload.append("jobs", JSON.stringify(selectedJobs));

    const nonExistedFiles = uploadedFiles.filter((file) => !file.id);
    for (const file of nonExistedFiles) {
      formPayload.append("files", file);
    }

    try {
      const response = await fetch(`${BASE_URL}/contract`, {
        method: isCreate ? "POST" : "PUT",
        body: formPayload,
      });
      const result = await response.json();
      console.log("Response:", result);
      if (result.success) {
        navigate("/contracts");
      }
    } catch (error) {
      console.error("Error uploading data and files:", error);
    } finally {
      setLoading(false);
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
    <Box sx={{ p: 3, maxWidth: "600px", mx: "auto" }}>
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
        <Box sx={{ p: 2, border: "1px solid grey", borderRadius: 3, mb: 3 }}>
          <Typography mb={4}>1. Thông tin hợp đồng</Typography>
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
        </Box>
        <Box sx={{ p: 2, border: "1px solid grey", borderRadius: 3, mb: 3 }}>
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
                setSelectedJobs(
                  allServices.find((x) => x.id === e.target.value).jobs
                );
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
                    <ListItemButton
                      key={item.id}
                      onClick={(v) =>
                        setSelectedJobs((prev) => {
                          if (prev.find((v) => v.id === item.id))
                            return prev.filter((v) => v.id !== item.id);
                          return [...prev, item];
                        })
                      }
                      selected={selectedJobs?.find((v) => v.id == item.id)}
                    >
                      <Stack
                        width={"100%"}
                        direction={"row"}
                        justifyContent={"space-between"}
                      >
                        <Typography>{item.name}</Typography>
                        {selectedJobs?.find((v) => v.id == item.id) && (
                          <CheckCircleOutlineIcon />
                        )}
                      </Stack>
                    </ListItemButton>
                  ))}
                </List>
              </>
            )}
          </Grid>
        </Box>
        <Box sx={{ p: 2, border: "1px solid grey", borderRadius: 3, mb: 3 }}>
          <Typography gutterBottom>3. Tài liệu liên quan</Typography>
          <Grid item xs={12}>
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
              Chọn Tệp
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileUpload}
                accept="application/pdf"
              />
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
                  <ListItemText
                    primary={file.name}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setUrl(file?.downloadUrl ?? URL.createObjectURL(file));
                    }}
                  />
                  {file.downloadUrl && (
                    <Button
                      startIcon={<FileDownload />}
                      href={file.downloadUrl}
                    >
                      Download
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </Grid>
        </Box>
        <Box sx={{ p: 2, border: "1px solid grey", borderRadius: 3, mb: 3 }}>
          <Typography mb={3}>4. Ngày kí hợp đồng</Typography>
          <Grid item xs={12}>
            <DatePicker
              label="Ngày kí hợp đồng"
              value={signingDate}
              onChange={(newValue) => setSigningDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </Grid>
        </Box>
        <Box sx={{ p: 2, border: "1px solid grey", borderRadius: 3, mb: 3 }}>
          <Typography mb={3}>5. Ngày dự định hoàn thành</Typography>
          <Grid item xs={12}>
            <DatePicker
              label="Ngày hoàn thành dự kiến"
              value={expectedCompleteDate}
              onChange={(newValue) => setExpectedCompleteDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </Grid>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Lưu Hợp Đồng
        </Button>
      </form>
      <ModalViewPdf
        open={!!url}
        handleClose={() => {
          setUrl("");
        }}
        url={url}
      />
    </Box>
  );
};

export default ContractCreate;
