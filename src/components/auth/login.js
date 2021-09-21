import { GoogleLogin } from 'react-google-login';
import "./login.css"


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
     <>
     <article className="login-page">
       <GoogleLogin
         clientId='151641205925-1m112obp0km0gd74pongd3i1upco1019.apps.googleusercontent.com'
         buttonText="Login using Google"
         onSuccess={LoginWithGoogleCredentials}
         onFailure={responseGoogle_error}
         cookiePolicy={'single_host_origin'}
         isSignedIn={true}
       />
     </article>
     </>
   )
}

