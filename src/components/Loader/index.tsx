import { Box, Skeleton } from "@mui/material";

const Loader = () => {
  return (
    <Box sx={{ width: "100%", height:"600px" }}>
      <Skeleton variant="text" height={20} width="85%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton
        variant="text"
        height={20}
        width="100%"
        sx={{ marginBottom: "16px" }}
      />

      <Skeleton variant="text" height={20} width="85%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton
        variant="text"
        height={20}
        width="100%"
        sx={{ marginBottom: "16px" }}
      />

      <Skeleton variant="text" height={20} width="85%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton
        variant="text"
        height={20}
        width="100%"
        sx={{ marginBottom: "16px" }}
      />

      <Skeleton variant="text" height={20} width="85%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton variant="text" height={20} width="100%" />

      <Skeleton variant="text" height={20} width="85%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton
        variant="text"
        height={20}
        width="100%"
        sx={{ marginBottom: "16px" }}
      />

      <Skeleton variant="text" height={20} width="85%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton variant="text" height={20} width="100%" />
    </Box>
  );
};

export default Loader;
