export type Artist = {
  disambiguation?: string;
  id: string;
  name: string;
};

export type EnhancedArtist = Artist & {
  matchIndex: number;
  parts: (string | JSX.Element)[];
};

export type State = {
  loading: boolean;
  open: boolean;
  query: null | string;
  results: EnhancedArtist[];
  value: string;
};

export type Action =
  | ['clear']
  | ['close']
  | ['fetched', { results: State['results'] }]
  | ['search', { query: State['query'] }]
  | ['select', { value: string }];
