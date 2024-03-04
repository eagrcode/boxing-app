// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userID: string;
  fullName: string;
  email: string;
  avatarURL: string;
  username: string;
}

interface SetUserDetailsActionPayload {
  userID: string;
  fullName: string;
  email: string;
  avatarURL: string;
  username: string;
}

const initialState: UserState = {
  userID: "",
  fullName: "",
  email: "",
  avatarURL: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<SetUserDetailsActionPayload>) => {
      const { userID, fullName, email, avatarURL, username } = action.payload;
      state.userID = userID;
      state.fullName = fullName;
      state.email = email;
      state.avatarURL = avatarURL;
      state.username = username;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
