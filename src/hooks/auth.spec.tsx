import { renderHook, act } from '@testing-library/react-hooks';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';
import { mocked } from 'ts-jest/utils';

import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session');
fetchMock.enableMocks();

const userTest = {
  id: 'hasjkhdkasjhd',
  email: 'user@mail.com',
  name: 'Username Surname',
  photo: 'photo.png',
};

describe('Auth Hook', () => {
  test('should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'uui4_token',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe(userTest.email);
  });

  test('should not connect if authentication cancelled', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});
