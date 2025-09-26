import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { api } from "../../api";

type LoginForm = { email: string; password: string };

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const [snack, setSnack] = React.useState<{
    open: boolean;
    msg: string;
    sev: "success" | "error";
  }>({ open: false, msg: "", sev: "success" });

  const notify = (msg: string, sev: "success" | "error" = "success") =>
    setSnack({ open: true, msg, sev });

  const onSubmit = async (v: LoginForm) => {
    try {
      await api.post("/auth/login", v);
      nav("/employees", { replace: true });
    } catch (err: unknown) {
      const msg = isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : "Login failed";
      notify(msg, "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: 2,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.02) 100%)",
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 420, p: 3 }}>
        <Stack spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <LockOutlinedIcon />
          </Box>
          <Typography variant="h6">Admin Login</Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
          <TextField
            label="Email"
            type="email"
            inputMode="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting || !isValid}
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snack.sev} variant="filled">
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
