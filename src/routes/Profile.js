import { authService } from "fbase";
import { signOut } from "firebase/auth";
import React from "react";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const history = useHistory();
  const onLogOutClick = () => {
    signOut(authService);
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}
