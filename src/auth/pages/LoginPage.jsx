import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Grid, TextField, Typography, Button, Link, Alert } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";


const formData = {
  email: 'fnoceda83@gmail.com', 
  password: '123456', 
};


export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();
  const { email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo( () => status === 'checking', [status]  );


  const onSubmit = (event) => {
    event.preventDefault();
    dispatch( startLoginWithEmailPassword({ email, password }) );
  };

  const onGoogleSignIn = (event) => {
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title="Login">
      <form aria-label="submit-form" onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={ onInputChange }
              value={ email }
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
              onChange={ onInputChange }
              value={ password }
              inputProps={
                {'data-testid': 'password'}
              }
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={ !!errorMessage ? '' : 'none' } >
              <Alert severity="error">
                  { errorMessage }
              </Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button 
              disabled={isAuthenticating}
              variant="contained" fullWidth type="submit">
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button 
                aria-label="google-btn"
                disabled={isAuthenticating}
                variant="contained" 
                fullWidth 
                onClick={ onGoogleSignIn }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
