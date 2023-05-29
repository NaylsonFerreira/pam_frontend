import {
    AppBar, Box,
    Button, Drawer, Toolbar
} from '@mui/material';
import { useState } from 'react';

import { Menu as MenuIcon } from '@mui/icons-material';
import MenuTop from './MenuTop';

export default function HeaderMobile() {
    const [state, setState] = useState<boolean>(false);

    const toggleDrawer = (event: KeyboardEvent | MouseEvent | Event | { type: string }) => {
        if (event.type === 'keydown' &&
            ((event as KeyboardEvent).key === 'Tab' ||
                (event as KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState(s => !s);
    };

    const menu = () => (
        <Box sx={{ width: 250 }} onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <MenuTop />
        </Box>
    );
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar >
                        <Button color="inherit" aria-label="menu" onClick={toggleDrawer}>
                            <MenuIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor='left'
                open={state}
                onClose={toggleDrawer}
            >
                {menu()}
            </Drawer>
        </>
    );
}