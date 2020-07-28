import React, { useState } from "react";
import {
  Box,
  Image,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  Text,
  Icon,
} from "@chakra-ui/core";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://dummyimage.com/300X450/7d7d7d/ffffff.jpg&text=Image+not+found";

const Movie = ({ movie, imdb }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  const property = {
    imageUrl: poster,
    imageAlt: `The movie titled: ${movie.Title}`,
    title: movie.Title,
    year: movie.Year,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movieDetails, setMovieDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDetailFetch = () => {
    setLoading(true);
    fetch(
      `https://www.omdbapi.com/?i=${imdb}&plot=full&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response) {
          setMovieDetails(jsonResponse);
          setLoading(false);
          onOpen();
          console.log(jsonResponse);
        } else {
          setLoading(false);
          console.log(jsonResponse);
        }
      });
  };

  const { Plot, Rated, Runtime, imdbRating, imdbVotes, Year } = movieDetails;

  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden" width="300px">
      <Image src={property.imageUrl} alt={property.imageAlt} height="450px" />

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

          <Button
            onClick={handleDetailFetch}
            isLoading={loading}
            loadingText="searching"
            variantColor="teal"
            variant="outline"
          >
            Details
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW={{ lg: "40%", md: "60%", base: "90%" }}>
              <ModalHeader>
                <Box>
                  <Flex>
                    <Text as="h1">
                      {property.title}{" "}
                      <Badge px="2" variant="subtle">
                        Rated : {Rated}
                      </Badge>
                    </Text>
                  </Flex>

                  <Box d="flex" mt="2" alignItems="center">
                    {Array(10)
                      .fill("")
                      .map((_, i) => (
                        <Icon
                          name="star"
                          size="11px" 
                          key={i}
                          color={i < imdbRating ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {imdbVotes} reviews
                    </Box>
                  </Box>
                </Box>
              </ModalHeader>

              <ModalCloseButton />

              <Image
                src={property.imageUrl}
                alt={property.imageAlt}
                objectFit="contain"
                my="1rem"
                maxH={{ md: "450px", base: "300px" }}
              />
              <ModalBody
                margin="1.5rem"
                overflowY="auto"
                maxH={{ md: "600px", base: "250px" }}
              >
                {Plot} <br /><br />
                Published: {Year}, Duration : {Runtime}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </Box>
  );
};

export default Movie;
