import Carousel from "react-bootstrap/Carousel";
import carousel1 from "../../../../public/img/carousel1.jpg"
import carousel2 from "../../../../public/img/carousel2.jpg"
import { Box, Container } from "@mui/material";


function Banner() {
  return (
    <div>
      <Box className="bg-[#EEE7DA]">
        <Container>
          <Carousel className="pt-[70px]">
            <Carousel.Item>
              <img
                className="d-block w-100 h-[70vh] rounded-lg"
                src={carousel1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 h-[70vh] rounded-lg"
                src={carousel2}
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>
        </Container>
      </Box>
    </div>
  );
}

export default Banner