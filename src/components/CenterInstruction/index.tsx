import { Box, Typography } from "@mui/material";

const CenterInstruction = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="600px"
      textAlign="center"
      mx="auto"
      width="80%"
    >
      <Typography variant="h6" color="textSecondary">
        Click on the "Generate Suggestion" button to receive a recommendation.
      </Typography>
    </Box>
  );
};

export default CenterInstruction;
