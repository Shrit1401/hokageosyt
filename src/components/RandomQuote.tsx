import React from "react";

interface RandomeQuoteProps {
  quote: { quote: string; author: string } | null;
}

const RandomQuote: React.FC<RandomeQuoteProps> = ({ quote }) => {
  return (
    <div className="text-center w-[50%] gap-5 flex flex-col">
      naruto.
      <div className="text-center">
        {quote && (
          <>
            <p className="text-2xl">{quote.quote}</p>
            <p className="text-xl opacity-50">
              {quote.author === "Unknown" ? "" : quote.author}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default RandomQuote;
