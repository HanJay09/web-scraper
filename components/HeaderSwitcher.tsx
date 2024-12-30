'use client';

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabaseClient"; 
import { Header } from '@/components/Header';
import { Header2 } from '@/components/Header2';

export default function HeaderSwitcher() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data?.user); // Set to true if a user exists, otherwise false
    };

    checkAuth();

    // Subscribe to authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    // Cleanup the subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return isLoggedIn ? <Header2 /> : <Header />;
}
