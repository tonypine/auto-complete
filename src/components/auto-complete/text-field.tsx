import React, { forwardRef } from 'react';

import styles from './styles.module.css';
import { clsx } from 'components/auto-complete/utils';

type Props = {
  className: string;
  onArrowDown: () => void;
  onChange: React.ChangeEventHandler;
  onClear: () => void;
  value: HTMLInputElement['value'];
};

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ className, onArrowDown, onChange, onClear, value }, ref) => {
    const onKeyDown = (e: React.KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowDown': {
          e.preventDefault();
          onArrowDown();
          break;
        }
        default:
      }
    };

    return (
      <div className={styles.inputWrapper}>
        <input
          className={clsx(styles.input, className)}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Search artists"
          ref={ref}
          type="text"
          value={value}
        />
        {value && (
          <button className={styles.clearButton} type="button" onClick={onClear}>
            clear
          </button>
        )}
      </div>
    );
  }
);

export default TextField;
