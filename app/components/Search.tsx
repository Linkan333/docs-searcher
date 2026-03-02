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

        <div className="relative">

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
        <div className="mt-8 w-full space-y-8">

  {results.map((doc, i) => (

    <div
      key={i}
      className="
        border
        rounded-lg
        p-6
        bg-white
      "
    >

      {/* Method Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        {doc.method}
      </h2>


      {/* Description */}
      <p className="text-gray-600 mb-6">
        {doc.description}
      </p>


      {/* Syntax */}
      {doc.syntax && (
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-500 mb-2">
            Syntax
          </div>

          <div className="
            bg-gray-100
            rounded
            p-3
            font-mono
            text-sm
          ">
            {doc.syntax}
          </div>
        </div>
      )}


      {/* Examples */}
      <div>

        <div className="text-sm font-semibold text-gray-500 mb-2">
          Examples
        </div>

        <div className="space-y-3">

          {doc.examples.map((ex: string, j: number) => (

            <pre
              key={j}
              className="
                bg-gray-900
                text-gray-100
                p-4
                rounded
                text-sm
                overflow-auto
              "
            >
              {ex}
            </pre>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
  );
}

export default Search;