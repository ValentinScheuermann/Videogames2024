import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, filterByGenre, orderByCreator, orderAsc, orderDesc } from "../../actions/index";
import "./Filter.css";

export function Filter({ paginate }) {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  // Filtrado por genre
  const handleFilter = (e) => {
    dispatch(filterByGenre(e.target.value));
    paginate(e, 1);
  };

  // Ordenado
  const handleOrder = (e) => {
    if (e.target.value === "asc_name" || e.target.value === "asc_rating") {
      dispatch(orderAsc(e.target.value));
    } else if (e.target.value === "desc_name" || e.target.value === "desc_rating") {
      dispatch(orderDesc(e.target.value));
    } else {
      // Si seleccionas "All" en el orden, resetea la ordenación y lista filtrada
      dispatch({
        type: "ORDER_RESET",
      });
      paginate(e, 1);
    }
  };

  // Filtrado por API/DB
  const handleCreator = (e) => {
    if (e.target.value === "Api" || e.target.value === "Created") {
      dispatch(orderByCreator(e.target.value));
      paginate(e, 1);
    } else {
      dispatch(filterByGenre(e.target.value));
      paginate(e, 1);
    }
  };

  return (
    <div className="filter">
      <div>
        <div>Filter by Genre</div>
        <select id="filterGenre" onChange={(e) => handleFilter(e)}>
          <option key="All" value="All" default>All</option>
          {genres.map((G) => (
            <option key={G.name} value={G.name}>{G.name}</option>
          ))}
        </select>
      </div>
      <div>
        <div>Order</div>
        <select id="order" onChange={(e) => handleOrder(e)}>
          <option key="All" value="All" default>All</option>
          <option key="asc_name" value="asc_name">Alphabetically (A-Z)</option>
          <option key="desc_name" value="desc_name">Alphabetically (Z-A)</option>
          <option key="asc_rating" value="asc_rating">Rating (Lower-Higher)</option>
          <option key="desc_rating" value="desc_rating">Rating (Higher-Lower)</option>
        </select>
      </div>
      <div>
        <div>Filter by Creator</div>
        <select id="filterCreator" onChange={(e) => handleCreator(e)} >
          <option key="All" value="All" default>All</option>
          <option key="Api" value="Api">Api videogames</option>
          <option key="Created" value="Created">User videogames</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;