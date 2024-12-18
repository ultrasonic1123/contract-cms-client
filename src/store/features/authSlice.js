import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../const/api";
import { useSelector } from "react-redux";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const { success, message, data } = response.data;
    console.log({ success, message, data });

    if (success) {
      return { user: data };
    }

    return { error: message };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, error } = action.payload;
        state.loading = false;
        state.user = user;
        state.error = error;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const useGetUserStore = () => {
  return useSelector((state) => state.auth?.user);
};

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
