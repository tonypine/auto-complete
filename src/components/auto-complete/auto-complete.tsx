import { ChangeEventHandler, useCallback, useEffect, useReducer, useRef } from 'react';

import AutoCompleteOption from './auto-complete-option';
import { fetchArtists } from './fetch-artists';
import OptionsDropdown from './options-dropdown';
import styles from './styles.module.css';
import TextField from './text-field';
import { Action, EnhancedArtist, State } from './types';
import { clsx, enhanceArtists, filterUnmatchedArtists, sortArtists } from './utils';

const initialState: State = {
  loading: false,
  open: false,
  query: null,
  results: [],
  value: '',
};

const reducer = (state: State, action: Action) => {
  const [type, data] = action;

  switch (type) {
    case 'close':
      return { ...initialState, value: state.value };
    case 'fetched':
      return { ...state, loading: false, results: data.results };
    case 'search': {
      const { query } = data;
      if (query === '') return { ...state, query: data.query };

      return { ...state, loading: true, open: true, query: data.query };
    }
    case 'select':
      return { ...initialState, value: data.value };
    default:
      return state;
  }
};

const AutoComplete = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const optionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { loading, open, query, results, value } = state;

  useEffect(() => {
    const controller = new AbortController();

    // Manually debounce requests
    const timeoutId = setTimeout(() => {
      if (!query) return;

      fetchArtists(query, controller.signal)
        .then((artists) => enhanceArtists(artists, query))
        .then(filterUnmatchedArtists)
        .then(sortArtists)
        .then((enhancedArtists) => dispatch(['fetched', { results: enhancedArtists }]));
    }, 300);

    return () => {
      clearTimeout(timeoutId);

      // Aborts ongoing requests
      controller.abort();
    };
  }, [query]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch(['search', { query: e.target.value }]);

  const onInputArrowDown = useCallback(() => {
    const el = optionsRef.current?.children[0] as HTMLElement;
    if (el) el.focus();
    else dispatch(['search', { query: value }]);
  }, [value]);

  const onSelect = (artistName: EnhancedArtist['name']) => {
    dispatch(['select', { value: artistName }]);
    inputRef.current?.focus();
  };

  const onEscape = () => {
    dispatch(['close']);
    inputRef.current?.focus();
  };

  return (
    <div
      style={{ position: 'relative' }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          dispatch(['close']);
        }
      }}>
      <TextField
        className={clsx(open && styles.inputActive)}
        onArrowDown={onInputArrowDown}
        onChange={onChange}
        ref={inputRef}
        value={query === null ? value : query}
      />
      {open && (
        <OptionsDropdown loading={loading} ref={optionsRef}>
          {results.length === 0 && (
            <div style={{ padding: '4px 24px' }}>
              {!loading && <div>No results found for "{query}"</div>}
              {loading && <div>Loading ...</div>}
            </div>
          )}
          {results.map((r) => (
            <AutoCompleteOption
              artist={r}
              key={r.id}
              onArrowUp={() => inputRef.current?.focus()}
              onEsc={onEscape}
              onSelect={onSelect}
            />
          ))}
        </OptionsDropdown>
      )}
    </div>
  );
};

export default AutoComplete;
