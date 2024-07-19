import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "./firebaseConfig";

export const deleteUserImage = async (userId: string, imageId: string, imageUrl: string) => {
    try {
      // Delete the document from Firestore
      const imageDocRef = doc(firestore, `images/${userId}/favourites`, imageId);
      await deleteDoc(imageDocRef);
  
      // Delete the image from Firebase Storage
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting image and Firestore document:", error);
      throw error;
    }
  };