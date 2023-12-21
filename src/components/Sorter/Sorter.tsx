import { useState } from "react";
import style from "./Sorter.module.css";
import { useDispatch } from "react-redux";
import { sortAnimals } from "../../features/animals/animalsSlice";
const Sorter = () => {
  const dispatch = useDispatch();

  const [sortDirection, setSortDirection] = useState("asc");
  // dispatch(sortAnimals(sortDirection));

  return (
    <form
      className={style.sortForm}
      onSubmit={(e) => {
        e.preventDefault();

        dispatch(sortAnimals(sortDirection));
      }}
    >
      <select
        className={style.formSelect}
        name="selectOrder"
        value={sortDirection}
        onChange={(e) => {
          setSortDirection(e.target.value);
        }}
      >
        <option value="asc">ASCENDING</option>
        <option value="desc">DESCENDING</option>
      </select>
      <button className={style.button} type="submit">
        SORT
      </button>
    </form>
  );
};

export default Sorter;
