import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux';

import utilStyles from '../styles/utils.module.scss';
import Layout from '../components/layout';
import SocialLoginButton from '../components/SocialLoginButton';
import { setUser } from '../stores/userSlice';


const Login = ({user}) => {

  const dispatch = useDispatch();

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  console.log('GOOGLE_CLIENT_ID', GOOGLE_CLIENT_ID);
  const router = useRouter();

  // useEffect(() => {
  //   if(user){
  //     router.push('/home');
  //   }
  // }, [user]);

  const handleSocialLogin = user =>  {
    dispatch(setUser(user));
    router.push('/home');
  };

  const requestToVerifyGoogleAccount = () => {
    const data = {
      token: user._token.idToken
    };

    fetch(`${process.env.SERVER_API}/api/google_login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
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
            appId='75262550263-6ne1rfsalhpnrqsps6938ubguimjbl73.apps.googleusercontent.com'
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
          >
            Login with Google
          </SocialLoginButton>
      </Paper>
    </div>
  )
}

const mapStateRoProps = (state) => ({
  user: state.user.value._profile,
})

export default connect(mapStateRoProps)(Login);