import React from "react";
import { Heading, Flex } from "@chakra-ui/core";
import Search from "./Search";

const Hero = (props) => {
  return (
    <Flex justify="center" align="center" my="5rem" flexDir="column">
      <Flex maxW="30rem" mx="2.5rem">
        <Heading color="gray.500">Find all information about your next movie watchlist!</Heading>
      </Flex>
      <Flex maxW="30rem">
        <Search search={props.search} />
      </Flex>
    </Flex>
  );
};

export default Hero;
