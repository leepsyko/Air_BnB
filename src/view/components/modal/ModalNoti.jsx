import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseNoti } from "../../../redux/features/modalNotiSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalNoti() {
  const data = useSelector((state) => state.modalNoti);

  const navigate = useNavigate();
  const { open, success, error, title, secondTitle } = data;
  console.log("open:", open);
  console.log("success:", success);
  console.log("error:", error);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleCloseNoti());
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {!!success && (
        <>
          {" "}
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {secondTitle}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                navigate("/");
                handleCloseNoti();
              }}
            >
              Agree
            </Button>
          </DialogActions>
        </>
      )}
      {!!error && (
        <>
          {" "}
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {secondTitle}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default ModalNoti;
