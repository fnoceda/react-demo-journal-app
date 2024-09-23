import { Link as RouterLink } from "react-router-dom";
import { Grid, TextField, Typography, Button, Link, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication= useMemo(() => status === 'checking');

  const formValidations = {
    email: [(value) => value.includes("@"), "Corredo debe tener @"],
    password: [
      (value) => value.length >= 6,
      "El password debe de tener mas de 6 caracteres",
    ],
    displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
  };

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    dispatch( startCreatingUserWithEmailPassword({ email, password, displayName }) );

    console.log(formState);
  };

  return (
    <AuthLayout title="Register">
      <h1>FormValid {isFormValid ? "true" : "false"}</h1>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster" >
        <Grid container>
          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Nombre completo"
              type="text"
              placeholder="Tu Nombre"
              fullWidth
              name="displayName"
              onChange={onInputChange}
              value={displayName}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

          <Grid
          display={ !!errorMessage ? '' : 'none' } 
            item xs={12}
          >
            <Alert severity="error">
                { errorMessage }
            </Alert>
          </Grid>

            <Grid item xs={12}>
              <Button 
                disabled={ isCheckingAuthentication }
                variant="contained" 
                fullWidth type="submit"
                >
                  Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}> Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
