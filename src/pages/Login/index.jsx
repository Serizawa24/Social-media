import {Box,Typography,useTheme,useMediaQuery} from '@mui/material'
import Form from "./Form.jsx"

function Login() {

  const theme = useTheme();
  const isNonmobileScreens = useMediaQuery("(min-width:1000px)")

  return ( 
   <Box>
      <Box width="100%" backgroundColor={theme.palette.background.alt} padding="1rem 6%" textAlign="center" >
        <Typography
            fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.25rem)"
            color="primary"
        >
            ASSC
        </Typography>
      </Box>
      <Box
        width={isNonmobileScreens?"50%" : "93%"}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
          <Typography
            fontSize="500"
            variant='h5'
            sx={{
              marginBottom:"1.5rem"
            }}
          >
            Welcome to Anti Social/Social Club, the Social Media for Antisocial
          </Typography>
          <Form />
      </Box>
   </Box>
   );
}

export default Login