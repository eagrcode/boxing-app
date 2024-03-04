"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { setUserDetails } from "./userSlice";

type UserProps = {
  userID: string;
  fullName: string;
  email: string;
  avatarURL: string;
  username: string;
  children: React.ReactNode;
};

export default function StoreProvider({
  userID,
  fullName,
  email,
  avatarURL,
  username,
  children,
}: UserProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(setUserDetails({ userID, fullName, email, avatarURL, username }));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
