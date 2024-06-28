
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore, storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImageToFirestore = async (userId: string, imageBlob: Blob, description: string) => {
  try {
    // Create a reference to the storage bucket location
    const storageRef = ref(storage, `images/${userId}/${Date.now()}.jpeg`);

    // Upload the file to the specified reference
    const snapshot = await uploadBytes(storageRef, imageBlob);

    // Get the file's URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Create a reference to the Firestore collection
    const imagesCollection = collection(firestore,`images/${userId}/favourites`);

    // Add a new document with a generated ID to the collection
    await addDoc(imagesCollection, {
      userId,
      imageUrl: downloadURL,
      description,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error uploading image and creating Firestore document:', error);
    throw error;
  }
};