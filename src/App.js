import { useState, useRef, useCallback } from "react";
import _ from "lodash";
import useSearch from "./useSearch";

function App() {
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const { results, loading, hasMore } = useSearch(keyword, pageNumber, 1000);

  // Refer to the last node of the result
  const obserever = useRef();
  // For the last elemnt, add an IntersectionObserver to it
  const lastElementRef = useCallback(
    (node) => {
      // Not adding IntersectionObserver if the list is on loading
      if (loading) return;
      // Disconnect with last obserever node
      if (obserever.current) obserever.current.disconnect();
      obserever.current = new IntersectionObserver((entries) => {
        // If reaches to the end, it will fire the set next page action
        if (entries[0].isIntersecting && hasMore) {
          handlePageNumberChange();
        }
      });

      // Connect new observer node
      if (node) obserever.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setPageNumber(0);
  };

  const debouncedHandleKeywordChange = _.debounce(handleKeywordChange, 500);

  const handlePageNumberChange = (e) => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="keyword..."
        onChange={debouncedHandleKeywordChange}
      />
      <div
        style={{
          marginTop: 5,
          height: "40vh",
          border: "1px solid black",
          overflow: "auto",
        }}
      >
        {results &&
          results.map((result, i) => {
            return i + 1 === results.length ? (
              <div ref={lastElementRef} key={i}>
                {result}
              </div>
            ) : (
              <div key={i}>{result}</div>
            );
          })}
        {/* {hasMore && <div onClick={handlePageNumberChange}>Load more</div>} */}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default App;
