import { Box, Button, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <Box className="p-[50px] bg-black text-white">
      <Box className="grid grid-cols-3 divide-x">
        <Box className="px-3">
          <p className="text-xl font-bold pb-2">Center support</p>
          <ul className="text-sm tracking-wide">
            <li className="py-2 ">
              <a href="">Anti-discrimination</a>
            </li>
            <li className="py-2  ">
              <a href="">Support people with disabilities</a>
            </li>
            <li className="py-2 hover:text-style ">
              <a href="">Cancellation options</a>
            </li>
            <li className="py-2  ">
              <a href="">Report neighborhood concerns</a>
            </li>
          </ul>
        </Box>
        <Box className="px-3">
          <p className="text-xl font-bold pb-2">Welcome guests</p>
          <ul className="text-sm tracking-wide  ">
            <li className="py-2 ">
              <a href="">Share a house on Timeshare</a>
            </li>
            <li className="py-2 ">
              <a href="">TimeshareCover for Homeowners</a>
            </li>
            <li className="py-2 ">
              <a href="">Resources for welcoming guests</a>
            </li>
            <li className="py-2 ">
              <a href="">Community forum</a>
            </li>
          </ul>
        </Box>
        <Box className="px-3">
          <p className="text-xl font-bold pb-2">Social</p>
          <ul className="text-sm tracking-wide  ">
            <li className="py-2  ">
              <a href="https://www.facebook.com/profile.php?id=100013845758286">
                {" "}
                <FontAwesomeIcon icon={faFacebook} />
                Facebook
              </a>
            </li>
            <li className="py-2  ">
              <a href="https://github.com/MQ1907/timeshare-exchange-platform">
                <FontAwesomeIcon icon={faGithub} />
                Github
              </a>
            </li>
            <Box>
              <TextField
                className="bg-white rounded-lg"
                name="email"
                label="Email"
                variant="outlined"
              />
              <Button className="bg-white mx-2 p-3 text-black hover:bg-[#F3EEEA]">
                Enter
              </Button>
            </Box>
          </ul>
        </Box>
      </Box>
      <Box>
        <hr className="my-2" />
      </Box>
      <Box>
        <p>© 2024 TimeShare Inc.·PrivacyTermsSitemap</p>
      </Box>
    </Box>
  );
}

export default Footer;
