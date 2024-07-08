"use client"
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";
import { fetchUserImages } from "../firebase/fetchImages";
import { useRouter } from 'next/navigation';
import { ClipLoader } from "react-spinners";

const SavedArtPage: React.FC = () => {
    const [images, setImages] = useState<DocumentData[]>([]);
    const { userId } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchImages = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const fetchedImages = await fetchUserImages(userId);
                console.log(fetchedImages, "images")
                setImages(fetchedImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [userId]);

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
                                onClick={() => router.push(`/product/${image.id}`)}
                                className="block overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            >
                                <img
                                    src={image.imageUrl}
                                    alt={image.description}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedArtPage;
