import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

export const fetchUserImages = async (userId: string) => {
  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const userImagesCollection = collection(firestore, `images/${userId}/favourites`);
  const q = query(userImagesCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const images = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return images;
};
