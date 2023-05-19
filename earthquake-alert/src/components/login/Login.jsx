import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
  const cilentID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={cilentID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default Login;