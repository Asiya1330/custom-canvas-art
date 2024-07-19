import React, { useState } from 'react';
import Modal from 'react-modal';

interface CustomSizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (customSize: string) => void;
}

const CustomSizeModal: React.FC<CustomSizeModalProps> = ({ isOpen, onClose, onSave }) => {
    const [customHeight, setCustomHeight] = useState<string>('');
    const [customWidth, setCustomWidth] = useState<string>('');

    const handleSave = () => {
        if (customWidth && customHeight) {
            const customSize = `${customWidth}x${customHeight}`;
            onSave(customSize);
            setCustomHeight('');
            setCustomWidth('');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add Custom Size"
            className="modal"
            overlayClassName="overlay"
        >
            <h2 className="text-2xl font-bold mb-4">Add Custom Size</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Custom Width</label>
                <input
                    type="text"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Custom Height</label>
                <input
                    type="text"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Save
                </button>
                <button
                    onClick={onClose}
                    className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default CustomSizeModal;
