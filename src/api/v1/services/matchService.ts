import { db } from "../../../../config/firebaseConfig";
import { Match } from "../models/Matchmodels";
import { DocumentReference } from "firebase-admin/firestore";

export const matchService = {
  getAllMatches: async (): Promise<Match[]> => {
    const snapshot = await db.collection("matches").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));
  },
 
  createMatch: async (match: Omit<Match, "id">): Promise<Match> => {
    const matchRef: DocumentReference = await db.collection("matches").add(match);
    return { id: matchRef.id, ...match };
  }
};
