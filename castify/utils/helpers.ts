import { DbUserFavourite } from "./types";

/**
 * Creates a unique identifier for a podcast episode based on the show ID, season ID, and episode number.
 *
 * This function generates a string identifier in the format `show-{showId}-S{seasonId}-E{episodeId}`.
 *
 *
 * @param {string} showId - The unique identifier of the podcast show.
 * @param {string} seasonId - The identifier of the season within the podcast show.
 * @param {number} episodeId - The number or identifier of the episode within the season.
 *
 * @returns {string} A unique string identifier for the episode.
 *
 * @example
 * // Example usage:
 * const identifier = createEpisodeIdentifier('1234', '2', 5);
 * // identifier will be 'show-1234-S2-E5'
 */
export const createEpisodeIdentifier = (
  showId: string,
  seasonId: string,
  episodeId: number
) => {
  return `show-${showId}-S${seasonId}-E${episodeId}`;
};

/**
 * Formats time in seconds to "h:mm:ss" or "m:ss" depending on the length.
 *
 * @param {number} timeInSeconds - The time in seconds to format.
 * @returns {string} The formatted time as "h:mm:ss" or "m:ss".
 */
export const formatTimeStamp = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  } else {
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
};

/**
 * Checks if a specific episode is marked as a favourite by the user.
 *
 * This function searches through the user's list of favourites and determines
 * if the provided episode ID exists in the list.
 *
 * @function checkIsFavourite
 * @param {number} episodeId - The ID of the episode to check.
 * @param {DbUserFavourite[]} favourites - The array of favourite items belonging to the user.
 * @returns {boolean} - Returns `true` if the episode is found in the favourites list, otherwise `false`.
 */
export const checkIsFavourite = (
  episodeId: number,
  favourites: DbUserFavourite[]
) => {
  return favourites.find((item) => item.episode_id === episodeId)
    ? true
    : false;
};
