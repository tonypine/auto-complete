import { Artist } from 'components/auto-complete/types';

export const fetchArtists = (query: string, signal?: AbortSignal): Promise<Artist[]> =>
  fetch(`https://musicbrainz.org/ws/2/artist?query=${query}&fmt=json&field=name`, {
    signal,
  })
    .then((response) => response.json())
    .then((data) => data.artists);
