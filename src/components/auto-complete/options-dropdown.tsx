import { forwardRef, PropsWithChildren } from 'react';

import styles from './styles.module.css';
import { clsx } from 'components/auto-complete/utils';

const OptionsDropdown = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{ loading: boolean }>
>(({ children, loading }, ref) => (
  <div
    ref={ref}
    className={clsx(styles.optionDropdown, loading && styles.optionDropdownLoading)}
    style={{
      borderRadius: 4,
      boxShadow: '0px 4px 16px rgba(0,0,0,0.2)',
      textAlign: 'left',
      maxHeight: 320,
      padding: '12px 0',
      overflow: 'auto',
    }}>
    {children}
  </div>
));

export default OptionsDropdown;
