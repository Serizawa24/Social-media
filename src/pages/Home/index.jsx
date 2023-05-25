import { Box, useMediaQuery } from "@mui/material";
import Navbar from "pages/Navbar";
import User from "pages/Widgets/User";
import { useSelector } from "react-redux";
import MyPost from 'pages/Widgets/MyPost'
import Posts from "pages/Widgets/Posts";
import Advert from "pages/Widgets/Advert";
import FriendList from "pages/Widgets/FriendList";
function Home() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const {_id, picturePath } = useSelector(state=>state.user)
  return ( 
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens?"flex":"block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens?"26%":undefined} >
          <User userId={_id} picturePath={picturePath} />
        </Box>
        <Box 
          flexBasis={isNonMobileScreens?"42%":undefined}
          marginTop={isNonMobileScreens?undefined:"2rem"}
        >
          <MyPost picturePath={picturePath} />
           <Posts userId={_id} /> 
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Advert />
            <Box margin="2rem 0" />
            <FriendList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
   );
}

export default Home