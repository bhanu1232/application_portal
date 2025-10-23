
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithCustomToken, signInAnonymously } from "firebase/auth";
import { Firestore, getFirestore, collection, addDoc } from "firebase/firestore";
import { FirebaseStorage, getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let storage: FirebaseStorage;

export const initFirebase = async () => {
    const firebaseConfig = (window as any).__firebase_config;
    const initialAuthToken = (window as any).__initial_auth_token;

    if (!firebaseConfig) {
        console.error("Firebase config not found!");
        return;
    }

    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        firestore = getFirestore(app);
        storage = getStorage(app);

        if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
        } else {
            await signInAnonymously(auth);
        }
        console.log("Firebase initialized and signed in.");
    } catch (error) {
        console.error("Firebase initialization failed:", error);
    }
};

export const saveApplication = async (appId: string, data: any) => {
    if (!firestore) throw new Error("Firestore not initialized");
    try {
        const docRef = await addDoc(collection(firestore, `/artifacts/${appId}/public/data/applications`), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

export const uploadFile = async (appId: string, file: File, fileName: string): Promise<string> => {
    if (!storage) throw new Error("Firebase Storage not initialized");
    const storageRef = ref(storage, `/artifacts/${appId}/public/files/${fileName}`);
    
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        return downloadURL;
    } catch (e) {
        console.error("Error uploading file: ", e);
        throw e;
    }
};
