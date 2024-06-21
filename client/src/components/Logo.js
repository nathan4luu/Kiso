export default function Logo() {
  return (
    <div className="border-solid rounded-3xl px-4 py-1">
      <a
        href="/dashboard"
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <h1 className="font-shojumaru self-center text-3xl font-bold text-purple-600 whitespace-nowrap dark:text-white select-none hidden md:block">
          Kiso
        </h1>
        <h1 className="font-shojumaru self-center text-3xl font-bold text-purple-600 whitespace-nowrap dark:text-white select-none md:hidden">
          K
        </h1>
      </a>
    </div>
  );
};
