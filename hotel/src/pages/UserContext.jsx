import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userinfo, setUserInfo] = useState({
    username: "",
    useremail: "",
  });

  const Email = localStorage.getItem('email');

  useEffect(()=> {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getUser/${Email}`
        );
        setUserInfo({
          username: response.data[0].name,
          useremail: response.data[0].email,
        });
      } catch (error) {
        console.error("Error occurs when finding the mail info");
      }
    };
    fetchUser();
  },[])

  return (
    <UserContext.Provider value={{ userinfo }}>
      {children}
    </UserContext.Provider>
  );
};