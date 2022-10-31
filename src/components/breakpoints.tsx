"use client";

export const Breakpoints = () => (
  <>
    {window.location.host === "localhost:3000" && (
      <div className="flex items-center m-2 fixed bottom-0 right-0 border border-gray-400 rounded p-2 bg-gray-300 text-sm">
        Current breakpoint
        <span className="ml-1 sm:hidden md:hidden lg:hidden xl:hidden">
          default (&lt; 640px)
        </span>
        <span className="ml-1 hidden sm:inline md:hidden font-extrabold">
          sm
        </span>
        <span className="ml-1 hidden md:inline lg:hidden font-extrabold">
          md
        </span>
        <span className="ml-1 hidden lg:inline xl:hidden font-extrabold">
          lg
        </span>
        <span className="ml-1 hidden xl:inline font-extrabold">xl</span>
      </div>
    )}
  </>
);
