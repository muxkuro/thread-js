import { Button, Input, Message } from '~/libs/components/components.js';
import { AppRoute, ButtonColor } from '~/libs/enums/enums.js';
import { useAppForm } from '~/libs/hooks/hooks.js';

import { UserPayloadKey } from '~/modules/user/user.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './libs/common/constants.js';
import styles from './styles.module.scss';
import { NavLink } from '~/libs/components/components.js';

type Properties = {};

const SignInForm: React.FC<Properties> = () => {
  const { control, errors } = useAppForm({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD
  });

  return (
    <>
      <h2 className={styles['title']}>Login to your account</h2>
      <form name="loginForm">
        <fieldset className={styles['fieldset']}>
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
          <Button type="submit" color={ButtonColor.TEAL} isFluid isPrimary>
            Sign In
          </Button>
        </fieldset>
      </form>
      <div>
        <span>New to us?</span>
        <NavLink to={AppRoute.SIGN_UP}>Sign Up</NavLink>
      </div>
    </>
  );
};

export { SignInForm };
