import React from "react";
import {
  Flex,
  Button,
  List,
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  Image,
  Text,
  Box,
} from "@chakra-ui/core";

const MovieCollection = ({ collection }) => {
  let average_rating =
    Math.round(
      (collection.reduce((a, b) => {
        return a + b.vote_average;
      }, 0) /
        collection.length) *
        100
    ) / 100;

  return (
    <Flex as="span" justify="center" my="2rem">
      <Popover>
        <PopoverTrigger>
          <Button>My Collection</Button>
        </PopoverTrigger>
        <PopoverContent zIndex={4} width="1000px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Yout movie collection!</PopoverHeader>
          <PopoverBody overflow="auto">
            <List styleType="none">
              {collection.map((item) => (
                <ListItem key={item.id}>
                  <Flex alignItems="flex-start">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                      alt={`poster of a movie called "${item.title}"`}
                      objectFit="contain"
                      mb="1rem"
                      mt="0.5rem"
                      mr="0.5rem"
                      height={{ md: "200", base: "200px" }}
                    />
                    <Box>
                      <Text fontWeight="600">{item.title}</Text>
                      <Text>{item.release_date.slice(0, 4)}</Text>
                      <Text>{item.overview}</Text>
                    </Box>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </PopoverBody>
          <PopoverFooter>Average rating : {average_rating}</PopoverFooter>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default MovieCollection;
