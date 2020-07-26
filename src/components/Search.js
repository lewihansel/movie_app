import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Button,
} from "@chakra-ui/core";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  //   const resetInputField = () => {
  //     setSearchValue("");
  //   };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    // resetInputField();
  };

  return (
    <Flex align="center" justify="center" my="2rem">

        <Input
          id="searchmov"
          placeholder="spiderman"
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
          focusBorderColor="teal.400"
        />
        <Button
          variantColor="teal"
          variant="solid"
          onClick={callSearchFunction}
          type="submit"
          mx="0.5rem"
          px="2rem"
        >
          Find Movie!
        </Button>

    </Flex>
  );
};

export default Search;
