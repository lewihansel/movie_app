import React, { useState } from "react";
import { Input, Flex, Button } from "@chakra-ui/core";

const Search = ({search, loading}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    search(searchValue); //this is the triger function for our movie list component
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      search(searchValue);
    }
  };

  return (
    <Flex align="center" justify="center" my="2rem">
      <Input
        id="searchmov"
        placeholder="search by title"
        value={searchValue}
        onChange={handleSearchInputChanges}
        onKeyPress={onKeyUp}
        type="text"
        focusBorderColor="teal.400"
        maxW={{ base: "10rem", sm: "30rem" }}
      />
      <Button
        variantColor="teal"
        variant="solid"
        onClick={callSearchFunction}
        isLoading={loading}
        loadingText="searching"
        type="submit"
        mx="0.5rem"
        px="2rem"
        minW="5rem"
        maxW="7rem"
      >
        Find Movie!
      </Button>
    </Flex>
  );
};

export default Search;
