import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/courses" className="text-white hover:underline">
            Courses
          </Link>
        </li>
        <li>
          <Link href="/assignments" className="text-white hover:underline">
            Assignments
          </Link>
        </li>
        <li>
          <Link href="/notes" className="text-white hover:underline">
            Notes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;