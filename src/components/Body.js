import React from "react";
import {
  Flex,
  Box,
  CircularProgress,
  Grid,
  Text,
  Button,
} from "@chakra-ui/core";
import Movie from "./Movie";

const Body = ({
  loading,
  errorMessage,
  movies,
  page,
  totalPages,
  callNextPage,
  callPrevPage,
  setCollection,
  collection,
}) => {
  return (
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
        <Box height="255px">{errorMessage}</Box>
      ) : (
        <Grid
          templateColumns={{
            xl: "repeat(4, 1fr)",
            lg: "repeat(3, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={{ base: "1em", lg: "2em" }}
        >
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              setCollection={setCollection}
              collection={collection}
            />
          ))}

          <Flex flexDir="column" justify="center" align="center">
            <Grid mb="1em" justifyItems="center">
              <Text>Page</Text>
              <Text fontSize="64px">{page}</Text>
              <Text>of {totalPages}</Text>
            </Grid>

            {page === totalPages ? null : (
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

            {page === 1 ? null : (
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
  );
};

export default Body;
