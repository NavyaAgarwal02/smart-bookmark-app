'use client';

import { supabase } from '../../lib/supabase';

export default function Login() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <button
        onClick={loginWithGoogle}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Sign in with Google
      </button>
    </div>
  );
}
