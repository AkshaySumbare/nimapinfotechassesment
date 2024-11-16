import React, { useEffect, useState, useRef } from "react";
import { List } from "../component/List";
import ReactPaginate from "react-paginate";

export const Rated = () => {
  const [alldata, setAllData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  const handleSearch = async (event) => {
    const searchValue = event.target.value;
    setSearchQuery(searchValue);

    if (searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }
    console.log("searchData", alldata);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${searchQuery}&page=1`
      );
      const data = await res.json();
      const finalData = data.results;

      if (res.ok) {
        setSearchResults(finalData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const displayedProducts = searchQuery.trim() === "" ? alldata : searchResults;

  const handlePageClick = async (e) => {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUser();
  };
  const getPaginatedUser = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage.current}`
      );
      const data = await res.json();
      console.log("paginate", data);

      setPageCount(data.total_pages);

      if (res.ok) {
        setAllData(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    currentPage.current = 1;
    getPaginatedUser();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2  text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="absolute inset-y-1 right-1 px-4 text-black bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            Search
          </button>
        </div>
      </div>
      <ul>{<List alldata={displayedProducts} />}</ul>

      <ReactPaginate
        className="flex space-x-5 justify-center mt-4 mb-8  "
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        forcePage={currentPage.current - 1}
      />
    </>
  );
};
