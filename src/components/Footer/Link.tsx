export default function Link({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      className="block font-light text-gray-400 text-md mb-6 hover:text-gray-800 transition ease-in-out duration-300"
    >
      {title}
    </a>
  );
}
