"use client";
import { useAuth } from "@clerk/nextjs";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import ImageCard from "../components/ImageCard";
import EditImageModalContent from "../components/Modal";
import { deleteUserImage } from "../firebase/deleteImage";
import { fetchUserImages } from "../firebase/fetchImages";

import Modal from "react-modal";
import { updateUserImage } from "../firebase/updateImage";

const SavedArtPage: React.FC = () => {

    const [images, setImages] = useState<DocumentData[]>([]);
    const { userId } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<DocumentData | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState<{ id: string, url: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const fetchedImages = await fetchUserImages(userId);
                setImages(fetchedImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [userId]);

    const handleEditClick = (image: DocumentData) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (imageId: string, imageUrl: string) => {
        setImageToDelete({ id: imageId, url: imageUrl });
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!userId || !imageToDelete) return;
        setIsDeleting(true);
        try {
            await deleteUserImage(userId, imageToDelete.id, imageToDelete.url);
            toast.success("Image Deleted Successfully");
            setImages((prevImages) => prevImages.filter((img) => img.id !== imageToDelete.id));
        } catch (error) {
            toast.error("Error deleting Image. Please try again");
            console.error("Error deleting image:", error);
        } finally {
            setIsConfirmModalOpen(false);
            setImageToDelete(null);
            setIsDeleting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handleSave = async (name: string, image_description: string) => {
        if (selectedImage && userId) {
            try {
                await updateUserImage(userId, selectedImage.id, { name, image_description });
                setImages((prevImages) =>
                    prevImages.map((img) =>
                        img.id === selectedImage.id
                            ? { ...img, name, image_description }
                            : img
                    )
                );
                toast.success("Image Updated Successfully");
            } catch (error) {
                toast.error("Error updating Image. Please try again");
                console.error("Error updating image:", error);
            } finally {
                closeModal();
            }
        } else {
            toast.error("User ID is missing or invalid");
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-start">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold text-center mb-4">Saved Art</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    </div>
                ) : (
                    <div id="gallery" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <ImageCard
                                key={image.id}
                                image={image}
                                onEdit={handleEditClick}
                                onDelete={(imageId) => handleDeleteClick(imageId, image.imageUrl)}
                            />
                        ))}
                    </div>
                )}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Edit Image"
                    className="bg-white p-6 rounded-lg shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <EditImageModalContent
                        image={selectedImage}
                        onSave={handleSave}
                        onClose={closeModal}
                    />
                </Modal>
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={confirmDelete}
                    isDeleting={isDeleting}
                />
            </div>
        </div>
    );
};

export default SavedArtPage;
