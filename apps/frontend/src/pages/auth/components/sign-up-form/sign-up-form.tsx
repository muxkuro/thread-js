import {
  Button,
  Input,
  Message,
  NavLink
} from '~/libs/components/components.js';
import { AppRoute, ButtonColor, DataStatus } from '~/libs/enums/enums.js';
import { useAppForm, useAppSelector, useState } from '~/libs/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/modules/auth/auth.js';
import { signUp as signUpValidationSchema } from '~/modules/auth/libs/validation-schemas/validation-schemas.js';
import { UserPayloadKey } from '~/modules/user/enums/enums.js';

import { DEFAULT_REGISTRATION_PAYLOAD } from './libs/common/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_REGISTRATION_PAYLOAD,
    validationSchema: signUpValidationSchema
  });

  const authDataStatus = useAppSelector(({ auth }) => {
    return auth.dataStatus;
  });

  const isLoading = authDataStatus === DataStatus.PENDING;

  const handleFormSubmit = (values: UserSignUpRequestDto): void => {
    onSubmit(values);
    reset();
  };

  return (
    <>
      <h2 className={styles['title']}>Register for free account</h2>
      <form name="registrationForm" onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset disabled={isLoading} className={styles['fieldset']}>
          <Input
            name={UserPayloadKey.USERNAME}
            type="text"
            placeholder="Username"
            control={control}
            errors={errors}
          />
          <Input
            name={UserPayloadKey.EMAIL}
            type="email"
            placeholder="Email"
            control={control}
            errors={errors}
          />
          <Input
            name={UserPayloadKey.PASSWORD}
            type="password"
            placeholder="Password"
            control={control}
            errors={errors}
          />
          <Button
            type="submit"
            color={ButtonColor.TEAL}
            isLoading={isLoading}
            isFluid
            isPrimary
          >
            Sign Up
          </Button>
        </fieldset>
      </form>
      <div>
        <span>Already with us?</span>
        <NavLink to={AppRoute.SIGN_IN}>Sign In</NavLink>
      </div>
    </>
  );
};

export { SignUpForm };
