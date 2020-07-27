import React, { useReducer, useEffect } from "react";
import "../App.css";
import {
  ThemeProvider,
  CSSReset,
  CircularProgress,
  Grid,
  Flex,
  Button,
} from "@chakra-ui/core";
import Header from "./Header";
import Movie from "./Movie";
import Hero from "./Hero";

const MOVIE_API_URL = `https://www.omdbapi.com/?s=moon&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
  page: 1,
  searchValue : "moon"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        searchValue: action.payload,
        page: 1
      };
    case "NEXT_PAGE":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        page: state.page + 1,
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
        // console.log(jsonResponse);
      });
  }, []);

  const search = (searchValue) => {
      dispatch({
        type: "SEARCH_MOVIES_REQUEST",
        payload: searchValue
      });

    fetch(
      `https://www.omdbapi.com/?s=${searchValue}&page=${state.page}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search,
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
      `https://www.omdbapi.com/?s=${state.searchValue}&page=${state.page+1}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search,
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

  const { movies, errorMessage, loading } = state;


  return (
    <ThemeProvider>
      <CSSReset />
      <Header />
      <Hero search={search} />

      <Flex justify="center" align="center">
        {loading && !errorMessage ? (
          <CircularProgress
            isIndeterminate
            color="teal"
            size="70px"
          ></CircularProgress>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <Grid templateColumns={{ lg: "repeat(4, 1fr)" }} gap="1em">
            {movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))}

            <Button
              rightIcon="arrow-forward"
              variantColor="teal"
              variant="outline"
              onClick={callNextPage}
            >
              Next Page
            </Button>
          </Grid>
        )}
      </Flex>
    </ThemeProvider>
  );
}

export default App;
