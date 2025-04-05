import { db } from "../../../../config/firebaseConfig";
import { Player } from "../models/Player";

export const getPlayers = async (teamId?: string): Promise<Player[]> => {
  const query = db.collection("players");
  if (teamId) query.where("teamId", "==", teamId);
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Player));
};

export const getPlayerById = async (id: string): Promise<Player | null> => {
  const doc = await db.collection("players").doc(id).get();
  return doc.exists ? ({ ...doc.data(), id: doc.id } as Player) : null;
};

export const createPlayer = async (player: Omit<Player, "id">): Promise<string> => {
    const docRef = await db.collection("players").add(player);
    return docRef.id;
  };
  
  export const updatePlayer = async (
    id: string,
    updates: Partial<Player>
  ): Promise<void> => {
    await db.collection("players").doc(id).update(updates);
  };
  
  export const deletePlayer = async (id: string): Promise<void> => {
    await db.collection("players").doc(id).delete();
  };