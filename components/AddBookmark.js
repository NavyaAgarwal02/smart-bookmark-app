'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddBookmark({ user }) {

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const addBookmark = async () => {

    if (!title || !url) {
      alert('Fill all fields');
      return;
    }

    await supabase.from('bookmarks').insert([
      {
        title,
        url,
        user_id: user.id
      }
    ]);

    setTitle('');
    setUrl('');
  };

  return (
    <div className="flex gap-2 mb-4">

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded w-1/2"
      />

      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border p-2 rounded w-1/2"
      />

      <button
        onClick={addBookmark}
        className="bg-green-600 text-white px-4 rounded"
      >
        Add
      </button>

    </div>
  );
}
