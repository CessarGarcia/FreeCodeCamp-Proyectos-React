/*  Code by César García */
import { useState } from 'react';
import quotes from "./assets/quotes.json";
import { FaTwitter, FaTumblr, FaQuoteLeft, FaQuoteRight, FaUndoAlt } from "react-icons/fa";
import './App.css'

interface Quote {
  quote: string;
  author: string;
}

const getRandomQuote = (): Quote | undefined => {
  if (quotes.length === 0) {
    return undefined;
  } else {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
};

const getRandomColor = (): string => {
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);
  return `rgb(${red}, ${green}, ${blue})`;
}

function App() {
  const initialQuote: Quote = getRandomQuote() || { quote: 'Default quote', author: 'Anonymous' };
  const [quote, setQuote] = useState<Quote>(initialQuote);
  const [randomColor, setRandomColor] = useState<string>(getRandomColor());

  const changeQuote = () => {
    setQuote(getRandomQuote() || { quote: 'Default quote', author: 'Anonymous' });
    setRandomColor(getRandomColor());
  }

  return (
    <div className='background' style={{ background: randomColor }}>
      <div className="content-p-developer">
        <p className="p-developer" style={{ color: "white" }}>
          By: Céssar García
        </p>
      </div>

      <div id="quote-box">
        <div className='quote-content' style={{ color: randomColor }}>
          <h2 id="text">
            <FaQuoteLeft size="30" style={{ marginRight: "10px" }} />
            {quote.quote}
            <FaQuoteRight size="30" style={{ marginLeft: "10px" }} />
          </h2>
          <h4 id="author"><strong>Author</strong>- {quote.author}</h4>
        </div>

        <div className="buttons">
          <a
            href={`twitter.com/intent/tweet`}
            id="tweet-quote"
            target="_blank"
            style={{
              backgroundColor: randomColor,
              marginRight: 10,
            }}
            className='a-Tweet'
          >
            <FaTwitter color="white" />
          </a>

          <a
            href={`#`}
            id="tumblr-quote"
            target="_top"
            style={{
              backgroundColor: randomColor,
              marginRight: 10,
            }}
            className='a-Tweet'
          >
            <FaTumblr color="white" />
          </a>
          <button
            id="new-quote"
            onClick={changeQuote}
            style={{ background: randomColor }}
          >Change Quote <FaUndoAlt style={{ marginLeft: 5 }} size="20" /> </button>
        </div>

      </div>
    </div>
  )
}

export default App