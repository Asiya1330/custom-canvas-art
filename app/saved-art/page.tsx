"use client";
import { useAuth } from "@clerk/nextjs";
import { DocumentData } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FaEye } from 'react-icons/fa';
import { MdModeEditOutline } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import Modal from "../components/Modal";
import { fetchUserImages } from "../firebase/fetchImages";
const SavedArtPage: React.FC = () => {
    const [images, setImages] = useState<DocumentData[]>([]);
    const { userId } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<DocumentData | null>(null);
    const router = useRouter();

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

    const handleViewClick = (imageId: string) => {
        router.push(`/product/${imageId}`);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handleSave = (name: string, description: string) => {
        if (selectedImage) {
            setImages((prevImages) =>
                prevImages.map((img) =>
                    img.id === selectedImage.id
                        ? { ...img, name, description }
                        : img
                )
            );
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
                            <div
                                key={index}
                                className="relative block overflow-hidden rounded-lg shadow-lg cursor-pointer group h-96"
                            >
                                <img
                                    src={image.imageUrl}
                                    alt={image.description}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end p-2 space-x-2">
                                    <MdModeEditOutline
                                        className="w-7 h-7 text-white bg-blue-500 p-1 rounded-full"
                                        onClick={() => handleEditClick(image)}
                                    />
                                    <FaEye
                                        className="w-7 h-7 text-white bg-green-500 p-1 rounded-full"
                                        onClick={() => handleViewClick(image.id)}
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-2 text-center">
                                    {image.description}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Modal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} onSave={handleSave} />
            </div>
        </div>
    );
};

export default SavedArtPage;
