import { PersonAddOutlined,PersonRemoveAlt1Outlined } from "@mui/icons-material";
import { Box,IconButton,Typography,useTheme } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

function Friend({friendId,name,subtitle,userPicturePath}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {_id} = useSelector(state=>state.user);
  const token = useSelector(state=>state.token);
  const friends = useSelector(state=>state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const userCheck = friendId !== _id;
  const patchFriend = async () => {
    const res = await fetch(`http://127.0.0.1:1337/users/${_id}/${friendId}`,{
      method:"PATCH",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    })
    const data = await res.json();
    dispatch(setFriends({ friends:data }))
  }

  return (
    <FlexBetween>
      <FlexBetween
      gap="1rem"
      > 
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick = {()=>{
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color = {main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover":{
                color:palette.light,
                cursor:"pointer"
              }
            }}
          >
            {name}
          </Typography>

          <Typography
            color={medium}
            fontSize="0.75rem"
          >
            {subtitle}
          </Typography>
        </Box>

      </FlexBetween>
      { userCheck && (
        <IconButton
        onClick={()=>patchFriend()}
        sx={{
          backgroundColor: primaryLight,padding:"0.6rem"
        }}
      >
        {isFriend? (
          <PersonRemoveAlt1Outlined sx={{color:primaryDark}} />
        ):(
          <PersonAddOutlined sx={{color:primaryDark}} />

        )}
      </IconButton>
      ) }
    </FlexBetween>
  )

}

export default Friend;