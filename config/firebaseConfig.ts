import { initializeApp, cert, ServiceAccount, getApps } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import * as serviceAccount from "../cricket-c5810-firebase-adminsdk-fbsvc-0cc9b24a33.json";

// Initialize Firebase Admin SDK only if it hasn't been initialized yet
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
}

const db: Firestore = getFirestore();
const auth: Auth = getAuth();

export { db, auth };
