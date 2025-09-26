import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMemo, useState } from "react";

const drawerWidth = 220;

export default function Shell() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const drawer = useMemo(
    () => (
      <Box role="presentation" sx={{ width: drawerWidth }}>
        <List>
          {[
            { label: "Employees", to: "/employees" },
            { label: "Absence", to: "/absence" },
          ].map((item) => (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              selected={pathname === item.to}
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    ),
    [pathname]
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="open sidebar"
            onClick={() => setOpen((s) => !s)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Monitoring Web</Typography>
          <Box sx={{ flex: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" aria-label="sidebar">
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
