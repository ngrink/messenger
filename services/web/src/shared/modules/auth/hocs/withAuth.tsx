import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useStore } from '@/config';

export const withAuth = (Component: FC<any>) => {
  return (props: any) => {
    const { authStore } = useStore()

    if (!authStore.isAuth) {
      return <Navigate to="/login" replace={false} />;
    }

    return <Component {...props} />;
  };
};
