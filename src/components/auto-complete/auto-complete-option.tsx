import React, { FC } from 'react';

import styles from './styles.module.css';
import { EnhancedArtist } from './types';

type Props = {
  artist: EnhancedArtist;
  onArrowUp: () => void;
  onEsc: () => void;
  onSelect: (value: string) => void;
};

const AutoCompleteOption: FC<Props> = ({ artist, onArrowUp, onEsc, onSelect }) => {
  const onKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.code) {
      case 'Enter': {
        onSelect(artist.name);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        const sibling = e.currentTarget.nextElementSibling as HTMLElement;
        if (sibling) sibling.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const sibling = e.currentTarget.previousElementSibling as HTMLElement;
        if (sibling) sibling.focus();
        else onArrowUp();
        break;
      }
      case 'Escape':
        onEsc();
    }
  };

  return (
    <button
      type="button"
      className={styles.option}
      onClick={() => onSelect(artist.name)}
      onKeyDown={onKeyPress}>
      {artist.parts.map((part, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={i}>{part}</React.Fragment>
      ))}
      {artist.disambiguation && (
        <span style={{ color: '#888', fontStyle: 'italic' }}>
          {' '}
          ({artist.disambiguation})
        </span>
      )}
    </button>
  );
};

export default AutoCompleteOption;
