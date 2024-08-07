// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { firestore, storage } from "./firebaseConfig";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// export const uploadImageToFirestore = async (
//   userId: string,
//   imageBlob: Blob,
//   name:string,
//   description: string,
//   image_description: string,
//   seed: number,
//   negativePrompt: string,
//   aspectRatio: string
// ) => {
//   try {
//     const storageRef = ref(storage, `images/${userId}/${Date.now()}.jpeg`);

//     const snapshot = await uploadBytes(storageRef, imageBlob);

//     const downloadURL = await getDownloadURL(snapshot.ref);

//     const imagesCollection = collection(
//       firestore,
//       `images/${userId}/favourites`
//     );

//     await addDoc(imagesCollection, {
//       userId,
//       imageUrl: downloadURL,
//       name,
//       description,
//       image_description,
//       seed,
//       negativePrompt,
//       aspectRatio,
//       createdAt: serverTimestamp(),
//     });
//   } catch (error) {
//     console.error(
//       "Error uploading image and creating Firestore document:",
//       error
//     );
//     throw error;
//   }
// };
