import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
const ProtectedRoute = ({children}) => {
  const router = useRouter();
  const [user, setUser] = useState('');
  
  useEffect(() => {
    const item = Cookies.get('nodejstoken');
    setUser(item);
    if (!item) {
      router.push("/login");
    }
  }, [])
  return <>{user ? children : null}</>;
};

export default ProtectedRoute;

export const PrivatetRoute = ({children}) => {
  const router = useRouter();
  const [user, setUser] = useState(' ');

  
  useEffect(() => {
    const item = Cookies.get('nodejstoken');
    setUser(item);
    if (item) {
      router.push("/");
    }
  }, [])
  return <>{user ? null : children}</>;
};
