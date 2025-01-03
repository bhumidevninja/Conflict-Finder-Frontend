import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axiosInstance from "../axiosInstance";
import { User as IUser } from "./authSlice";

interface IprojectDetail {
  id: string;
  title: string;
  frontend_tech: string;
  backend_tech: string;
  desc: string;
  status: string;
  user: IUser;
}

interface ProjectDetail {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  projectSuggestion: string;
  suggestionLoader: boolean;
  projectList: IprojectDetail[];
  postProjectState: IPostProject,
}

interface IProjectDetailsForm {
  title: string;
  frontend_tech: string;
  backend_tech: string;
  desc: string;
}

interface IProjectStatus {
  status: string;
  id: string;
}

interface IProjectSuggestion {
  desc: string;
}

interface IPostProject {
  loading: boolean;
  success: boolean;
  errorMsg: string
}

const initialState: ProjectDetail = {
  loading: false,
  success: false,
  errorMessage: "",
  projectSuggestion: "",
  projectList: [],
  suggestionLoader: false,
  postProjectState: {
    loading: false,
    success: false,
    errorMsg: ''
  },
};

export const postProject = createAsyncThunk<
  any,
  IProjectDetailsForm,
  { rejectValue: string }
>("post/project", async (projectDescription, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<IProjectDetailsForm>(
      "api/projects/",
      projectDescription
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || error.message || "Failed to create Project"
    );
  }
});

export const fetchProjectInfo = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("get/projectInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("api/projects/");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || error.message || "Failed to fetch project info"
    );
  }
});

export const putProject = createAsyncThunk<
  any,
  IProjectStatus,
  { rejectValue: string }
>("put/project", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch<IProjectStatus>(
      `api/projects/${payload.id}/`,
      { status: payload.status }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || error.message || "Failed to update Project"
    );
  }
});

export const getSuggestion = createAsyncThunk<
  any,
  IProjectSuggestion,
  { rejectValue: string }
>("get/suggestion", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<IProjectSuggestion>(
      `api/projects/conflict_suggestion/`,
      payload
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || error.message || "Failed to update Project"
    );
  }
});

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
    },
    clearSuggestion: (state) => {
      state.projectSuggestion = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProject.pending, (state) => {
        state.loading = true;
        state.postProjectState.loading = true;
      })
      .addCase(postProject.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.postProjectState.loading = false;
        state.postProjectState.success = true;
      })
      .addCase(postProject.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.postProjectState.success = false;
        if (action.payload.title) {
          state.errorMessage = `A project with the same title already exists. Please choose a different title.`;
        } else {
          state.errorMessage = `
            The project matches another project with a similarity of : ${action.payload.desc.similar_descs[0].percentage}
            Use the generate suggestion button to get suggestion.
          `;
        }
      });

    builder
      .addCase(fetchProjectInfo.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(
        fetchProjectInfo.fulfilled,
        (state, action: PayloadAction<IprojectDetail[]>) => {
          state.loading = false;
          state.success = true;
          const result = action.payload.map(
            (project: IprojectDetail) => ({
              id: project.id,
              first_name: `${project.user.first_name} ${project.user.last_name}`,
              status: project.status,
              title: project.title,
              frontend_tech: project.frontend_tech,
              backend_tech: project.backend_tech,
              desc: project.desc,
              user: project.user,
            })
          );
          state.projectList = result;
        }
      )
      .addCase(fetchProjectInfo.rejected, (state) => {
        state.loading = false;
        state.success = false;
      });

    builder
      .addCase(putProject.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(
        putProject.fulfilled,
        (state, action: PayloadAction<IprojectDetail[]>) => {
          state.loading = false;
          state.success = true;
          const result = action.payload.map(
            (project: IprojectDetail) => ({
              id: project.id,
              first_name: `${project.user.first_name} ${project.user.last_name}`,
              status: project.status,
              title: project.title,
              frontend_tech: project.frontend_tech,
              backend_tech: project.backend_tech,
              desc: project.desc,
              user: project.user,
            })
          );
          state.projectList = result;
        }
      )
      .addCase(putProject.rejected, (state) => {
        state.loading = false;
        state.success = false;
      });

    builder
      .addCase(getSuggestion.pending, (state) => {
        state.suggestionLoader = true;
        state.success = false;
      })
      .addCase(getSuggestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.suggestionLoader = false;
        state.success = true;
        state.projectSuggestion = action.payload.suggestions;
      })
      .addCase(getSuggestion.rejected, (state) => {
        state.suggestionLoader = false;
        state.success = false;
      });
  },
});

export const { clearMessage, clearSuggestion } = projectSlice.actions;
export default projectSlice.reducer;
