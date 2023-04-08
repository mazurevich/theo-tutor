export function Header() {
  return (
    <header className="flex items-center justify-between bg-purple-500 ">
      <div className="max-w-6xl flex grow items-center justify-between center mx-auto text-white  px-4 py-3">
        <div className="flex items-center grow">
          <a
            href="/"
            className="font-bold text-lg mr-6 hover:text-purple-700 transition-colors"
          >
            Home
          </a>
          <a
            href="/chat"
            className="font-bold text-lg mr-6 hover:text-purple-700 transition-colors"
          >
            Chat
          </a>
          <a
            href="/about"
            className="font-bold text-lg mr-6 hover:text-purple-700 transition-colors"
          >
            About
          </a>
        </div>
        <div className="flex items-center max-w-screen-lg mx-auto">
          <img
            src="user-avatar.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="font-bold text-sm">John Doe</span>
        </div>
      </div>
    </header>
  );
}
