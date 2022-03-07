import { db } from "../../services/db";

// All these must filter by recordingUserId too
export const getAllPlayerNames = async (recordingUserId: number) => {
  const names: string[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      play.players.forEach((player) => player?.name && names.push(player.name));
    });

  const uniqueNames = [...new Set(names)];

  return uniqueNames;
};

export const getAllUserNames = async (recordingUserId: number) => {
  const usernames: string[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      play.players.forEach(
        (player) => player?.username && usernames.push(player.username)
      );
    });

  const uniqueUsernames = [...new Set(usernames)];

  return uniqueUsernames;
};

export const getAllPlayedColors = async (recordingUserId: number) => {
  const colors: string[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      play.players.forEach(
        (player) => player?.color && colors.push(player.color)
      );
    });

  const uniqueColors = [...new Set(colors)];

  return uniqueColors;
};

export const getAllLocations = async (recordingUserId: number) => {
  const locations: string[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      play?.location && locations.push(play.location);
    });

  const uniqueLocations = [...new Set(locations)];

  return uniqueLocations;
};
