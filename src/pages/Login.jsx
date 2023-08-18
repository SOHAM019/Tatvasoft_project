import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../services/auth.service";
import { useAuthContext } from "../context/auth";

const linkStyle = {
  textDecoration: "none",
};

const initialValues = {
  email: "",
  password: "",
};

const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .min(6)
    .required("Please enter password with min 6 char"),
});
const Login = () => {
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        authService.login(values).then((res) => {
          authContext.setUser(res);
          toast.success("Login successfully");
          navigate("/");
        });
      },
    });

  return (
    <Container maxWidth="lg" sx={{ margin: "1.5rem auto" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: 600 }}
          textAlign="center"
        >
          Login or Create An Account
        </Typography>

        <Grid container spacing={5} alignItems="center" justifyContent="center">
          <Grid item md={6} xs={12}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>
             Login
            </Typography>
            <hr />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    Email Address
                  </Typography>
                  <TextField
                    type="email"
                    size="small"
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                    error={errors.email && touched.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    Password
                  </Typography>
                  <TextField
                    type="password"
                    size="small"
                    fullWidth
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                    error={errors.password && touched.password}
                  />
                </Grid> 
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      textTransform: "capitalize",
           
                      fontWeight: "600",
                    }}
                  >
                    Login
                  </Button>
                
                  <div className="spaces" style={{marginTop:"10px",marginBottom:"5px",fontSise:"20px"}}> Or don't have an Account ?</div>
                  <Link to="/register" style={linkStyle}>
              <Button
                variant="contained"
             
                sx={{
                  textTransform: "capitalize",
                
                  fontWeight: "600",
                }}
              >
                Create an Account
              </Button>
            </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
