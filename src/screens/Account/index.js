import { useEffect, useState } from "react";

import { View, Text } from "react-native";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

import { app } from "../../utils/firebase";

export default function Account() {
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    console.log("auth: ", { auth });

    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  if (hasLogged === null) {
    return <Loading />;
  }

  return hasLogged ? <UserLogged /> : <UserGuest />;
}
