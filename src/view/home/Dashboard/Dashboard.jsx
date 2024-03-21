
import { Box, Container } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountUp from "react-countup";
import { faArrowTrendUp , faUser , faBoxArchive , faArrowTrendDown , faChartLine ,faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";


function Dashboard() {
   
  return (
    <Box className="bg-[#B2A59B] pb-[20vh] pt-[30px]">
      <h1 className="text-center text-white text-[30px] font-bold tracking-wide ">
        DashBoard
      </h1>
      <p className="text-center text-[20px]">General quantitative statistics</p>
      <Container>
        <Box className="grid grid-cols-4 mt-[50px]">
          <Box className="px-[10px] pb-[0px] mx-[30px] bg-white rounded-lg  shadow md:shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...">
            <Box className="flex  ">
              <Box>
                <h1 className=" font-bold text-[13px] pt-3">Total User</h1>
              </Box>
              <Box className="ml-[12vh] mt-1 text-xl p-[15px] bg-[#214cf634] text-[#214cf6] rounded-[14px] ">
                <FontAwesomeIcon icon={faUser} />
              </Box>
            </Box>
            <p className=" pt-[50px] font-bold text-[30px]">
              {" "}
              <CountUp start={0} end={40689} duration={6}></CountUp>
            </p>
            <p>
              <FontAwesomeIcon
                className="text-[#4afa53] mx-1"
                icon={faArrowTrendUp}
              />
              8.5% Up from yesterday
            </p>
          </Box>
          <Box className="px-[10px] pb-[0px] mx-[30px] bg-white rounded-lg  shadow md:shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...">
            <Box className="flex  ">
              <Box>
                <h1 className=" font-bold text-[13px] pt-3">Total Timeshare</h1>
              </Box>
              <Box className="ml-[12vh] mt-1 text-xl p-[15px] bg-[#ddf6213d] text-[#fffc4c] rounded-[14px] ">
                <FontAwesomeIcon icon={faBoxArchive} />
              </Box>
            </Box>
            <p className=" pt-[50px] font-bold text-[30px]">
              {" "}
              <CountUp start={0} end={5687} duration={2.5}></CountUp>
            </p>
            <p>
              <FontAwesomeIcon
                className="text-[#4afa53] mx-1"
                icon={faArrowTrendUp}
              />
              1.3% Up from past week
            </p>
          </Box>
          <Box className="px-[10px] pb-[0px] mx-[30px] bg-white rounded-lg  shadow md:shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...">
            <Box className="flex">
              <Box>
                <h1 className=" font-bold text-[13px] pt-3">
                  New Timeshare (3 days ago )
                </h1>
              </Box>
              <Box className="ml-[60px] mt-1 text-xl p-[15px] bg-[#3af62135] text-[#41f621] rounded-[14px] ">
                <FontAwesomeIcon icon={faChartLine} />
              </Box>
            </Box>
            <p className=" pt-[50px] font-bold text-[30px]">
              {" "}
              <CountUp start={0} end={152} duration={2.5}></CountUp>
            </p>
            <p>
              <FontAwesomeIcon
                className="text-[#ca3d3d] mx-1"
                icon={faArrowTrendDown}
              />
              1.3% Up from past week
            </p>
          </Box>
          <Box className="px-[10px] pb-[0px] mx-[30px] bg-white rounded-lg  shadow md:shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...">
            <Box className="flex">
              <Box>
                <h1 className=" font-bold text-[13px] pt-3">
                  New Timeshare (3 days ago )
                </h1>
              </Box>
              <Box className="ml-[60px] mt-1 text-xl p-[15px] bg-[#f6212135] text-[#f62121] rounded-[14px] ">
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </Box>
            </Box>
            <p className=" pt-[50px] font-bold text-[30px]">
              {" "}
              <CountUp start={0} end={4200} duration={2.5}></CountUp>
            </p>
            <p>
              <FontAwesomeIcon
                className="text-[#4afa53] mx-1"
                icon={faArrowTrendUp}
              />
              1.3% Up from past week
            </p>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;
