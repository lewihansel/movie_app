import React from "react";
import { Link, Flex, Text, Image } from "@chakra-ui/core";

const Footer = (props) => {
  return (
    <Flex
      as="footer"
      align="center"
      justify={{ md: "flex-end", base: "center" }}
      wrap="wrap"
      padding="1.5rem"
      px={{ md: "6rem", base: "0px" }}
      bg="teal.500"
      color="white"
      mt="10em"
      {...props}
    >
      <Flex>
        <Text mr="0.5em">Movie content from :</Text>
        <Link href="https://www.themoviedb.org/" target="_blank">
          <Image
            height="30px"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="TMDB official logo"
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
