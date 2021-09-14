import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_BASE_BACKEND_URL } = process.env;

export const Login = () => {
  const history = useHistory();

  useEffect(() => {
    const queryParams = new URLSearchParams(history.location.search);

    const error = queryParams.get('error');

    if (error) {
      window.alert(error);
      history.replace({ search: null });
    }
  }, [history]);


  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const redirectUri = 'accounts/google/login/callback/';

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
