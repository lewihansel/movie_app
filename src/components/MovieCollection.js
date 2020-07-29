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
        <PopoverContent zIndex={4}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Yout movie collection!</PopoverHeader>
          <PopoverBody overflow="auto">
            <List styleType="disc">
              {collection.map((item) => (
                <ListItem key={item.id}>{item.title}</ListItem>
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
