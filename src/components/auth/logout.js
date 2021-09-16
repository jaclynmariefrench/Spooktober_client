import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router';


export const Logout = () => {
  const history = useHistory()

  const logoutSuccess = () => {
      localStorage.removeItem('spooktober_token')
      history.push("/login")
    }

  return (
          <GoogleLogout
          clientId="151641205925-1m112obp0km0gd74pongd3i1upco1019.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logoutSuccess}
          >
        </GoogleLogout>
      )
}