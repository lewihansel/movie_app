import React from "react";
import { Heading, Flex } from "@chakra-ui/core";
import Search from "./Search";

const Hero = (props) => {
  return (
    <Flex justify="center" align="center" my="5rem" flexDir="column">
      <Flex maxW="30rem">
        <Heading>Find all information about your next movie watchlist!</Heading>
      </Flex>
      <Flex>
        <Search search={props.search} />
      </Flex>
    </Flex>
  );
};

export default Hero;
