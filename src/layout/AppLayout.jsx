import { useEffect } from "react";
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
  MonetizationOn,
  People,
  Dashboard,
  ManageAccounts,
  DisplaySettings,
} from "@mui/icons-material";
import { Outlet, Link, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/authSlice";
import { BASE_URL } from "../const/api";
import { setUser } from "../store/features/authSlice";
import axios from "axios";

const drawerWidth = 240;

export default function AppLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const checkAuth = async () => {
    const res = await fetch(`${BASE_URL}/auth`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      if (data.data.active) dispatch(setUser(data.data));
    }
  };

  const handleLogout = async () => {
    await axios.get(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    dispatch(logout());
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Quản Lý Hợp Đồng
          </Typography>
          {user?.id && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>{user?.fullname}</Typography>
              <IconButton color="inherit">
                <Avatar alt={user?.fullname} src="/profile.jpg" />
              </IconButton>
              <Button
                sx={{ bgcolor: "white" }}
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      {user?.id && (
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
              { text: "Tổng quan", icon: <Dashboard />, path: "/dashboard" },
              { text: "Dự Án", icon: <DisplaySettings />, path: "/projects" },
              { text: "Hợp Đồng", icon: <Assignment />, path: "/contracts" },
              {
                text: "Thanh Toán",
                icon: <MonetizationOn />,
                path: "/payments",
              },
              {
                text: "Tài Khoản",
                icon: <ManageAccounts />,
                path: "/accounts",
              },
              { text: "Chủ Đầu Tư", icon: <People />, path: "/investors" },
              {
                /* {
                text: "Báo Cáo Thống Kê",
                icon: <BarChart />,
                path: "/reports",
              }, */
              },
            ].map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: location.pathname.includes(item.path)
                    ? "primary.main"
                    : "inherit", // Thay đổi màu cho mục active
                  backgroundColor: location.pathname.includes(item.path)
                    ? "action.selected"
                    : "transparent", // Thay đổi màu nền
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname.includes(item.path)
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Toolbar />
        {user?.id ? <Outlet /> : <Login />}
      </Box>
    </Box>
  );
}
