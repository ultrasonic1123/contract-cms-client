import {
  TextField,
  Typography,
  Box,
  TextareaAutosize,
  Divider,
} from "@mui/material";
const Phase = ({ phase, index, handlePhaseChange }) => {
  return (
    <Box>
      <Typography gutterBottom>{`Giai đoạn ${index + 1}`}</Typography>
      <TextField
        size="small"
        key={index}
        fullWidth
        label={"Tên giai đoạn"}
        variant="outlined"
        value={phase.phaseName}
        onChange={(e) => handlePhaseChange(index, e.target.value)}
        sx={{ mb: 2, fontSize: "12px" }}
      />
      <TextField
        multiline
        fullWidth
        margin="dense"
        label="Mô tả giai đoạn"
        rows={5}
        sx={{ mb: 3 }}
      />
      <TextField
        size="small"
        key={index}
        fullWidth
        label={"Định danh hợp đồng"}
        variant="outlined"
        value={"1212212"}
        onChange={(e) => {}}
        sx={{ mb: 2, fontSize: "12px" }}
      />
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default Phase;
