// App.js
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
import { Outlet, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const drawerWidth = 240;

export default function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

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
              {
                text: "Quản Lý Dự Án",
                icon: <Description />,
                path: "/projects",
              },
              {
                text: "Quản Lý Hợp Đồng",
                icon: <Assignment />,
                path: "/contracts",
              },
              {
                text: "Quản Lý Thanh Toán",
                icon: <MonetizationOn />,
                path: "/payments",
              },
              {
                text: "Quản Lý Tài Khoản",
                icon: <People />,
                path: "/accounts",
              },
              {
                text: "Báo Cáo Thống Kê",
                icon: <BarChart />,
                path: "/reports",
              },
            ].map((item) => (
              <ListItem
                sx={{ color: "inherit" }}
                button
                key={item.text}
                component={Link}
                to={item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
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
