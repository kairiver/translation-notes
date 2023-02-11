import './App.css'
import {
    Box, Button,
    Card,
    CardContent,
    CardHeader,
    Fab,
    Fade,
    IconButton,
    Menu,
    MenuItem,
    Modal,
    Typography
} from "@mui/material";
import TextField from '@mui/material/TextField';
import React from "react";
import {AccountCircle} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type noteItem = {
    title: Date;
    content: string;
    translation: string;
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '4px',
    boxShadow: 24,
    p: 4,
    outline: 0,
};

function App() {
    const notes: noteItem[] = [
        {title: new Date(), content: "do somethingあああああああああああああああああああああああああああああああ", translation: "翻訳されたのがこちら"},
        {title: new Date(), content: "英語間違ってた", translation: "純粋につらい"},
    ];

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="App">
            {notes.map((note: noteItem) => {
                return (
                    <Card sx={{maxWidth: 500, mt: 3}}>
                        <CardHeader
                            avatar={
                                <AccountCircle fontSize="large"/>
                            }
                            title={note.title.toDateString()}
                            action={
                                <IconButton
                                    aria-label="settings"
                                    id="fade-button"
                                    aria-controls={menuOpen ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={menuOpen ? 'true' : undefined}
                                    onClick={handleMenuClick}
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                        />
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleMenuClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleMenuClose}>Update</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                        </Menu>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {note.content}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            {/*<CircularProgress/>*/}
                            <Typography paragraph>
                                {note.translation}
                            </Typography>
                        </CardContent>
                    </Card>
                );
            })}
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
                onClick={handleOpen}
            >
                <AddIcon/>
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        fullWidth={true}
                        id="filled-multiline-static"
                        label="note"
                        multiline
                        rows={4}
                        variant="standard"
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse'
                    }}>
                        <Button
                            sx={{
                                mt: 3,
                            }}
                            variant="contained"
                        >
                            send
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default App
