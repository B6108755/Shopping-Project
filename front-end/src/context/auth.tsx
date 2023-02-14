import { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../api/api";

const UserContext = createContext<any>({});

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<any>();
  const [userDetail, setUserDatail] = useState();
  
  useEffect(() => {
    console.log("log::", user);
  }, [user]);

  const findToken = (token: string) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    baseURL
      .get(`/api/profile`, config)
      .then((res) => {
        setUser(res.data);
      })
      .catch();
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, findToken, setUserDatail, userDetail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
