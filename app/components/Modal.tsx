// components/Modal.tsx
import React, { useState, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: any | null;
    onSave: (name: string, description: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, image, onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (image) {
            setName(image.name || '');
            setDescription(image.description || '');
        }
    }, [image]);

    const handleSave = () => {
        onSave(name, description);
        onClose();
    };

    if (!isOpen || !image) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
                <h2 className="text-2xl mb-4">Edit Image Details</h2>
                <div className="flex">
                    <div className="w-1/2 pr-4 h-96">
                        <img src={image.imageUrl} alt={image.description} className="rounded-lg h-full w-full object-contain h-auto" />
                    </div>
                    <div className="w-1/2 pl-4">
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
                            <label className="block font-bold">Prompt: </label>
                            <p className="ml-2">{image.description}</p>
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold">Aspect Ratio: </label>
                            <p className="ml-2">{image.aspectRatio}</p>
                        </div>
                        {image.negativePrompt && (
                            <div className="mb-4">
                                <label className="block mb-1 font-bold">Negative Prompt</label>
                                <p className="ml-2">{image.negativePrompt}</p>
                            </div>
                        )}
                        <div className="flex">
                            <button
                                onClick={handleSave}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={onClose}
                                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
