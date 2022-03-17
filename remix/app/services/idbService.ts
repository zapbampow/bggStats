import { db } from "./db";

export const getLatestPlayDate = async (userId: number) => {
    
    const latestPlay = await db.plays
        .where("recordingUserId")
        .equals(userId)
        .last()
  
    return latestPlay?.date
  };

// export const getPlaysFromDate = async (userId: number, date: string) => {
//     const plays = await db.plays
//         .where("recordingUserid")
//         .equals(userId)
//         .and((play) => play.date >= date)
//         .toArray()
        
//     return plays;
// }