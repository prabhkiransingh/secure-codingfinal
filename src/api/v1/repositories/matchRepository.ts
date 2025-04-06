import { db } from "../../../../config/firebaseConfig";
import { Match } from "../models/Match";

export const getMatches = async (category?: string): Promise<Match[]> => {
  const query = db.collection("matches");
  if (category) query.where("status", "==", category);
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Match[];
};


export const getMatchById = async (id: string): Promise<Match | null> => {
  const doc = await db.collection("matches").doc(id).get();
  return doc.exists
    ? ({ ...doc.data(), id: doc.id } as Match)
    : null;
};

export const createMatch = async (match: Omit<Match, "id">): Promise<string> => {
  const docRef = await db.collection("matches").add(match);
  return docRef.id;
};

export const updateMatch = async (
  id: string,
  updates: Partial<Match>
): Promise<void> => {
  await db.collection("matches").doc(id).update(updates);
};

export const deleteMatch = async (id: string): Promise<void> => {
  await db.collection("matches").doc(id).delete();
};