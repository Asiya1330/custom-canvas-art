import { uploadImageToFirestore } from '@/app/firebase/services';
import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';
import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import EditImageModalContent from '../Modal';

interface FavoriteImageProps {
  imageFile: Blob;
  description: string;
  seed: number;
  negativePrompt: string;
  aspectRatio: string;
  addImage: (newImage: DocumentData) => void;
}

const FavoriteImage: React.FC<FavoriteImageProps> = ({ imageFile, description, seed, negativePrompt, aspectRatio, addImage }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { userId } = useAuth();
  const isSignedIn = !!userId;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<DocumentData | null>(null);
  const handleFavoriteClick = async (name: string = '', image_description: string = ''): Promise<void> => {
    if (!isSignedIn) {
      setModalIsOpen(true);
      return;
    }

    setLoading(true);
    try {


      // Determine if we're saving or updating
      if (!isFavorite || name || image_description) {
        await uploadImageToFirestore(
          userId,
          imageFile,
          name,
          description,
          image_description,
          seed,
          negativePrompt,
          aspectRatio,);
        setIsFavorite(true);
        toast.success(name || image_description ? "Image updated and saved to favorites!" : "Image saved to favorites!");

        // Create the new image object
        const newImage = {
          id: new Date().toISOString(),
          imageUrl: URL.createObjectURL(imageFile),
          description,
          seed,
          negativePrompt,
          aspectRatio,
        };
        addImage(newImage);
      } else {
        toast.info("Image is already in favorites.");
      }
    } catch (error) {
      console.error("Error saving image to favorites:", error);
      toast.error("An error occurred while saving the image.");
    } finally {
      setLoading(false);
    }
  };


  const handleEditClick = () => {
    setSelectedImage({ id: new Date().toISOString(), imageUrl, description, seed, negativePrompt, aspectRatio });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedImage(null);
  };

  const imageUrl = URL.createObjectURL(imageFile);

  return (
    <div className='w-full flex flex-col items-center mt-4 relative'>
      <div className='relative max-w-full w-1/2'>
        <img src={imageUrl} alt="Generated Art" className="object-contain" />
      </div>
      <div className='flex gap-4 mt-4'>
        <button
          className={`flex items-center px-4 py-2 rounded-md border ${isFavorite
            ? 'bg-custom-green text-white border-custom-green cursor-not-allowed'
            : 'bg-white text-custom-purple border-custom-purple hover:bg-custom-purple hover:text-white'
            }`}
          onClick={handleEditClick}
          disabled={loading || isFavorite}
        >
          {isFavorite?<FaBookmark className="mr-2"/> : <FaRegBookmark className='mr-2' />}
          {isFavorite ? 'Saved' : 'Save to my profile'}
        </button>

        <button
          className='flex items-center px-4 py-2 bg-custom-purple text-white rounded-md hover:bg-white hover:text-custom-purple hover:border-custom-purple border'
        >
          Buy artwork
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Sign In or Sign Up"
        ariaHideApp={false}
        className="flex flex-col items-center p-4 bg-white rounded-md shadow-lg max-w-md mx-auto mt-24"
      >
        <h2 className="mb-4 text-xl font-semibold">Sign in or Sign up</h2>
        <SignInButton mode="modal">
          <button className="mb-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Sign Up
          </button>
        </SignUpButton>
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Image"
        className="bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <EditImageModalContent
          image={selectedImage}
          onSave={(name, description) => handleFavoriteClick(name, description)}
          onClose={closeEditModal}
        />
      </Modal>

    </div>
  );
};

export default FavoriteImage;
