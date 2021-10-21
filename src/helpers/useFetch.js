import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortFetch = new AbortController();

    fetch(url, { signal: abortFetch.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch resource.");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted.");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortFetch.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
