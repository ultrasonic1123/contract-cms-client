import React, { useEffect, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, Typography } from "@mui/material";
import CustomEditor from "./CustomEditor/CustomEditor";
import axios from "axios";
import { BASE_URL } from "../../const/api";

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

function ModalCancel(props) {
  const { open, handleClose, selected, refresh } = props;

  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    const { data } = await axios.patch(
      `${BASE_URL}/contract/${selected.id}/cancel`,
      {
        reason_cancel: reason,
      }
    );

    if (data.level != "error") {
      handleClose();
      refresh();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography align="center" fontSize={20} fontWeight={600} color="red">
          Bạn muốn hủy hợp đồng?
        </Typography>
        <Box sx={{ paddingBlockEnd: 5 }}>
          <CustomEditor
            value={reason}
            setValue={setReason}
            name={"Lý do hủy hợp đồng?  *"}
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
          <Button
            onClick={handleSubmit}
            sx={{ background: "red", color: "white", ml: 2 }}
            disabled={!reason || reason == "<p><br></p>"}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalCancel;
