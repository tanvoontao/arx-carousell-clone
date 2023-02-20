import { useSelector } from 'react-redux';
// import AddProductModal from './AddProductModal';
// import EditProductModal from './EditProductModal';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { setModal } from "@/redux/modal/action";
import ProductForm from "@/components/Form/ProductForm"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto',
};

const components = {
    ProductForm,
}

const FormModal = () => {
    const modal = useSelector((state) => state.modal);
    const Form = components[modal.type];

    const handleClose = () => {
        setModal({ type: null, data: null });
    };

    return (
        Form ?
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Form data={modal.data} />
                </Box>
            </Modal>
            :
            null
    )
    // return Modal ? <Modal data={modal?.data} /> : null;
};

export default FormModal;