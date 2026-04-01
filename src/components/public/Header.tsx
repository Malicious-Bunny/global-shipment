'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { SxProps, Theme } from '@mui/material';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Track & Trace', href: '/track' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const styles: Record<string, SxProps<Theme>> = {
  appBar: {
    bgcolor: '#1A1A1A',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    textDecoration: 'none',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: { xs: '1rem', md: '1.2rem' },
    lineHeight: 1.1,
  },
  logoAccent: {
    color: '#D32F2F',
  },
  navContainer: {
    display: { xs: 'none', md: 'flex' },
    gap: 0.5,
    ml: 'auto',
  },
  navBtn: {
    color: '#FFFFFF',
    fontSize: '0.875rem',
    px: 1.5,
    '&:hover': {
      color: '#D32F2F',
      bgcolor: 'transparent',
    },
  },
  activeNavBtn: {
    color: '#D32F2F',
  },
  menuIcon: {
    display: { xs: 'flex', md: 'none' },
    ml: 'auto',
    color: '#FFFFFF',
  },
  drawer: {
    '& .MuiDrawer-paper': {
      width: 260,
      bgcolor: '#1A1A1A',
      color: '#FFFFFF',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2,
    py: 2,
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  drawerItem: {
    color: '#FFFFFF',
    '&:hover': { bgcolor: 'rgba(211,47,47,0.15)', color: '#D32F2F' },
    borderRadius: 1,
    mx: 1,
  },
  drawerActiveItem: {
    bgcolor: 'rgba(211,47,47,0.2)',
    color: '#D32F2F',
    borderRadius: 1,
    mx: 1,
    '&:hover': { bgcolor: 'rgba(211,47,47,0.25)' },
  },
};

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AppBar position="sticky" sx={styles.appBar}>
        <Toolbar>
          <Box component={Link} href="/" sx={styles.logo}>
            <LocalShippingIcon sx={{ color: '#D32F2F', fontSize: 32 }} />
            <Box>
              <Typography sx={styles.logoText}>
                <Box component="span" sx={styles.logoAccent}>GLOBAL EXPRESS</Box>
              </Typography>
              <Typography sx={{ color: '#CCCCCC', fontSize: '0.65rem', letterSpacing: 2 }}>
                SHIPMENTS
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.navContainer}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  ...styles.navBtn,
                  ...(pathname === link.href ? styles.activeNavBtn : {}),
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <IconButton sx={styles.menuIcon} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={styles.drawer}
      >
        <Box sx={styles.drawerHeader}>
          <Typography sx={{ color: '#FFFFFF', fontWeight: 700 }}>Menu</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#FFFFFF' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ pt: 1 }}>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                sx={pathname === link.href ? styles.drawerActiveItem : styles.drawerItem}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
