export const genresMap = [
  { id: 1, title: "Personal Growth" },
  { id: 2, title: "True Crime and Investigative Journalism" },
  { id: 3, title: "History" },
  { id: 4, title: "Comedy" },
  { id: 5, title: "Entertainment" },
  { id: 6, title: "Business" },
  { id: 7, title: "Fiction" },
  { id: 8, title: "News" },
  { id: 9, title: "Kids and Family" },
];

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
