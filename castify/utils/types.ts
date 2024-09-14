export type TPodcastGenre = {
  id: number;
  title: string;
  description: string;
  showIds: number[];
};

export type TPodcastEpisode = {
  episode: number;
  title: string;
  description: string;
  file: string;
};

export type TPodcastSeason = {
  season: number;
  title: string;
  image: string;
  episodes: TPodcastEpisode[];
};

export type TPodcastShow = {
  id: number;
  title: string;
  description: string;
  seasons: TPodcastSeason[];
  image: string;
  genres: string[];
  updated: string;
};

export type TPodcastPreview = {
  id: number;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
};

export type TSortOptionValue =
  | "default"
  | "titleAsc"
  | "titleDesc"
  | "dateAsc"
  | "dateDesc";

export type TSortOption = {
  value: TSortOptionValue;
  title: string;
};

export type TAudioPlayerEpisode = TPodcastEpisode & { identifier: string };

export type TEpisodePlayHistory = {
  identifier: string;
  wasPlayedFully: boolean;
  progress?: number;
  episodeLength?: number;
};

export type DbUserFavourite = {
  created_at: string;
  episode_description: string | null;
  episode_file: string | null;
  episode_id: number | null;
  episode_title: string | null;
  id: number;
  season_id: number | null;
  show_id: number | null;
  user_id: string | null;
  was_shared: boolean | null;
};

export type DbInsertFavourite = {
  created_at?: string;
  episode_description?: string | null;
  episode_file?: string | null;
  episode_id?: number | null;
  episode_title?: string | null;
  id?: number;
  season_id?: number | null;
  show_id?: number | null;
  user_id?: string | null;
  was_shared?: boolean | null;
};
