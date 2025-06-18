import { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BASE_URL, setToken, setUser } from "../utils/auth";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authService";
import { signInFormData } from "../types/auth";

// interface FormData {
//   email_id: string;
//   password: string;
// }

export const SignIn = () => {
  const { setSucessToast, setErrorToast, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email_id: "", password: "" });
  const [errors, setErrors] = useState<Partial<signInFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<signInFormData> = {};
    if (!form.email_id.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email_id = "Invalid email format";
    if (form.password.length < 10)
      newErrors.password = "Password must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const success = await login(form);
      if (success) {
        setSucessToast("Login successfully");
        navigate("/home");
      } else {
        setServerError("Login failed");
      }
    } catch (err: any) {
      console.error("err", err);
      setErrorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4, width: 400 }}>
        <CardContent sx={{ padding: "0 !important" }}>
          <Box textAlign="center" mb={2}>
            <Box
              sx={{
                background:
                  "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mx: "auto",
              }}
            >
              <LoginIcon sx={{ color: "#fff", fontSize: 30 }} />
            </Box>
            <Typography variant="h5" mt={2} sx={{ color: "#272538" }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="#272538">
              Login to your account
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email_id"
              placeholder="you@ex:ample.com"
              variant="outlined"
              margin="normal"
              value={form.email_id}
              onChange={handleChange}
              error={!!errors.email_id}
              helperText={errors.email_id}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              placeholder="••••••••"
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {serverError && (
              <Typography color="error" mt={1}>
                {serverError}
              </Typography>
            )}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                background:
                  "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
              }}
            >
              Login
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "#1976d2", fontWeight: 500, cursor: "pointer" }}
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
