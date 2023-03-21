import { Outlet, Navigate, Await, useParams } from 'react-router';
import { meetupStore, userStore } from 'stores';
import { Loader, NotificationVariant, notification } from 'components';
import { Suspense, useState } from 'react';

export enum TypePermission {
  CHIEF = 'CHIEF',
  EMPLOYEE = 'EMPLOYEE',
  NOTAUTHENTICATED = 'NOTAUTHENTICATED',
  AUTHENTICATED = 'AUTHENTICATED',
}

type PrivateRoutesProps = {
  types: TypePermission;
};

let notificationCount = 0;

export const PrivateRoutes = (types: PrivateRoutesProps) => {
  const { id } = useParams();

  const [login, setLogin] = useState<boolean>();

  if (login === false) {
    if (notificationCount === 1) {
      notification(NotificationVariant.Error, 'У Вас нет доступа');
    }
    notificationCount++;
  }

  async function checkLogin() {
    const resp = await userStore.checkLogin();
    switch (types.types) {
      case 'CHIEF':
        if (userStore.hasChiefPermission()) {
          setLogin(true);
        } else setLogin(false);
        break;
      case 'EMPLOYEE':
        if (
          id &&
          userStore.hasPermissionToInteract(
            (await meetupStore.get(id)).author.id,
          )
        ) {
          setLogin(true);
        } else if (userStore.hasChiefPermission()) {
          setLogin(true);
        } else {
          setLogin(false);
        }
        break;
      case 'NOTAUTHENTICATED':
        setLogin(!resp);
        break;
      case 'AUTHENTICATED':
        setLogin(!!resp);
        break;
    }
    return login;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={checkLogin()}
        children={login ? <Outlet /> : <Navigate to="/meetups/topics" />}
      />
    </Suspense>
  );
};
