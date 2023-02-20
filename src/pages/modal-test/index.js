import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import UserLayout from '@/components/Layout/UserLayout';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const ModalTest = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = useState({ name: '', age: '' });
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <UserLayout>
            <Button variant='outlined' onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Record
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Fill in the form below to add a new record.
                    </Typography>
                    <div data-aos="fade-down">
                        <form>
                            <TextField
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                                fullWidth
                            />
                            <TextField
                                label="Age"
                                name="age"
                                value={values.age}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                                fullWidth
                            />

                            <br />
                            <br />

                            <ButtonGroup aria-label="primary button group">
                                <Button variant="outlined">Cancel</Button>
                                <Button variant="contained">Save</Button>
                            </ButtonGroup>

                        </form>
                        </div>
                    </Box>

            </Modal>
        </UserLayout>
    )
}

export default ModalTest