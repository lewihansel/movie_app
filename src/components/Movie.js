import React from "react";
import { Box, Image, Flex } from "@chakra-ui/core";

import MovieDetails from "./MovieDetails";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://dummyimage.com/300X450/7d7d7d/ffffff.jpg&text=Image+not+found";

const Movie = ({ movie, imdb }) => {

  const property = {
    imageUrl: movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster,
    imageAlt: `The movie titled: ${movie.Title}`,
    title: movie.Title,
    year: movie.Year,
  };

  const {imageUrl, imageAlt} = property; 
  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden" width="300px">
      <Image src={imageUrl} alt={imageAlt} size="450px" />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Flex justify="space-between">
          <Box>({property.year})</Box>

          <MovieDetails imdb={imdb} imageAlt={imageAlt} imageUrl={imageUrl} />
        </Flex>
      </Box>
    </Box>
  );
};

export default Movie;
