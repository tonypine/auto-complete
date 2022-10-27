import { Artist, EnhancedArtist } from './types';

export const generateParts = (
  artist: Artist,
  query: string
): Pick<EnhancedArtist, 'parts' | 'matchIndex'> => {
  const matchIndex = artist.name.toLowerCase().indexOf(query.toLowerCase());
  const parts = [];

  if (matchIndex >= 0) {
    parts.push(artist.name.slice(0, matchIndex));
    parts.push(
      <span
        style={{
          color: '#3498db',
          fontWeight: '600',
        }}>
        {artist.name.slice(matchIndex, matchIndex + query.length)}
      </span>
    );
    parts.push(artist.name.slice(matchIndex + query.length, artist.name.length));
  } else {
    parts.push(artist.name);
  }

  return { parts, matchIndex };
};

export const enhanceArtists = (artists: Artist[], query: string): EnhancedArtist[] =>
  artists.map((r: Artist) => {
    const { parts, matchIndex } = generateParts(r, query);
    return { ...r, parts, matchIndex };
  });

export const filterUnmatchedArtists = (artists: EnhancedArtist[]) =>
  artists.filter((a) => a.matchIndex >= 0);

export const sortArtists = (artists: EnhancedArtist[]) =>
  artists
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .sort((a, b) => (a.matchIndex < b.matchIndex ? -1 : 1));

export const clsx = (...classes: any[]): string => classes.filter(Boolean).join(' ');
