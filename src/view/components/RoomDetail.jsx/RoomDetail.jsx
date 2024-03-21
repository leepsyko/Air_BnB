import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { getRoomDetailsById } from "../../../apis/AdminRoomAPI";
import { useParams } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PoolIcon from "@mui/icons-material/Pool";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WorkIcon from "@mui/icons-material/Work";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import CountertopsIcon from "@mui/icons-material/Countertops";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { differenceInDays, parseISO } from 'date-fns';

const SecondaryButton = styled(Button)`
  text-transform: none;
  text-decoration: underline;
`;

const BookingButton = styled(Button)`
  &.MuiButton-root {
    background-color: red;
  }
`;
const DatePicker = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiInputBase-root.MuiInput-root::after {
    border-bottom: 2px solid red;
  }
`;

export default function RoomDetail() {
  const { roomId } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestQuantity, setGuestQuantity] = useState(1);
  const [openZalo, setOpenZalo] = useState(false);

  const { data: room = [] } = useQuery({
    queryKey: ["roomDetail"],
    queryFn: () => getRoomDetailsById(roomId),
  });

  // chose date to date

  const handleStartDate = (e) => {
    const selectedStartDate = new Date(e.target.value);
    const selectedEndDate = new Date(endDate);
    if (selectedStartDate >= selectedEndDate) {
      setEndDate("");
    }
    setStartDate(e.target.value);
  };
  const handleEndDate = (e) => {
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(e.target.value);
    if (selectedEndDate <= selectedStartDate) {
      setStartDate("");
    }
    setEndDate(e.target.value);
  };

  const today = new Date().toISOString().split("T")[0];


  // booking
  const handleBookingRoom = () => {
    setOpenZalo(true);
  };

    // CALCULATE TOTALDAY FUNC
    const calculateTotalDay = (startDate, endDate) => {
        const start = parseISO(startDate);
        const end = parseISO(endDate);
        const totalDays = differenceInDays(end, start);
        return totalDays;
    };
    const totalDays = calculateTotalDay(startDate, endDate) || 0;


    // TOTAL PRICE
    const totalPrice = room.money * totalDays || 0;




    return (
        <Fragment>
            <Container>
                <Grid my="50px" container>
                    {/* TITLE */}
                    <Grid py={2} item xs={12}>
                        <Typography variant="h5" fontWeight="bold">
                            {room.name}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <SecondaryButton startIcon={<ShareIcon />} color="inherit">
                                Chia sẻ
                            </SecondaryButton>
                            <SecondaryButton startIcon={<SaveAltIcon />} color="inherit">
                                Lưu
                            </SecondaryButton>
                        </Stack>
                    </Grid>
                    {/* IMG */}
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                backgroundImage: `url(${room.avatar})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderRadius: "5px",
                                width: "100%",
                                height: "400px",
                                overflow: "hidden",
                            }}
                            component="div"
                        >
                            <img
                                style={{ opacity: 0, objectFit: 'cover', width: "100%", height: "100%" }}
                                src={room.avatar}
                                alt={room.name}
                            />
                        </Box>
                    </Grid>
                    {/* INFO AND BOOKING PART */}
                    <Grid py={2} item xs={12}>
                        <Grid spacing={2} container>
                            {/* INFO */}
                            <Grid item xs={12} sm={12} md={7}>
                                <Box elevation={3} component={Paper}>
                                    <Box p={2} component="div">
                                        <Typography>
                                            {room.name} khách - {room.rooms} Phòng
                                        </Typography>
                                    </Box>
                                    <Divider variant="middle" />
                                    <Box
                                        p={2}
                                        sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                                        component="div"
                                    >
                                        <WorkIcon fontSize="large" />
                                        <Box component="div">
                                            <Typography fontWeight="bold" variant="subtitle1">
                                                Không gian riêng để làm việc
                                            </Typography>
                                            <Typography color="GrayText" variant="subtitle2">
                                                Một căn phòng có Wi-fi, rất phù hợp để làm việc.
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        p={2}
                                        sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                                        component="div"
                                    >
                                        <MeetingRoomIcon fontSize="large" />
                                        <Box component="div">
                                            <Typography fontWeight="bold" variant="subtitle1">
                                                Tự nhận phòng
                                            </Typography>
                                            <Typography color="GrayText" variant="subtitle2">
                                                Bạn có thể gặp nhân viên trực cửa để nhận phòng.
                                            </Typography>
                                        </Box>
                                    </Box>


                                    <Divider variant="middle" />
                                    {/* DESCRIPTION */}
                                    <Box p={2} component="div">
                                        <Typography textAlign="justify">{room.infor}</Typography>
                                    </Box>
                                    <Divider variant="middle" />
                                    {/* WHAT THIS ROOM HAVE */}
                                    <Box p={2} component="div">
                                        <Typography fontWeight="bold" variant="h6">
                                            Nơi này có những gì cho bạn
                                        </Typography>
                                        <Grid spacing={3} container>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                }}
                                                item
                                                xs={6}
                                            >
                                                <WorkIcon />
                                                <Typography variant="subtitle2">
                                                    Không gian riêng để làm việc
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                }}
                                                item
                                                xs={6}
                                            >
                                                <ApartmentIcon />
                                                <Typography variant="subtitle2">
                                                    Hướng nhìn ra đường chân trời thành phố
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                }}
                                                item
                                                xs={6}
                                            >
                                                <CameraOutdoorIcon />
                                                <Typography variant="subtitle2">
                                                    Camera an ninh trong nhà
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                            {/* BOOKING  */}
                            <Grid item xs={12} sm={12} md={5}>
                                <Box elevation={3} component={Paper}>
                                    {/* BOOKING FORM */}
                                    <Box component="div" p={2}>
                                        <Typography>
                                            <span style={{ fontSize: '30px', fontWeight: "bold" }}> {room.money} $</span>/Đêm
                                        </Typography>
                                        <Box
                                            component="div"
                                            border="1px solid black"
                                            borderRadius="5px"
                                        >
                                            {/* DATE PICKING */}

                                            <Box
                                                component="div"
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-around",
                                                }}
                                            >

                                                {/* START DATE */}
                                                <Box component="div" p={1}>
                                                    <Typography fontWeight="bold" variant="body2">
                                                        Nhận phòng
                                                    </Typography>
                                                    <DatePicker
                                                        onChange={handleStartDate}
                                                        type="date"
                                                        variant="standard"
                                                        value={startDate}
                                                        InputProps={{
                                                            inputProps: {
                                                                min: today,
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                                <Divider
                                                    sx={{ bgcolor: "black" }}
                                                    orientation="vertical"
                                                    flexItem
                                                />
                                                {/* END DATE */}
                                                <Box component="div" p={1}>
                                                    <Typography fontWeight="bold" variant="body2">
                                                        Trả phòng
                                                    </Typography>
                                                    <DatePicker
                                                        onChange={handleEndDate}
                                                        type="date"
                                                        variant="standard"
                                                        value={endDate}
                                                        InputProps={{
                                                            inputProps: {
                                                                min: startDate,
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            <Divider sx={{ bgcolor: "black" }} />
                                            {/* GUEST QUANTITY */}
                                            <Box component="div" p={1}>
                                                <Typography fontWeight="bold" variant="body2">
                                                    Khách
                                                </Typography>
                                                {/* QUANTITY CONTROLLER */}
                                            </Box>
                                            <Box
                                                component="div"
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {/* DECREASE */}
                                                <IconButton
                                                    onClick={() => {
                                                        setGuestQuantity(guestQuantity - 1);
                                                    }}
                                                    disabled={guestQuantity <= 1}
                                                >
                                                    <RemoveCircleIcon />
                                                </IconButton>
                                                <Typography>{guestQuantity}</Typography>
                                                {/* INCREASEE */}
                                                <IconButton
                                                    onClick={() => {
                                                        setGuestQuantity(guestQuantity + 1);
                                                    }}
                                                    disabled={guestQuantity >= room.khach}
                                                >
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        {/* BOOKING BUTTON */}
                                        <BookingButton
                                            onClick={() => handleBookingRoom(room.id)}
                                            sx={{ fontWeight: "bold", mt: 1 }}
                                            variant="contained"
                                            fullWidth
                                        >
                                            Đặt Phòng
                                        </BookingButton>
                                        {/* QR */}
                                        {openZalo && <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                '& > :not(style)': {
                                                    m: 1,
                                                    width: 128,
                                                    height: 128,
                                                },
                                            }}
                                        >
                                            <Paper elevation={0} />
                                            <Paper >
                                                <img src="../img/QRZalo.jpg" alt="" />
                                            </Paper>
                                            <Paper elevation={0} />

                                            <Typography>
                                                <span> Tổng tiền:   {totalPrice}</span>
                                            </Typography>
                                        </Box>
                                        }

                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}
