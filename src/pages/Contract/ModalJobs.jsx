import React, { useEffect, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { confirm, ConfirmProvider } from "material-ui-confirm";
import { BASE_URL } from "../../const/api";
import axios from "axios";
import { JobStatus } from "../../const/constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function ModalJobs(props) {
  const { open, handleClose, selected } = props;

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState(selected?.jobs ?? []);
  useEffect(() => {
    if (selected) setJobs(selected.jobs ?? []);
  }, [selected]);

  const progress = useMemo(() => {
    return (
      (jobs.filter((job) => job.status === JobStatus.Done).length /
        jobs.length) *
      100
    );
  }, [jobs]);

  const handleDoneJob = (item) => {
    confirm({
      description: (
        <>
          Hoàn thành công việc <b>{item.name}</b> này?
        </>
      ),
    }).then(async () => {
      setLoading(true);
      const jobsTemp = jobs.map((job) => ({
        ...job,
        status: item.id == job.id ? JobStatus.Done : job.status,
      }));

      try {
        const response = await axios.put(
          `${BASE_URL}/contract/${selected.id}/update-status-job`,
          { jobs: jobsTemp }
        );
        setJobs(jobsTemp);
        return response;
      } catch (error) {
        console.error("Error uploading data and files:", error);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ConfirmProvider>
        <Box sx={style}>
          <Typography fontWeight={500}>
            Hợp đồng: {selected?.contractName}
          </Typography>
          <Box sx={{ padding: "30px 0" }}>
            <Box sx={{ paddingBlockEnd: 2 }}>
              <Typography>Tiến trình hợp đồng</Typography>
              <LinearProgressWithLabel value={progress} />
            </Box>
            <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell width={100}>STT</TableCell>
                      <TableCell align="center">Tên công việc</TableCell>
                      <TableCell width={200} align="center">
                        Trạng Thái
                      </TableCell>
                      <TableCell width={200} align="center">
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobs?.map((row, index) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">
                          <Button
                            loading={loading}
                            onClick={() => handleDoneJob(row)}
                            disabled={row.status === JobStatus.Done}
                          >
                            Hoàn Thành
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box
            sx={{
              position: "fixed",
              bottom: 10,
              right: 20,
            }}
          >
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Box>
      </ConfirmProvider>
    </Modal>
  );
}

export default ModalJobs;
