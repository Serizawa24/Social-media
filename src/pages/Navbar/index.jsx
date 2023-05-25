import { useState,useEffect } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";


function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.token )
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  //search

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    const regex = /^\S/;
    if (regex.test(searchValue)) {
      setSearchValue(searchValue);
    } else {
      setSearchValue('');
    }
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }
    const fetchApi = async ()=>{
      
      const results = await fetch(`http://127.0.0.1:1337/search?q=${searchValue}`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      const data = await results.json();

      setSearchResults(data);

    }
    fetchApi()
  },[searchValue,token])
  
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          ASSC
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
            style={{position:"relative"}}
          >
            <InputBase placeholder="Search..." value={searchValue} onChange={handleChange}  />
            
            <Box display="flex" 
              flexDirection="column" 
              gap="1.5rem" position="absolute" 
              top="120%" left="0" right="0"
              padding="1rem"
              backgroundColor={neutralLight}
              borderRadius="0.5rem"
              zIndex={"999"}
              visibility={ searchResults.length > 0 ? "visible" : "hidden"}
            >

              {searchResults.map((item,index)=>(
                <Friend 
                key={index}
                friendId={item._id}
                name={`${item.firstName} ${item.lastName}`}
                subtitle={item.occupation}
                userPicturePath={item.picturePath}                
                />
              ))}
            </Box>
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Destop Nav */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>

              <MenuItem onClick={() => {
                dispatch(setLogout())
                navigate("/")
                }}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile Nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"  
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* Close icon */}
          <Box
            display="flex"
            justifyContent="flex-end"
            padding="1rem"
          >
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Menu items */}
          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>

              <MenuItem onClick={() => {
                dispatch(setLogout())
                navigate("/")
              }}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>

        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
