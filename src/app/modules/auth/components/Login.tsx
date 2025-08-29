import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {  useAuth } from "../core/Auth";
import { login, getLoggedUser, getUserDetails } from "../../../services/Frappe/ApiRequests/Auth";
import {Box,Button,Container,TextField,Typography,Paper,Alert,CircularProgress,Link as MuiLink,InputAdornment,IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const loginSchema = Yup.object().shape({
  email: Yup.string() .email("فرمت ایمیل اشتباه است") .min(3, "حداقل 3 کاراکتر") .max(50, "حداکثر 50 کاراکتر") .required("ایمیل الزامی است"),
  password: Yup.string().min(3, "حداقل 3 کاراکتر").max(50, "حداکثر 50 کاراکتر").required("رمز عبور الزامی است"),
});

const initialValues = {
  email: "",
  password: "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { saveFrappeUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const loginResponse = await login(values.email, values.password);
        if (loginResponse.message === "Logged In") {
          const userLoggedResponse = await getLoggedUser();
          const userDetails = await getUserDetails(userLoggedResponse.message);
          saveFrappeUser(userDetails);
        } else {
          throw new Error("خطا در ورود به سیستم");
        }
      } catch (error) {
        console.error(error);
        setStatus("نام کاربری یا رمز عبور اشتباه است");
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          ورود به سیستم
        </Typography>

        {formik.status ? (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {formik.status}
          </Alert>
        ) : (
        <></>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: "100%" }}>
          <TextField
           sx={{direction:"rtl"}}
            margin="normal"
            required
            fullWidth
            id="email"
            label="نام کاربری"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
          sx={{direction:"rtl"}}
            margin="normal"
            required
            fullWidth
            name="password"
            label="رمز عبور"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />


          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting || !formik.isValid || loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "ورود"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}