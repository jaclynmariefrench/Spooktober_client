import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_BASE_BACKEND_URL } = process.env;

export const Login = () => {
  const history = useHistory();
//   const { setUser } = useContext(UserContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(history.location.search);

    const error = queryParams.get('error');

    if (error) {
      window.alert(error);
      history.replace({ search: null });
    }
  }, [history]);

//   const handleUserInit = useCallback(
//     resp => {
//       if (resp.ok) {
//         setUser(resp.data);
//         history.push("/");
//       } else {
//         window.alert("Error occured!")
//       }
//     },
//     [history, setUser]
//   );

//   const onGoogleLoginSuccess = useCallback(
//     response => {
//       const idToken = response.tokenId;
//       const data = {
//         email: response.profileObj.email,
//         first_name: response.profileObj.givenName,
//         last_name: response.profileObj.familyName
//       };

//       validateTokenAndObtainSession({ data, idToken })
//         .then(handleUserInit)
//         .catch(notifyError);
//     },
//     [handleUserInit]
//   );

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const redirectUri = 'api/v1/auth/login/google/';

    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');

    const params = {
      response_type: 'code',
      client_id: REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: `${REACT_APP_BASE_BACKEND_URL}/${redirectUri}`,
      prompt: 'select_account',
      access_type: 'offline',
      scope
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}`;
  }, []);

  return (
      <>
      <h1 >Welcome to Spooktober!</h1>

      <h2>Server-side flow:</h2>
      <GoogleButton
        onClick={openGoogleLoginPage}
        label="Sign in with Google"
        disabled={!REACT_APP_GOOGLE_CLIENT_ID}
      />
      </>
  );
};

// export default Login;
// className={styles.pageHeader}