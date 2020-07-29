import React from "react";
import { Box, Heading, Flex,} from "@chakra-ui/core";
import { GiFilmStrip } from "react-icons/gi";

const Header = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      pl="6rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Box
          as={GiFilmStrip}
          size={{ base: "40px", lg: "50px" }}
          color="white"
          mr=".5rem"
        />
        <Heading as="h1" size="lg">
          Brown's Movie Lookup
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Header;
