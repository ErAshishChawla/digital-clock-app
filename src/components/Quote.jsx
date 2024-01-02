import { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import useClasses from "../hooks/useClasses";

const RANDOM_QUOTE_URL = "https://api.quotable.io/random";
function Quote({ isDark }) {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState({});

  const getQuote = async () => {
    const response = await fetch(RANDOM_QUOTE_URL);
    const data = await response.json();

    setQuote({ content: data.content, author: data.author });
  };

  useEffect(() => {
    getQuote();
    setIsLoading(false);
  }, []);

  const renderedQuote = (
    <div className="w-full flex items-center justify-between mb-[4rem]">
      <div className="flex flex-col justify-center">
        <div
          className={useClasses("mb-2 text-gray-300 text-lg", {
            "text-slate-900": isDark,
          })}
        >{`"${quote.content}"`}</div>
        <div
          className={useClasses("text-lg text-white", {
            "text-black": isDark,
          })}
        >
          {quote.author}
        </div>
      </div>
      <button
        className={useClasses(
          "flex justify-center items-center text-2xl p-2 self-start hover:scale-[1.1]",
          {
            "text-black": isDark,
          }
        )}
        onClick={getQuote}
      >
        <FiRefreshCw />
      </button>
    </div>
  );

  return (
    <div className="w-full flex items-center justify-center z-[2]">
      {isLoading ? <div>Loading...</div> : renderedQuote}
    </div>
  );
}

export default Quote;
