import React, { useEffect, useState } from 'react';
import Back from './assets/Back.svg';
import { useNavigate } from 'react-router-dom';

function Books({ bookType }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleSearch = async () => {
    try {
      setPage(1);
      const response = await fetch(`http://skunkworks.ignitesol.com:8000/books/?search=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data.results);
      setUrl(data.next ? data.next.split("/books")[1] : "");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`http://skunkworks.ignitesol.com:8000/books${url}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData.results]);
      setUrl(newData.next ? newData.next.split("/books")[1] : "");
      setLoading(false);
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5 && !loading && url) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, url]);

const handleKeyDown=(event)=>{
  if(event.key==='Enter'){
    handleSearch();
  }
}
  return (
    <>
      <div class=" grid p-4 min-h-[100px] w-full sm:grid-cols-12 items-center  ">
        <div class="sm:col-span-2" >
        </div>
        <div class="sm:col-span-8">
          <div class="font-montserrat text-[36px] md:text-[48px] font-semibold text-[#5E56E7] flex items-center " >
            <img src={Back} alt="next" class="cursor-pointer" style={{ height: "30px", width: "60px" }} onClick={() => navigate('/')}></img><span>{bookType}</span>
          </div>
          <div className="w-full p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border-none rounded bg-[#f5f0fa] text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={query}
                onKeyDown={handleKeyDown}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 bg-transparent focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M16.65 12.65a6.5 6.5 0 1 0-9.3-9.3A6.5 6.5 0 0 0 16.65 12.65z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="sm:col-span-2" >
        </div>
      </div>

      <div class=" grid  min-h-[100px] w-full sm:grid-cols-12 items-center  ">
        <div class="sm:col-span-2" >
        </div>
        <div class="sm:col-span-8 ">
        <div className="grid  sm:grid-cols-6 grid-cols-3">
        {data.map((book, key) => (
          <div key={key} className="grid gap-2 p-2 rounded flex flex-col items-center justify-center">
            <div
              className="flex items-center justify-center rounded shadow-custom"
              style={{ height: "162px", width: "114px", margin: "auto" }}
            >
              <a href={book?.formats[`text/html`]} target="_blank" rel="noreferrer">
                <img
                  src={book?.formats[`image/jpeg`]}
                  alt="book cover"
                  style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              </a>
            </div>
            <div className="flex flex-col items-center justify-center" style={{ width: "114px" }}>
              <div
                className="font-montserrat text-[12px] font-bold text-center"
                style={{
                  height: "32px",
                  lineHeight: "16px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  textTransform: "uppercase",
                }}
              >
                {book?.title}
              </div>
              <div
                className="font-montserrat text-[12px] font-semibold text-center"
                style={{
                  height: "30px",
                  lineHeight: "16px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  color: "#8b8b8b",
                }}
              >
                {book?.authors[0]?.name}
              </div>
            </div>
          </div>
        ))}
        {loading && <div class='flex items-center justify-center'>Loading items...</div>}
      </div>
        </div>
        <div class="sm:col-span-2" >
        </div>
      </div>
    </>
  );
}

export default Books;
