import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg  w-[300px] py-20">
                <p className='text-black text-center'>{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 mx-auto flex text-white rounded text-sm"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export default Modal;