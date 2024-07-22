import React from 'react';
import { ClipLoader } from 'react-spinners';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm,isDeleting }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                {/* <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2> */}
                <p className="mb-4">Are you sure you want to delete this image?</p>
                <div className="flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? <ClipLoader size={20} color={"#fff"} loading={true} /> : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
