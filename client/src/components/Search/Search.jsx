import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../actions";
import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";
function Search() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const regExLetters = /^[a-zA-Z\s]*$/;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  function handleSubmit(e) {
    e.preventDefault();
    if (!regExLetters.test(e.target.value))
      return setError(
        "Breed names cannot contain numbers or special characters"
      );
    dispatch(getDogs(input));
    setError("");
    setSearchParams("");
  }
  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className={styles.search}>
      {error && <p>{error}</p>}
      <form class={styles.form}>
        <input
          value={input}
          placeholder="Find a dog breed"
          onChange={(e) => handleChange(e)}
        />
        <button
          className={styles.button}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Find
        </button>
      </form>
    </div>
  );
}

export default React.memo(Search); //It will re-render ONLY when its internal props changes and not when the Home props changes https://www.joshwcomeau.com/react/why-react-re-renders/
