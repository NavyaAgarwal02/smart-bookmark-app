export default function BookmarkList({ bookmarks }) {

  return (
    <ul className="space-y-2">

      {bookmarks.map(bookmark => (

        <li
          key={bookmark.id}
          className="bg-white p-3 shadow rounded flex justify-between"
        >

          <a
            href={bookmark.url}
            target="_blank"
            className="text-blue-600 font-medium"
          >
            {bookmark.title}
          </a>

        </li>

      ))}

    </ul>
  );
}
