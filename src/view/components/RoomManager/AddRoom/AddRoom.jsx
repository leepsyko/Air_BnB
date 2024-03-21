import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { object, string, number } from "yup";
import { addRoom } from '../../../../apis/AdminRoomAPI';




//MUI switch
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));


export default function AddRoom({ onClose,onSuccessPopUp }) {


const queryClient = useQueryClient()

  const addRoomShema = object({
    name: string().required("Vui lòng nhập căn hộ"),
    avatar: string().required("Vui lòng điền link"),
    infor: string().required("Vui lòng thêm mô tả "),
    money: number().typeError("Giá phải là một con số"),
    rooms: number().typeError("Phòng ngủ phải là một con số"),
  });


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      avatar: "",
      infor: "",
      money: "",
      rooms: "",
    },
    resolver: yupResolver(addRoomShema),
    mode: "onTouched",
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      const formValues = {
        name: values.name,
        avatar: values.avatar,
        infor: values.infor,
        money: values.money,
        rooms: values.rooms,
      };
      return addRoom(formValues);
    },
    onSuccess: (data) => {
      console.log("thanh cong",data)
      queryClient.invalidateQueries(["roomList"])
      onClose()
      onSuccessPopUp()
    },
    onError: (error) => {
      console.error("Lỗi khi thực hiện mutation:", error);
    },
  });



  return (
    <Container>
      <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          📔📔Thêm căn hộ
        </Typography>
        <Typography
          onClick={onClose}
          sx={{ color: "blue", cursor: "pointer" }}
          variant="h5"
        >
          X
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Tên căn hộ"
              variant="outlined"
              color="success"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name && errors.name.message}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Hình ảnh"
              variant="outlined"
              color="success"
              {...register("avatar")}
              error={!!errors.avatar}
              helperText={errors.avatar && errors.avatar.message}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Thông tin căn hộ"
              variant="outlined"
              color="success"
              {...register("infor")}
              error={!!errors.infor}
              helperText={errors.infor && errors.infor.message}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Giá căn hộ"
              variant="outlined"
              color="success"
              {...register("money")}
              error={!!errors.money}
              helperText={errors.money && errors.money.message}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Số Phòng"
              variant="outlined"
              color="success"
              {...register("rooms")}
              error={!!errors.rooms}
              helperText={errors.rooms && errors.rooms.message}
            />
          </Grid>


          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Thêm Phòng
            </Button>
          </Grid>
        </Grid>
      </form>

    </Container>
  )
}
