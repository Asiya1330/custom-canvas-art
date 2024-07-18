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
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl h-full max-h-[90vh] overflow-y-auto sm:h-auto sm:max-h-none">
                <h2 className="text-2xl mb-4">Edit Image Details</h2>
                <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/2 sm:pr-4 sm:h-96 mb-4 sm:mb-0">
                        <img
                            src={image.imageUrl}
                            alt={image.description}
                            className="rounded-lg w-full object-contain h-64 sm:h-full"
                        />
                    </div>
                    <div className="w-full sm:w-1/2 sm:pl-4">
                        <div className="flex flex-col sm:flex-row mb-4">
                            <div className="w-full sm:w-1/2 sm:pr-2">
                                <label className="block mb-1 font-bold">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="w-full sm:w-1/2 sm:pl-2">
                                <label className="block mb-1 font-bold">Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
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
