import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '@clerk/nextjs/server';
import { useAuth, useUser } from '@clerk/nextjs';

export const uploadImage = async (file: File,userId:string) => {
  console.log("user", userId);
  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const storageRef = ref(storage, `images/${userId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  // Save metadata in Firestore with user ID
  const imagesCollection = collection(firestore, 'images');
  await addDoc(imagesCollection, { userId: userId, name: file.name, url: downloadURL });

  return downloadURL;
};
