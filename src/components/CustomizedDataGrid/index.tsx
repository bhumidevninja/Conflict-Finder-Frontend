import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "./gridData";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomizedDataGrid = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleRowClick = (param) => {
    setSelectedRow(param.row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        onRowClick={handleRowClick}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
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
                  <Typography>Name: {selectedRow?.Name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Batch Year: {selectedRow?.batchYear}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    Project Name: {selectedRow?.projectName}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Chip
                    label={selectedRow?.status}
                    color="success"
                    size="small"
                  />
                </Grid>

                <Grid item>
                  <Typography gutterBottom>
                    Description: Aenean lacinia bibendum nulla sed consectetur.
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Vivamus sagittis lacus
                    vel augue laoreet rutrum faucibus dolor auctor.
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="success">
            Approved
          </Button>
          <Button onClick={handleCloseModal} color="error">
            Unapproved
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CustomizedDataGrid;
