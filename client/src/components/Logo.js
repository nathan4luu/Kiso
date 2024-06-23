export default function Logo() {
  return (
    <div className="border-solid rounded-3xl px-4 py-1">
      <a
        href="/dashboard"
        className="flex items-center  font-shojumaru space-x-3 rtl:space-x-reverse text-3xl font-bold text-white whitespace-nowrap dark:text-white select-none"
      >
        <h1 className=" self-center  hidden md:block">
          Kiso
        </h1>
        <h1 className=" self-center md:hidden">
          K
        </h1>
      </a>
    </div>
  );
};
