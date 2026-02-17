'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { supabase } from '../../lib/supabase';
import AddBookmark from '../../components/AddBookmark';
import BookmarkList from '../../components/BookmarkList';

export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const router = useRouter();

  // Check login
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/login');
      } else {
        setUser(data.session.user);
      }
    });
  }, []);

  // Fetch + Realtime
  useEffect(() => {
    if (!user) return;

    fetchBookmarks();

    const channel = supabase
      .channel('bookmarks-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, [user]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setBookmarks(data || []);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        My Bookmarks
      </h1>

      <AddBookmark user={user} />
      <BookmarkList bookmarks={bookmarks} />
    </div>
  );
}
