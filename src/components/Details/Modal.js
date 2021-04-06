import React from 'react';
//components
import Details from './index';
//assets
import CloseIcon from '@material-ui/icons/Close';

const Modal = ({ closeModalDetails, itemMediaType, itemID }) => {
    return (
        <div className="modal">
            <button onClick={closeModalDetails}>
                <CloseIcon />
            </button>
            <Details itemMediaType={itemMediaType} itemID={itemID} />
        </div>
    );
};

export default Modal;
