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

const MovieDetails = ({ movie, imageAlt, imageUrl }) => {
  const [movieDetails, setMovieDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDetailFetch = () => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse) {
          setMovieDetails(jsonResponse);
          setLoading(false);
          onOpen();
        } else {
          setLoading(false);
          console.log(jsonResponse);
        }
      });
  };

  const {
    overview,
    status,
    runtime,
    vote_average,
    vote_count,
    release_date,
    title,
  } = movieDetails;
  return (
    <>
      <Button
        size="sm"
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
                  {title}{" "}
                  <Badge px="2" variant="subtle">
                    {status}
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
                      color={i < vote_average ? "teal.500" : "gray.300"}
                    />
                  ))}
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {vote_count} vote
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
            {overview} <br />
            <br />
            Published: {release_date}, Duration : {runtime} minutes
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MovieDetails;
