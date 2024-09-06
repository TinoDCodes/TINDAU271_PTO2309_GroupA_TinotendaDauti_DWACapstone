export type TPodcastGenre = {
  id: number;
  title: string;
  description: string;
  showIds: number[];
};

export type TPodcastEpisode = {
  id: number;
  file: string;
  title: string;
};

export type TPodcastSeason = {
  id: number;
  title: string;
  image: string;
  episodes: TPodcastEpisode[];
};

export type TPodcastShow = {
  id: number;
  title: string;
  description: string;
  seasons: TPodcastSeason[];
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
