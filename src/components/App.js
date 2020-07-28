import React, { useReducer, useEffect } from "react";
import "./App.css";
import {
  ThemeProvider,
  CSSReset,
  CircularProgress,
  Grid,
  Flex,
  Button,
  Text,
  Box,
} from "@chakra-ui/core";

import Header from "./Header";
import Movie from "./Movie";
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

  const { movies, errorMessage, loading } = state;

  return (
    <ThemeProvider>
      <CSSReset />
      <Header />
      <Hero search={search} />

      <Flex justify="center" align="center">
        {loading && !errorMessage ? (
          <Box height="350px">
            <CircularProgress
              isIndeterminate
              color="teal"
              size="70px"
            ></CircularProgress>
          </Box>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <Grid
            templateColumns={{
              xl: "repeat(4, 1fr)",
              lg: "repeat(3, 1fr)",
              md: "repeat(2, 1fr)",
            }}
            gap={{ base: "1em", lg: "2em" }}
          >
            {movies.map((movie, index) => (
              <Movie
                key={`${index}-${movie.Title}`}
                movie={movie}
                imdb={movie.imdbID}
              />
            ))}

            <Flex flexDir="column" justify="center" align="center">
              <Grid mb="1em" justifyItems="center">
                <Text>Page</Text>
                <Text fontSize="64px">{state.page}</Text>
                <Text>of {Math.ceil(state.totalRes / 10)}</Text>
              </Grid>

              {state.page === Math.ceil(state.totalRes / 10) ? null : (
                <Button
                  rightIcon="arrow-forward"
                  variantColor="teal"
                  variant="outline"
                  onClick={callNextPage}
                  width="200px"
                >
                  Next Page
                </Button>
              )}

              {state.page === 1 ? null : (
                <Button
                  leftIcon="arrow-back"
                  variantColor="teal"
                  variant="outline"
                  onClick={callPrevPage}
                  width="200px"
                >
                  Previous Page
                </Button>
              )}
            </Flex>
          </Grid>
        )}
      </Flex>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
