import '../styles/globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Smart Bookmark App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-3xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
