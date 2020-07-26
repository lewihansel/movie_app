import React, { useReducer, useEffect } from "react";
import "../App.css";
import {
  ThemeProvider,
  CSSReset,
  CircularProgress,
  Grid,
  Flex,
} from "@chakra-ui/core";
import Header from "./Header";
import Movie from "./Movie";
import Hero from "./Hero";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=moon&apikey=d0041439";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
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
          payload: jsonResponse.Search,
        });
        console.log(jsonResponse);
      });
  }, []);

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search,
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error,
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <ThemeProvider>
      <CSSReset />
        <Header />
        <Hero search={search} />

        <Flex justify="center">
          {loading && !errorMessage ? (
            <CircularProgress
              isIndeterminate
              color="teal"
              size="70px"
            ></CircularProgress>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            <Grid templateColumns={{ lg:"repeat(4, 1fr)"  }} gap="1em">
              {movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              ))}
            </Grid>
          )}
        </Flex>

    </ThemeProvider>
  );
}

export default App;
