import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Assignment,
  Description,
  MonetizationOn,
  People,
  BarChart,
} from "@mui/icons-material";
import { Outlet, Link, useLocation } from "react-router-dom"; // Import useLocation
import LoginForm from "../components/LoginForm";

const drawerWidth = 240;

export default function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // Sử dụng useLocation để lấy URL hiện tại

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Quản Lý Hợp Đồng
          </Typography>
          {isLoggedIn && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton color="inherit">
                <Avatar alt="User Profile" src="/profile.jpg" />
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      {isLoggedIn && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {[
              { text: "Dự Án", icon: <Description />, path: "/projects" },
              { text: "Hợp Đồng", icon: <Assignment />, path: "/contracts" },
              {
                text: "Thanh Toán",
                icon: <MonetizationOn />,
                path: "/payments",
              },
              { text: "Tài Khoản", icon: <People />, path: "/accounts" },
              { text: "Chủ Đầu Tư", icon: <People />, path: "/accounts" },
              {
                text: "Báo Cáo Thống Kê",
                icon: <BarChart />,
                path: "/reports",
              },
            ].map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "inherit", // Thay đổi màu cho mục active
                  backgroundColor:
                    location.pathname === item.path
                      ? "action.selected"
                      : "transparent", // Thay đổi màu nền
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Toolbar />
        {isLoggedIn ? <Outlet /> : <LoginForm onLogin={handleLogin} />}
      </Box>
    </Box>
  );
}
