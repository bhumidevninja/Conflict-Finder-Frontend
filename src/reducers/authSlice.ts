import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

interface Tokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile: string;
  is_active: boolean;
  is_superuser: boolean;
}

interface IRegister {
  loading: boolean;
  error: boolean;
  success: boolean;
  errorMessage: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  loading: boolean;
  success: boolean;
  errorMessage: string;
  registerState: IRegister;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface IRegisterUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile: string;
  is_active: boolean;
  is_superuser: boolean;
}

interface IRegisterPayload {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
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

export const registerUserThunk = createAsyncThunk<
  IRegisterUser,
  IRegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (registerDetail, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<IRegisterUser>(
      "user/register/",
      registerDetail
    );
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
  errorMessage: "",
  registerState: {
    error: false,
    success: false,
    loading: false,
    errorMessage: "",
  },
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

    clearRegisterErrorMessage: (state) => {
      state.registerState.errorMessage = '';
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
        state.errorMessage = "";
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.errorMessage = action.payload?.detail;
      })
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
      .addCase(fetchUserInfo.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.registerState.loading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.registerState.loading = false;
        state.registerState.success = true;
      })
      .addCase(
        registerUserThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.registerState.loading = false;
          state.registerState.success = false;
          if(action.payload?.email){
            state.registerState.errorMessage = action.payload?.email;
          }
          else if(action.payload?.password){
            state.registerState.errorMessage = action.payload?.password;
          }
        }
      );
  },
});

export const { clearRegisterErrorMessage, logout } = authSlice.actions;
export default authSlice.reducer;
