import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { object, string, number } from "yup";
import { addUser } from '../../../apis/AdminUserAPI';




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


export default function AddUser({ onClose, onSuccessPopUp }) {


    const queryClient = useQueryClient()

    const addUserShema = object({
        email: string()
            .required("email không được để trống")
            .email("email không đúng định dạng"),
        pass: string()
            .required("Mật khấu không được để trống")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
            ),
        birthday: string().required("Ngày sinh không được để trống"),
    });


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            pass: "",
            birthday: "",
        },
        resolver: yupResolver(addUserShema),
        mode: "onTouched",
    });

    const { mutate: onSubmit } = useMutation({
        mutationFn: (values) => {
            const formValues = {
                email: values.email,
                pass: values.pass,
                birthday: values.birthday,
            };
            return addUser(formValues);
        },
        onSuccess: (data) => {
            console.log("thanh cong", data)
            queryClient.invalidateQueries(["userList"])
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
                    📔📔Thêm tài khoản
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
                            label="Email"
                            variant="outlined"
                            color="success"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email && errors.email.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            type='date'
                            variant="outlined"
                            color="success"
                            {...register("birthday")}
                            error={!!errors.birthday}
                            helperText={errors.birthday && errors.birthday.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="Mật khẩu"
                            variant="outlined"
                            color="success"
                            {...register("pass")}
                            error={!!errors.pass}
                            helperText={errors.pass && errors.pass.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Thêm
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Container>
    )
}
