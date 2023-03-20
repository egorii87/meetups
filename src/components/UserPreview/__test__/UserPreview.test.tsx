import { render, screen } from '@testing-library/react';
import { UserPreview, UserPreviewVariant } from '../UserPreview';
import { BrowserRouter } from 'react-router-dom';
import { userStore } from 'stores';
import { User, UserRole } from 'model';

userStore.user = {
  id: '11111',
  name: 'Nik',
  surname: 'Testov',
  post: 'Developer',
  roles: UserRole.EMPLOYEE,
};

describe('render any variant of UserPreview', () => {
  it('with full name', () => {
    render(
      <BrowserRouter>
        <UserPreview
          variant={UserPreviewVariant.Default}
          user={userStore.currentShortUser as User}
        />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('userPreviewFullName')).toHaveTextContent(
      'Nik Testov',
    );
  });

  it('with the first letters of the name and surname', () => {
    render(
      <BrowserRouter>
        <UserPreview
          variant={UserPreviewVariant.Default}
          user={userStore.currentShortUser as User}
        />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('userPreviewInitials')).toHaveTextContent('NT');
  });
});
