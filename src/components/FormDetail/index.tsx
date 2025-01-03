import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Tooltip,
  Typography,
  Snackbar,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  clearSuggestion,
  fetchProjectInfo,
  getSuggestion,
  postProject,
} from "../../reducers/projectSlice";
import AlertDialog from "../AlertDialog";
import { LoadingButton } from "@mui/lab";
import Loader from "../Loader";
import CenterInstruction from "../CenterInstruction";

const FormDetail: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    errorMessage,
    projectSuggestion,
    suggestionLoader,
    postProjectState,
  } = useSelector((state: any) => state.project);

  useEffect(() => {
    dispatch(clearSuggestion());
  }, []);

  const [formValues, setFormValues] = useState({
    projectTitle: "",
    projectFrontend: "",
    projectBackend: "",
    projectDetails: "",
  });

  const [formErrors, setFormErrors] = useState({
    projectTitle: "",
    projectFrontend: "",
    projectBackend: "",
    projectDetails: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleClose = () =>
    // event?: React.SyntheticEvent | Event,
    // reason?: SnackbarCloseReason,
    {
      setOpen(false);
    };

  const validateForm = () => {
    const errors: typeof formErrors = {
      projectTitle: "",
      projectFrontend: "",
      projectBackend: "",
      projectDetails: "",
    };

    if (!formValues.projectTitle) {
      errors.projectTitle = "Project Title is required.";
    }
    if (!formValues.projectFrontend) {
      errors.projectFrontend = "Frontend description is required.";
    }
    if (!formValues.projectBackend) {
      errors.projectBackend = "Backend description is required.";
    }
    if (!formValues.projectDetails) {
      errors.projectDetails = "Project details are required.";
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setOpen(true);
    event.preventDefault();
    if (validateForm()) {
      const payload = {
        frontend_tech: formValues.projectFrontend,
        backend_tech: formValues.projectBackend,
        title: formValues.projectTitle,
        desc: formValues.projectDetails,
      };
      await dispatch(postProject(payload));
      await dispatch(fetchProjectInfo());
    }
  };

  const handleSuggestion = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(getSuggestion({ desc: formValues.projectDetails }));
    }
  };

  return (
    <div>
      <Typography component="h2" variant="h6" gutterBottom>
        Create New Project
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" marginBottom={4}>
        Fill in the details below to define your project specifications.
      </Typography>
      <Box display="flex" justifyContent="space-between" gap={3}>
        <Box flex={1}>
          <Card
            elevation={3}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent>
              <Box component="form" onSubmit={handleSubmit} padding={2}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Tooltip
                      title="Enter a descriptive project title"
                      placement="right"
                    >
                      <TextField
                        fullWidth
                        label="Project Title"
                        name="projectTitle"
                        placeholder="e.g., E-Commerce Platform"
                        value={formValues.projectTitle}
                        onChange={handleInputChange}
                        error={!!formErrors.projectTitle}
                        helperText={formErrors.projectTitle}
                        size="small"
                      />
                    </Tooltip>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Tooltip
                      title="Mention the frontend technologies"
                      placement="right"
                    >
                      <TextField
                        fullWidth
                        label="Frontend Technologies"
                        name="projectFrontend"
                        placeholder="e.g., React, Angular"
                        value={formValues.projectFrontend}
                        onChange={handleInputChange}
                        error={!!formErrors.projectFrontend}
                        helperText={formErrors.projectFrontend}
                        size="small"
                      />
                    </Tooltip>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Tooltip
                      title="Mention the backend technologies"
                      placement="right"
                    >
                      <TextField
                        fullWidth
                        label="Backend Technologies"
                        name="projectBackend"
                        placeholder="e.g., Node.js, Django"
                        value={formValues.projectBackend}
                        onChange={handleInputChange}
                        error={!!formErrors.projectBackend}
                        helperText={formErrors.projectBackend}
                        size="small"
                      />
                    </Tooltip>
                  </Grid>

                  <Grid item xs={12}>
                    <Tooltip
                      title="Provide a detailed description of the project"
                      placement="right"
                    >
                      <TextField
                        fullWidth
                        label="Project Details"
                        name="projectDetails"
                        placeholder="Describe the purpose and features of the project"
                        multiline
                        rows={16}
                        value={formValues.projectDetails}
                        onChange={handleInputChange}
                        error={!!formErrors.projectDetails}
                        helperText={formErrors.projectDetails}
                        size="small"
                      />
                    </Tooltip>
                    {errorMessage && <AlertDialog message={errorMessage} />}
                  </Grid>

                  <Grid item xs={12} textAlign="right">
                    {loading ? (
                      <LoadingButton
                        variant="contained"
                        size="small"
                        loading
                        sx={{
                          textTransform: "capitalize",
                          paddingX: 5,
                          backgroundColor: "#000",
                        }}
                      >
                        Loading...
                      </LoadingButton>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        sx={{
                          textTransform: "capitalize",
                          paddingX: 5,
                          backgroundColor: "#000",
                        }}
                      >
                        Submit
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
          {postProjectState.success ? (
            <Snackbar
              open={open}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              autoHideDuration={5000}
              onClose={handleClose}
              message="Your details have been submitted successfully."
            />
          ) : null}
        </Box>

        <Box flex={1} component="form" onSubmit={handleSuggestion}>
          <Card>
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Grid xs={12} paddingX={4}>
                {suggestionLoader ? (
                  <Loader />
                ) : projectSuggestion ? (
                  <>
                    <Typography
                      fontWeight="bold"
                      component="h2"
                      variant="h6"
                      gutterBottom
                    >
                      AI Generated Suggestion
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography
                      sx={{
                        height: "600px",
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                      }}
                    >
                      <ReactMarkdown>{projectSuggestion}</ReactMarkdown>
                    </Typography>
                  </>
                ) : (
                  <CenterInstruction />
                )}
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "capitalize",
                    paddingX: 5,
                    backgroundColor: "#000",
                    marginTop: 3,
                  }}
                >
                  Generate Suggestion
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default FormDetail;
