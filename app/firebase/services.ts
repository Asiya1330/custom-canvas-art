// firebase/services.ts
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, deleteObject, uploadBytes } from "firebase/storage";
import { firestore, storage } from "./firebaseConfig";

// Upload an image to Firestore and Storage
export const uploadImageToFirestore = async (
  userId: string,
  imageBlob: Blob,
  name: string,
  description: string,
  image_description: string,
  seed: number,
  negativePrompt: string,
  aspectRatio: string
) => {
  try {
    const storageRef = ref(storage, `images/${userId}/${Date.now()}.jpeg`);
    const snapshot = await uploadBytes(storageRef, imageBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const imagesCollection = collection(firestore, `images/${userId}/favourites`);
    await addDoc(imagesCollection, {
      userId,
      imageUrl: downloadURL,
      name,
      description,
      image_description,
      seed,
      negativePrompt,
      aspectRatio,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error uploading image and creating Firestore document:", error);
    throw error;
  }
};

// Fetch all images for a user
export const fetchUserImages = async (userId: string) => {
  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const userImagesCollection = collection(firestore, `images/${userId}/favourites`);
  const q = query(userImagesCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Fetch a specific image by ID
export const fetchImage = async (userId: string, imageId: string) => {
  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const imageDocRef = doc(firestore, `images/${userId}/favourites`, imageId);
  const imageDoc = await getDoc(imageDocRef);

  if (!imageDoc.exists()) {
    throw new Error("No such image!");
  }

  return {
    id: imageDoc.id,
    ...imageDoc.data()
  };
};

// Update a user's image document
export const updateUserImage = async (userId: string, imageId: string, data: { name: string, image_description: string }) => {
  const imageRef = doc(firestore, "images", userId, "favourites", imageId);
  await updateDoc(imageRef, data);
};

// Delete a user's image and its associated storage
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

//Cart 
interface CartItem {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  description: string;
  seed: string;
  negativePrompt: string;
  aspectRatio: string;
  categoryId: number | null;
  subCategoryId: number | null;
  selectedOptions: any; 
}

export const addProductToCart = async (userId: string, product: CartItem) => {
  try {
    const cartDocRef = doc(firestore, `carts/${userId}`);
    const cartDoc = await getDoc(cartDocRef);

    if (cartDoc.exists()) {
      // If cart exists, update it
      const cartData = cartDoc.data();
      const existingProduct = cartData?.items?.find((item: CartItem) => item.productId === product.productId);
      if (existingProduct) {
        // If the product already exists in the cart, update its quantity
        existingProduct.quantity += product.quantity;
      } else {
        // If the product doesn't exist in the cart, add it
        cartData.items.push(product);
      }
      await updateDoc(cartDocRef, { items: cartData.items });
    } else {
      console.log("Product",{ userId, items: [product] });
      // If cart doesn't exist, create a new cart
      await setDoc(cartDocRef, { userId, items: [product] });
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const fetchCartItems = async (userId: string) => {
    if (!userId) {
      throw new Error("User is not authenticated");
    }
    console.log("Fetching Cart",userId);
  
    try {
      const cartDocRef = doc(firestore, `carts/${userId}`);
      const cartDoc = await getDoc(cartDocRef);
  
      if (cartDoc.exists()) {
        // If the cart document exists, return the items
        const cartData = cartDoc.data();
        return cartData?.items || [];
      } else {
        // If the cart document does not exist, return an empty array
        console.log('No cart found for this user.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  };