import { GoogleLogin } from 'react-google-login';
import "./login.css"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Spooktober
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme(
    {pallete: {
      primary: {
        main: green
      },
      secondary: {
        main: orange
      }
    }}
);


export const Login = (props) => {


  const LoginWithGoogleCredentials = (response) => {
        return fetch(`http://127.0.0.1:8000/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(response.profileObj)

    })
       .then(res => res.json())
       .then(data => {
         if (data.valid && data.token) {
           localStorage.setItem("spooktober_token", data.token)
           props.history.push("/profile")
         } else {
           window.alert("Login failed.")
         }
       })
   }

   const responseGoogle_error = () => {
     alert('Google could not verify your account.')
   }

   return (
     <div className="login-container">
    <h1 className="login-header">Spooktober</h1>
     <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="login-in-box">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <img src={"pictures/GHOST_ICON.png"} alt="Logo" /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in with Google
          </Typography>
          
          <article className="google-button">
            <GoogleLogin
              clientId='151641205925-1m112obp0km0gd74pongd3i1upco1019.apps.googleusercontent.com'
              buttonText="Login using Google"
              onSuccess={LoginWithGoogleCredentials}
              onFailure={responseGoogle_error}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </article>
            
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </div>
          </Box>
      </Container>
    </ThemeProvider>
  </div>
   )
}


