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
