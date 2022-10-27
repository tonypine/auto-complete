import React, { forwardRef } from 'react';

import styles from './styles.module.css';
import { clsx } from 'components/auto-complete/utils';

type Props = {
  className: string;
  onArrowDown: () => void;
  onChange: React.ChangeEventHandler;
  value: HTMLInputElement['value'];
};

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ className, onArrowDown, onChange, value }, ref) => {
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
      <input
        className={clsx(styles.input, className)}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref}
        type="text"
        value={value}
      />
    );
  }
);

export default TextField;
