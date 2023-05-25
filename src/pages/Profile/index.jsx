import {Box,useMediaQuery} from "@mui/material";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "pages/Navbar";
import FriendList from "pages/Widgets/FriendList";
import MyPost from "pages/Widgets/MyPost";
import Posts from "pages/Widgets/Posts";
import User from "pages/Widgets/User";


function Profile() {
  const [user,setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector(state => state.token)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  const getUser = async () => {
    const res = await fetch(`http://127.0.0.1:1337/users/${userId}`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    })

    const data = await res.json();

    setUser(data)
  }

  useEffect(()=>{
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (!user) return null

  return ( 
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens?"flex":"block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens?"26%":undefined} >
          <User userId={userId} picturePath={user.picturePath} />
          <Box margin="2rem 0" />
          <FriendList userId={userId} />
        </Box>
        <Box 
          flexBasis={isNonMobileScreens?"42%":undefined}
          marginTop={isNonMobileScreens?undefined:"2rem"}
        >
          <MyPost picturePath={user.picturePath} />
           <Posts userId={userId} isProfile={true} /> 
        </Box>
      </Box>
    </Box>
   );
}

export default Profile