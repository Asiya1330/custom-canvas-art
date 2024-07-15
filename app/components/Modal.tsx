// components/Modal.tsx
import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: any| null;
    onSave: (name: string, description: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, image, onSave }) => {
    const [name, setName] = useState(image?.name || '');
    const [description, setDescription] = useState(image?.description || '');
    console.log("iamge", image);
    const handleSave = () => {
        onSave(name, description);
        onClose();
    };

    if (!isOpen || !image) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Edit Image Details</h2>
                <div className="mb-4">
                    <label className="block mb-1 font-bold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-bold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label className="block font-bold">Aspect Ratio: </label>
                    <p>{image.aspectRatio}</p>
                </div>
                {image.negativePrompt && <div className="mb-4">
                    <label className="block mb-1 font-bold">Negative Prompt</label>
                    <p>{image.negativePrompt}</p>
                </div>}
                <button
                    onClick={handleSave}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Save
                </button>
                <button
                    onClick={onClose}
                    className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Modal;
