import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axiosInstance from "../axiosInstance";

interface ProjectDetail {
  loading: boolean;
  success: boolean;
}

interface formValues {
  projectTitle: string;
  projectFrontend: string;
  projectBackend: string;
  projectDetails: string;
}

export const postProject = createAsyncThunk<
  formValues,
  { rejectValue: string }
>("post/project", async (projectDescription, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<formValues>(
      "api/projects/",
      projectDescription
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || error.message || "Login failed"
    );
  }
});

const initialState: ProjectDetail = {
  loading: false,
  success: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(postProject.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(postProject.rejected, (state) => {
        state.loading = false;
        state.success = false;
      });
  },
});

export default projectSlice.reducer;
