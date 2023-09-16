import React, { useEffect } from "react";
import { LoginSocialGoogle } from "reactjs-social-login";

const GoogleLogin = ({ onSuccess, onFailure }) => {
  useEffect(() => {
    // This code will only run on the client side
    const clientId = "630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com";
    if (typeof window !== "undefined") {
      // Accessing window object is safe here
      LoginSocialGoogle.init(clientId);
    }
  }, []);

  return (
    <LoginSocialGoogle
      onSuccess={onSuccess}
      onFailure={onFailure}
    >
      Login with Google
    </LoginSocialGoogle>
  );
};

export default GoogleLogin;
