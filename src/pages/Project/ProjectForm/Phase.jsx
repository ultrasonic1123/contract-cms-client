import { DeleteForeverOutlined } from "@mui/icons-material";
import { TextField, Typography, Box, Button } from "@mui/material";
import PropTypes from "prop-types";

const Phase = ({ phases, index, handlePhaseChange }) => {
  const phase = phases[index];

  const deletePhase = () => {
    const newPhases = [...phases];
    newPhases.splice(index, 1);
    handlePhaseChange(newPhases);
  };

  return (
    <Box sx={{ p: 2, border: "1px solid grey", mb: 2, borderRadius: 2 }}>
      <Typography gutterBottom>{`Giai đoạn ${index + 1}`}</Typography>
      <TextField
        size="small"
        key={index}
        fullWidth
        label={"Tên giai đoạn"}
        variant="outlined"
        value={phase.name}
        placeholder={`Giai đoạn ${index + 1}`}
        onChange={(e) => {
          const newPhases = [...phases];
          newPhases[index].name = e.target.value;
          handlePhaseChange(newPhases);
        }}
        sx={{ mb: 2, fontSize: "12px" }}
      />
      <TextField
        multiline
        fullWidth
        margin="dense"
        label="Mô tả giai đoạn"
        rows={5}
        sx={{ mb: 3 }}
        onChange={(e) => {
          const newPhases = [...phases];
          newPhases[index].description = e.target.value;
          handlePhaseChange(newPhases);
        }}
        value={phase.description}
      />
      <TextField
        size="small"
        key={index}
        fullWidth
        label={"Định danh hợp đồng"}
        variant="outlined"
        value={phase.contractId}
        onChange={(e) => {
          const newPhases = [...phases];
          newPhases[index].contractId = e.target.value;
          handlePhaseChange(newPhases);
        }}
        sx={{ mb: 2, fontSize: "12px" }}
      />
      <Button
        variant="outlined"
        endIcon={<DeleteForeverOutlined />}
        onClick={deletePhase}
        disabled={phases.length === 1}
      >
        Xóa
      </Button>
    </Box>
  );
};

Phase.propTypes = {
  phases: PropTypes.array,
  index: PropTypes.number,
  handlePhaseChange: PropTypes.func,
};

export default Phase;
