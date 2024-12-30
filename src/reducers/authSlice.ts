import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface RegisterUser {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  loading: boolean;
  success: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  Tokens,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<Tokens>("/login/", userData);
    const { access, refresh } = response.data;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || error.message || "Login failed"
    );
  }
});

export const fetchUserInfo = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchUserInfo", async (_, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");

    const response = await axiosInstance.get("user/user-info/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || error.message || "Failed to fetch user info"
    );
  }
});


const initialState: AuthState = {
  user: null,
  tokens: null,
  loading: false,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.success = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<Tokens>) => {
        state.loading = false;
        state.success = true;
        state.tokens = action.payload;
      })
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.success = false;
        }
      )
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserInfo.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
          state.success = true;
        }
      )
      .addCase(
        fetchUserInfo.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
        }
      )
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
