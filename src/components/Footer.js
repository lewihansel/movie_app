import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import { MdCopyright } from "react-icons/md";

const Footer = (props) => {
  return (
    <Flex
      as="footer"
      align="center"
      justify={{ md: "space-between", base: "center" }}
      wrap="wrap"
      padding="1.5rem"
      pl={{ md: "6rem", base: "0px" }}
      bg="teal.500"
      color="white"
      mt="10em"
      {...props}
    >
      <Box>
        <Flex align="start">
          <Text as="p">Movie content taken from OMDB</Text>
          <Box as={MdCopyright} size="12px" color="white" />
          <Text as="p"> API</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Footer;
