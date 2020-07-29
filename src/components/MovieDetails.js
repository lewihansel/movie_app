import React, { useState } from "react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Flex,
  Text,
  Badge,
  Icon,
  Image,
  Button,
} from "@chakra-ui/core";

const MovieDetails = ({ imdb, imageAlt, imageUrl }) => {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Plot, Rated, Runtime, imdbRating, imdbVotes, Year, Title } = movieDetails;
  return (
    <>
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
                  {Title}{" "}
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
            src={imageUrl}
            alt={imageAlt}
            objectFit="contain"
            my="1rem"
            maxH={{ md: "450px", base: "300px" }}
          />
          <ModalBody
            margin="1.5rem"
            overflowY="auto"
            maxH={{ md: "600px", base: "250px" }}
          >
            {Plot} <br />
            <br />
            Published: {Year}, Duration : {Runtime}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MovieDetails;
