import React from "react";
import { Box, Image } from "@chakra-ui/core";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://dummyimage.com/300X450/7d7d7d/ffffff.jpg&text=Image+not+found";

const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  const property = {
    imageUrl: poster,
    imageAlt: `The movie titled: ${movie.Title}`,
    beds: 3,
    baths: 2,
    title: movie.Title,
    year: movie.Year,
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden" width="300px">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        {/* <Box d="flex" alignItems="baseline">
          <Badge rounded="full" px="2" variantColor="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box> */}

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Box>({property.year})</Box>

        {/* <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box> */}
      </Box>
    </Box>

    // <div className="movie">
    //   <h2>{movie.Title}</h2>
    //   <div>
    //     <img
    //       width="200"
    //       alt={`The movie titled: ${movie.Title}`}
    //       src={poster}
    //     />
    //   </div>
    //   <p>({movie.Year})</p>
    // </div>
  );
};

export default Movie;
