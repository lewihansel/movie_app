import React, { useState } from "react";
import { Box, Image, Flex, Button, Icon, Text } from "@chakra-ui/core";

import MovieDetails from "./MovieDetails";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://dummyimage.com/300X450/7d7d7d/ffffff.jpg&text=Image+not+found";

const Movie = ({ movie, setCollection, collection }) => {
  const property = {
    imageUrl:
      movie.poster_path === null
        ? DEFAULT_PLACEHOLDER_IMAGE
        : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    imageAlt: `The movie titled: ${movie.title}`,
    title: movie.title,
    year: movie.release_date,
  };

  const [disabled, setDisabled] = useState(false)

  const addToCollection = () => {
    setCollection([...collection, movie]);
    setDisabled(true)
  };

  const { imageUrl, imageAlt } = property;
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

        <Text>({property.year})</Text>

        <Flex justify="flex-end" mt="1rem">
          <MovieDetails movie={movie} imageAlt={imageAlt} imageUrl={imageUrl} />
          <Button
            variantColor="teal"
            variant="solid"
            onClick={addToCollection}
            size="sm"
            ml="0.5rem"
            isDisabled={disabled}
          >
            <Icon name="add" mr="0.2rem" size="10px" /> Collection
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Movie;
