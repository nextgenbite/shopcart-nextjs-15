// app/providers.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import Cookies from 'js-cookie';
import { useCartStore } from '@/stores/cartStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setToken, fetchUser } = useAuthStore();
    const { fetchCart } = useCartStore();

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      useAuthStore.getState().initializeAuth();
      fetchUser();
        fetchCart()
    }
  }, [setToken, fetchUser]);

  return <>{children}</>;
}