/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import { type ReactNode } from 'react';

import { type ButtonColor } from '~/libs/enums/enums.js';
import { type ButtonType, type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type ButtonProperties = {
  children?: ReactNode;
  type?: ButtonType;
  color?: ValueOf<typeof ButtonColor>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  isBasic?: boolean;
  isFluid?: boolean;
  isLoading?: boolean;
  isPrimary?: boolean;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProperties> = ({
  onClick,
  className,
  type = 'button',
  color,
  isBasic = false,
  isFluid = false,
  isLoading = false,
  isPrimary = false,
  isDisabled = false,
  children
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        styles['btn'],
        isLoading && styles['loading'],
        isFluid && styles['fluid'],
        isBasic && styles['basic'],
        isPrimary && styles['primary'],
        color && styles[`btn__${color}`],
        className
      )}
      type={type}
    >
      {children}
    </button>
  );
};

export { Button };
