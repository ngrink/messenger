import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/config';

export const withNoAuth = (Component: FC<any>) => {
  return observer((props: any) => {
    const { authStore } = useStore()

    if (authStore.isAuth) {
      return <Navigate to="/" replace={false} />;
    }

    return <Component {...props} />;
  });
};
