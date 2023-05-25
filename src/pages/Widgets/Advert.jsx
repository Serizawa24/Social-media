import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

function Advert() {
  const {palette} = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant="h5" color={dark} fontWeight="500" >
          Sponsored
        </Typography>

        <Typography  color={medium} >
          Create Ad
        </Typography>

      </FlexBetween>
      
      <img  
        width="100%"
        height="auto"
        alt="advert"
        src= "http://localhost:1337/assets/adv.jpg"
        style={{
          borderRadius:"0.75rem",
          margin:"0.75rem 0"
        }}
      />


      <Typography color={dark}>HoloEN</Typography>
  
      <Typography color={medium}>https://hololivepro.com</Typography>

      <Typography color={medium} margin="0.5rem 0"> Hololive production is one of the biggest VTuber agencies in the world. </Typography>

    </WidgetWrapper>
  )

}

export default Advert;