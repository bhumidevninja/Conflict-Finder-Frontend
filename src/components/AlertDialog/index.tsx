import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { clearMessage } from '../../reducers/projectSlice';
import { IconButton, Typography } from '@mui/material';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const AlertDialog = ({message}: {message:string}) => {
  const [open, setOpen] = React.useState(!!message);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    setOpen(false);
    dispatch(clearMessage())
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        <IconButton>
            <NewReleasesIcon color='error'/>
        </IconButton>
        Alert
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{paddingX:2}}>
            <Typography variant='body1'>{message}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
            size="small"
            sx={{
              textTransform: "capitalize",
              paddingX: 5,
              backgroundColor: "#000",
              marginTop: 3,
            }} onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AlertDialog