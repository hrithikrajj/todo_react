import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, () => {
        console.log("requesting for login");
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.user) {
          (state.user = action.payload.user), (state.isAuthenticated = true);
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        window.localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(signupAsync.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axios.post("http://localhost:4000/api/login/", {
      email: email,
      password: password,
    });
    return response.data;
  }
);
export const signupAsync = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password1, password2 }) => {
    const body = {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
    };
    const response = await axios.post(
      "http://localhost:4000/api/signup/",
      body
    );
    return response.data;
  }
);
export const getUser = createAsyncThunk("auth/get", async () => {
  const token = window.localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("http://localhost:4000/api/", config);
  return response.data;
});

const {} = authSlice.actions;

export default authSlice.reducer;
