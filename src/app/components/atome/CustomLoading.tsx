import { Stack, CircularProgress } from "@mui/material";

const CustomLoading = () => {
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%", width: "100%" }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default CustomLoading;
