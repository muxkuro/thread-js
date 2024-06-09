import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { type ReactElement } from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues
} from 'react-hook-form';

import { useController } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type InputProperties<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  errors?: object;
  disabled?: boolean;
  placeholder: string;
  className?: string;
  type?: 'email' | 'password' | 'submit' | 'text';
  rows?: number;
};

const Input = <T extends FieldValues>({
  name,
  control,
  type = 'text',
  rows = 0,
  errors = {},
  disabled,
  placeholder,
  className
}: InputProperties<T>): ReactElement => {
  const { field } = useController<T>({ name, control });
  const isTextarea = Boolean(rows);

  return (
    <div className={styles['inputWrapper']}>
      <div className={styles['inputContainer']}>
        {isTextarea ? (
          <textarea
            {...field}
            name={name}
            rows={rows}
            placeholder={placeholder}
            className={clsx(styles['textArea'], className)}
          />
        ) : (
          <input
            {...field}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={clsx(styles['input'], className)}
          />
        )}
      </div>
      <span className={styles['errorWrapper']}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Input };
