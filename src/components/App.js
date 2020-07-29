import React, { useReducer, useEffect } from "react";
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";

import Header from "./Header";
import Body from "./Body";
import Hero from "./Hero";
import Footer from "./Footer";

const MOVIE_API_URL = `https://www.omdbapi.com/?s=mission&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
  page: 1,
  searchValue: "moon",
  totalRes: 0,
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
        movies: action.payload.Search,
        totalRes: action.payload.totalResults,
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse,
        });
        console.log(jsonResponse);
      });
  }, []);

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
      payload: searchValue,
    });

    fetch(
      `https://www.omdbapi.com/?s=${searchValue}&page=${state.page}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse,
          });
          // console.log(jsonResponse);
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error,
          });
        }
      });
  };

  const callNextPage = (e) => {
    e.preventDefault();
    dispatch({
      type: "NEXT_PAGE",
    });

    fetch(
      `https://www.omdbapi.com/?s=${state.searchValue}&page=${
        state.page + 1
      }&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse,
          });
          console.log(jsonResponse, state);
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error,
          });
        }
      });
  };

  const callPrevPage = (e) => {
    e.preventDefault();
    dispatch({
      type: "PREV_PAGE",
    });

    fetch(
      `https://www.omdbapi.com/?s=${state.searchValue}&page=${
        state.page - 1
      }&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse,
          });
          console.log(jsonResponse, state);
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error,
          });
        }
      });
  };

  const { movies, errorMessage, loading, page, totalRes } = state;

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Header />
        <Hero search={search} loading={loading} />

        <Body
          loading={loading}
          errorMessage={errorMessage}
          movies={movies}
          page={page}
          totalRes={totalRes}
          callNextPage={callNextPage}
          callPrevPage={callPrevPage}
        />

        <Footer />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
