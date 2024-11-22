import React, { useEffect, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../const/api";
import QRCode from "react-qr-code";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalQR(props) {
  const { open, handleClose, value } = props;

  const [loading, setLoading] = useState(false);
  const [qr, setQr] = useState("");

  const getQR = async () => {
    setLoading(true);

    const { data } = await axios.get(`${BASE_URL}/payment/${value}/create-qr`);
    if (data.data) setQr(data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (value) getQR();
  }, value);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography align="center" fontSize={20} fontWeight={600} color="red">
          Quét QR để thanh toán?
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "10px 0" }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "70%", width: "70%" }}
            value={qr}
            viewBox={`0 0 256 256`}
          />
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
    </Modal>
  );
}

export default ModalQR;
