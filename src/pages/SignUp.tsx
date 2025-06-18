import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signUp } from "../services/authService";
import { signUpFormData } from "../types/auth";

// interface FormData {
//   first_name: string;
//   last_name: string;
//   email_id: string;
//   password: string;
// }

export const SignUp = () => {
  const { setSucessToast, setErrorToast } = useContext(AuthContext);
  const [form, setForm] = useState<signUpFormData>({
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<signUpFormData>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<signUpFormData> = {};
    if (!form.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!form.email_id.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email_id = "Invalid email format";
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{10,}$/.test(form.password))
      newErrors.password =
        "Password must be at least 10 characters long and contain at least one uppercase and one lowercase letter";
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
      setLoading(true);
      setServerError(null);
      const response = await signUp(form);

      if (response) {
        setSucessToast("Account created. Please sign-in");
        navigate("/sign-in");
      } else {
        setServerError("Signup failed");
      }
    } catch (err: any) {
      setErrorToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4, width: 400 }}>
        <CardContent sx={{ padding: "0 !important" }}>
          <Box textAlign="center" mb={2}>
            <Box
              sx={{
                bgcolor: "#1976d2",
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mx: "auto",
                background:
                  "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
              }}
            >
              <Person sx={{ color: "#fff", fontSize: 30 }} />
            </Box>
            <Typography variant="h5" mt={2}>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign up to get started
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  placeholder="First Name"
                  label="First Name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  placeholder="Last Name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Email"
              name="email_id"
              type="email"
              placeholder="you@ex:ample.com"
              value={form.email_id}
              onChange={handleChange}
              error={!!errors.email_id}
              helperText={errors.email_id}
              margin="normal"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                background:
                  "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Already have an account?{" "}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "#1976d2", fontWeight: 500, cursor: "pointer" }}
                  onClick={() => navigate("/sign-in")}
                >
                  Login
                </Typography>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
