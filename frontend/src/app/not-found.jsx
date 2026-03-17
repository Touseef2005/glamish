// pages/404.js
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20  min-h-72 text-center mt-12">
      <h1 className="text-8xl font-bold text-black">404</h1>
      <h2 className="text-2xl text-gray-800 mt-4">Oops! The page you are looking for does not exist.</h2>
      <p className="text-gray-600 mt-2">It seems like the page you are trying to reach is not available.</p>
      <Link href="/">
        <span className="text-lg text-black underline mt-6 cursor-pointer">
          Go back
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
