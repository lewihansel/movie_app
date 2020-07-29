import React, { useReducer, useEffect, useState } from "react";
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";

import Header from "./Header";
import MovieCollection from "./MovieCollection";
import Body from "./Body";
import Hero from "./Hero";
import Footer from "./Footer";

const MOVIE_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&include_video=false&page=1`;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
  page: 1,
  searchValue: "",
  totalPages: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        searchValue: action.payload,
        page: 1,
      };
    case "NEXT_PAGE":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        page: state.page + 1,
      };
    case "PREV_PAGE":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        page: state.page - 1,
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload.results,
        totalPages: action.payload.total_pages,
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.status_message,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse,
        });
        // console.log(jsonResponse);
      });
  }, []);

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
      payload: searchValue,
    });

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchValue}&page=${state.page}&include_adult=false`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse) {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse,
          });
          console.log(jsonResponse);
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            payload: jsonResponse,
          });
          console.log(jsonResponse.status_message);
        }
      });
  };

  const callNextPage = (e) => {
    e.preventDefault();
    dispatch({
      type: "NEXT_PAGE",
    });

    const url = state.searchValue
      ? `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&query=${state.searchValue}&page=${state.page + 1}&include_adult=false`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_video=false&include_video=false&page=${
          state.page + 1
        }`;

    fetch(url)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse) {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse,
          });
          // console.log(jsonResponse, state);
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            payload: jsonResponse,
          });
          console.log(jsonResponse.status_message);
        }
      });
  };

  const callPrevPage = (e) => {
    e.preventDefault();
    dispatch({
      type: "PREV_PAGE",
    });

    const url = state.searchValue
      ? `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&query=${state.searchValue}&page=${state.page - 1}&include_adult=false`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_video=false&include_video=false&page=${
          state.page - 1
        }`;

    fetch(url)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse) {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse,
          });
          console.log(jsonResponse, state);
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            payload: jsonResponse,
          });
          console.log(jsonResponse.status_message);
        }
      });
  };

  const { movies, errorMessage, loading, page, totalPages } = state;

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Header />
        <Hero search={search} loading={loading} />

        {collection.length ? <MovieCollection collection={collection} /> : null}
        {console.log(collection)}
        <Body
          loading={loading}
          errorMessage={errorMessage}
          movies={movies}
          page={page}
          totalPages={totalPages}
          callNextPage={callNextPage}
          callPrevPage={callPrevPage}
          setCollection={setCollection}
          collection={collection}
        />

        <Footer />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
