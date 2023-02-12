import './App.css'
import {Box, Button, Card, CardContent, CardHeader, Fab, IconButton, Modal, Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from "react";
import {AccountCircle} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

type noteItem = {
    id: string;
    created_at: string;
    note: string;
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
    const [notes, setNotes] = useState([]);
    useEffect(
        () => {
            axios
                .get('/api/notes')
                .then((res) => {
                    setNotes(res.data.data);
                })
                .catch((e) => {
                    console.log(e);
                })
        },
        []
    );

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const handleDeleteClick = (event: React.MouseEvent<HTMLElement>) => {
        axios
            .delete("/api/notes", {data: {id: event.currentTarget.id}})
            .then((res) => {
                setNotes(res.data.data);
            });
    };
    const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        // multipart/form-data形式のデータをapplication/x-www-form-urlencodedに変換
        const params = new URLSearchParams(new FormData(event.currentTarget));
        axios
            .post("/api/notes", params)
            .then((res) => {
                setNotes(res.data.data);
            });
        setOpen(false);
    };

    return (
        <div className="App">
            {notes.map((note: noteItem) => {
                return (
                    <Card sx={{width: 500, mt: 3}}>
                        <CardHeader
                            avatar={
                                <AccountCircle fontSize="large"/>
                            }
                            title={note.created_at}
                            action={
                                <IconButton
                                    aria-label="settings"
                                    id={note.id}
                                    aria-controls={menuOpen ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={menuOpen ? 'true' : undefined}
                                    onClick={handleDeleteClick}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {note.note}
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
                    position: 'fixed',
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
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth={true}
                            name="note"
                            id="filled-multiline-static"
                            label="note"
                            multiline
                            rows={4}
                            variant="standard"
                            required={true}
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
                                type="submit"
                            >
                                send
                            </Button>
                            <Button
                                sx={{
                                    mt: 3,
                                    mr: 1
                                }}
                                variant="outlined"
                                onClick={handleClose}
                            >
                                cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default App
