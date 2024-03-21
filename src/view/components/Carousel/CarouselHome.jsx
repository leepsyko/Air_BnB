import { useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Box, Container, Grid, Typography, styled, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../../../apis/AdminRoomAPI";
import PaidIcon from '@mui/icons-material/Paid';

export default function CarouselHome() {
  const { data: roomList = [] } = useQuery({
    queryKey: ["carouselHome"],
    queryFn: getRooms,
  });

  const navigate = useNavigate();

  const LocationImg = styled("img")`
    width: 100%;
    height: 200px;
    opacity: 0;
  `;



  const renderLocationList = (array) => {

    return array.map((item) => {
   
      return (
        <Grid key={item.id} item xs={12} sm={4} md={3}>
          <Grid
            onClick={() => navigate(`/roomInfo/${item.id}`)}
            sx={{
              cursor: "pointer",
              border: "1px solid transparent",
              transition: "0.3s ease-in-out",
              "&:hover": {
                borderColor: "black",
              },
            }}
            component={Paper}
            container
            p={2}
          >
            {/* IMG */}
            <Grid item xs={12}>
              <Box
                sx={{
                  position: "relative",
                  backgroundImage: `url(${item.avatar})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "5px",
                }}
                component="div"
              >
                <FavoriteBorderIcon
                  color="error"
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}
                />
                <LocationImg src={item.avatar} />
              </Box>
            </Grid>
            {/* LOCATION NAME */}
            <Grid item xs={12}>
              <Box component="div">
                <Typography
                  sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
                  variant="subtitle2"
                  component="div"
                >
                  <LocationOnIcon /> {item.name} -   <PaidIcon /> {item.money}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <Fragment>
      <Container>
        <Grid my="50px" component="div" container spacing={3}>
          {roomList && renderLocationList(roomList)}
        </Grid>
      </Container>
    </Fragment>
  );
}
