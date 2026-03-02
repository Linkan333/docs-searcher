"use client"
import '../globals.css';
import { useState } from 'react';

function Search() {

  const options = ["c++", "javascript", "typescript", "rust", "python"];

  const [dropdown, setDropdown] = useState(options[0]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])

  async function doSearch() {

    const res = await fetch(
      `/api/search?q=${query}&lang=${dropdown}`
    )

    const data = await res.json()

    setResults(data)
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-40">

      <div className="w-full max-w-sm min-w-[200px]">

        {/* SEARCH BAR */}
        <div className="relative">

          {/* LANGUAGE DROPDOWN */}
          <div className="absolute top-1 left-1 flex items-center">

            <button
              onClick={() => setOpen(!open)}
              className="rounded py-1 px-1.5 flex items-center text-sm text-slate-600"
            >
              {dropdown}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                className="h-4 w-4 ml-1"
              >
                <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>

            </button>

            <div className="h-6 border-l border-slate-200 ml-1"></div>

            {/* DROPDOWN MENU */}
            <div className={`
              min-w-[150px]
              absolute left-0 mt-10
              bg-white border border-slate-200
              rounded-md shadow-lg z-10
              ${open ? "block" : "hidden"}
            `}>

              {options.map((option, idx) => (

                <div
                  key={idx}
                  onClick={() => {
                    setDropdown(option);
                    setOpen(false);
                  }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer"
                >
                  {option}
                </div>

              ))}

            </div>

          </div>


          {/* INPUT */}
          <input
            type="text"
            placeholder="Search docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
            className="
              w-full
              text-sm
              border border-slate-200
              rounded-md
              pl-28
              pr-20
              py-2
            "
          />


          {/* SEARCH BUTTON */}
          <button
            onClick={doSearch}
            className="
              absolute top-1 right-1
              flex items-center
              rounded
              bg-slate-800
              py-1 px-3
              text-sm text-white
              hover:bg-slate-700
            "
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754Z" />
            </svg>

            Search

          </button>

        </div>


        {/* RESULTS */}
        <div className="mt-8 w-full">

          {results.map((doc, i) => (

            <div key={i} className="mb-6 p-4 border rounded">

              <div className="font-bold mb-2">
                {doc.method}
              </div>

              {doc.examples.map((ex: string, j: number) => (
                <pre
                  key={j}
                  className="
                    bg-slate-900
                    text-green-400
                    p-3
                    mb-2
                    rounded
                    text-xs
                    overflow-auto
                  "
                >
                  {ex}
                </pre>
              ))}

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Search;