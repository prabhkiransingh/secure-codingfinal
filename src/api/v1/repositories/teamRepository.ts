import { db } from "../../../../config/firebaseConfig";
import { Team } from "../models/Team";

export const getTeams = async (): Promise<Team[]> => {
  const snapshot = await db.collection("teams").get();
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Team));
};

export const getTeamById = async (id: string): Promise<Team | null> => {
  const doc = await db.collection("teams").doc(id).get();
  return doc.exists ? ({ ...doc.data(), id: doc.id } as Team) : null;
};

export const createTeam = async (team: Omit<Team, "id">): Promise<string> => {
  const docRef = await db.collection("teams").add(team);
  return docRef.id;
};


export const updateTeam = async (
    id: string,
    updates: Partial<Team>
  ): Promise<void> => {
    await db.collection("teams").doc(id).update(updates);
  };
  
  export const deleteTeam = async (id: string): Promise<void> => {
    await db.collection("teams").doc(id).delete();
  };