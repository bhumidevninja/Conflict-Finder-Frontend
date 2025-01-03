import { useEffect, useState, Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./gridData";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchProjectInfo, putProject } from "../../reducers/projectSlice";

type selectedRowType = {
  id: string;
  first_name: string;
  title: string;
  status: string;
  frontend_tech: string;
  backend_tech: string;
  desc: string;
};

const CustomizedDataGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { projectList } = useSelector((state: any) => state.project);
  const [selectedRow, setSelectedRow] = useState<selectedRowType>({
    id: "",
    first_name: "",
    title: "",
    status: "",
    frontend_tech: "",
    backend_tech: "",
    desc: "",
  });

  const handleRowClick = (param: any) => {
    setSelectedRow(param.row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStatus = async (status: string) => {
    await dispatch(putProject({ id: selectedRow.id, status: status }));
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(fetchProjectInfo());
  }, []);

  return (
    <Fragment>
      <DataGrid
        autoHeight
        rows={projectList}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        onRowClick={handleRowClick}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: "outlined",
                size: "small",
              },
              columnInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              operatorInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: "outlined",
                  size: "small",
                },
              },
            },
          },
        }}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          Detail Description
          <IconButton onClick={handleCloseModal} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography>Name: {selectedRow?.first_name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    Status :{" "}
                    <Chip
                      label={selectedRow?.status}
                      color={
                        selectedRow?.status == "Approved"
                          ? "success"
                          : selectedRow?.status == "Rejected"
                          ? "error"
                          : "default"
                      }
                      size="small"
                    />
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>Project Name: {selectedRow?.title}</Typography>
                </Grid>

                <Grid item xs={8}>
                  <Typography>
                    Frontend: {selectedRow?.frontend_tech}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>Backend: {selectedRow?.backend_tech}</Typography>
                </Grid>

                <Grid item>
                  <Typography gutterBottom>{selectedRow?.desc}</Typography>
                </Grid>
              </Grid>

              {user?.is_superuser ? (
                <>
                  <Divider sx={{ marginY: 4, width: 1 }} />
                  <Grid item>
                    <Typography
                      variant="caption"
                      style={{ fontStyle: "italic" }}
                    >
                      Comments
                    </Typography>

                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <Box display="flex" alignItems="center" gap={1}>
                        <Input
                          id="standard-adornment-amount"
                          sx={{ flex: 1 }}
                        />

                        <IconButton
                          aria-label="delete"
                          size="small"
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          <SendIcon
                            fontSize="inherit"
                            style={{ color: "black" }}
                          />
                        </IconButton>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              ) : null}
            </div>
          )}
        </DialogContent>
        {user?.is_superuser ? (
          <DialogActions>
            <Button onClick={() => handleStatus("Approved")} color="success"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "success",
              }}  
            >
              Approved
            </Button>
            <Button onClick={() => handleStatus("Rejected")} color="error"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "error",
              }}    
            >
              Rejected
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>

    </Fragment>
  );
};

export default CustomizedDataGrid;
