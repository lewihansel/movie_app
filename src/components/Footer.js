import React from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/core";
import { MdCopyright } from "react-icons/md";

const Footer = (props) => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      pl="6rem"
      bg="teal.500"
      color="white"
      mt="10em"
      {...props}
    >
      <Box >
        <Flex align="start">
          <Text as="p">
            Movie content taken from OMDB{" "}
          </Text>
          <Box as={MdCopyright} size="12px" color="white" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Footer;
