import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux';

import utilStyles from '../styles/utils.module.scss';
import Layout from '../components/layout';
import SocialLoginButton from '../components/SocialLoginButton';
import { setUser } from '../stores/userSlice';
import { CircularProgress } from '@material-ui/core';


const Login = ({user, token}) => {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!token){
      return;
    }
    const idToken = token.idToken;
    if(idToken){
      requestToVerifyGoogleAccount(idToken);
    }
  }, [token]);

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  console.log('GOOGLE_CLIENT_ID', GOOGLE_CLIENT_ID);
  const router = useRouter();

  const handleSocialLogin = user =>  {
    dispatch(setUser(user));
    router.push('/home');
  };

  const requestToVerifyGoogleAccount = async (token) => {
    setLoading(true);

    const res = await fetch(`http://localhost:8051/api/google_login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token})
    });

    const userId = await res.json();
    if(user.id===userId){
      router.push('/home');
    }

    setLoading(false);
  };

  const handleSocialLoginFailure = e =>  console.log(e)

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', width: '100vw'
      }}
    >
      <Paper
        style={{
          width: '60%',
          margin: 'auto',
          padding: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
          <SocialLoginButton
            provider='google'
            appId='923672546587-olmscr5jlopvabts1mlme9duqj6or86h.apps.googleusercontent.com'
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
            disabled={loading}
          >
            {
              loading ?
              <CircularProgress size={24} />
              :
              'Login with Google'
            }
          </SocialLoginButton>
      </Paper>
    </div>
  )
}

const mapStateRoProps = (state) => ({
  user: state.user.value._profile,
  token: state.user.value._token
})

export default connect(mapStateRoProps)(Login);