import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Grid,
  Center,
  Select,
  Text,
  Button,
  Stack,
  ChakraProvider
} from "@chakra-ui/react";
import {
  Pagination as Pag,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator
} from "@ajna/pagination";

import { Products } from "./products"

const fetchPokemons = async (
  pageSize: number,
  offset: number
): Promise<any> => {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
  ).then(async (res) => await res.json());
};

//typescript
import { IProductCart } from "../typescript"


interface IPagination {
  products: IProductCart[]
}


export const Pagination = ({ products }: IPagination) => {

  // states
  const [pokemonsTotal, setPokemonsTotal] = useState<number | undefined>(
    products.length
  );
  const [pokemons, setPokemons] = useState<any[]>(products);

  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize
  } = usePagination({
    total: pokemonsTotal,
    limits: {
      outer: outerLimit,
      inner: innerLimit
    },
    initialState: {
      pageSize: 5,
      isDisabled: false,
      currentPage: 1
    }
  });
  // effects

  useEffect(() => {
    // fetchPokemons(pageSize, offset)
    //   .then((pokemons) => {
    //     setPokemonsTotal(pokemons.count);
    //     setPokemons(pokemons.results);
    //   })
    //   .catch((error) => console.log("App =>", error));


  }, [currentPage, pageSize, offset]);

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };


  return (
    <ChakraProvider>
      <Stack>
        <Pag
          pagesCount={pagesCount}
          currentPage={currentPage}
          isDisabled={isDisabled}
          onPageChange={handlePageChange}
        >
          <>
            <Products products={products} />
            <PaginationContainer
              align="center"
              justify="center"
              p={4}
              w="full"
            >
              <PaginationPrevious
                _hover={{
                  bg: "pink.400"
                }}
                bg="pink.300"
                onClick={() =>
                  console.log(
                    "Im executing my own function along with Previous component functionality"
                  )
                }
              >
                <Text>Previous</Text>
              </PaginationPrevious>
              <PaginationPageGroup
                isInline
                align="center"
                separator={
                  <PaginationSeparator
                    onClick={() =>
                      console.log(
                        "Im executing my own function along with Separator component functionality"
                      )
                    }
                    bg="blue.300"
                    fontSize="sm"
                    w={7}
                    jumpSize={11}
                  />
                }
              >
                {pages.map((page: number) => (
                  <PaginationPage
                    w={7}
                    color="white"
                    bg="red.300"
                    key={`pagination_page_${page}`}
                    page={page}
                    onClick={() =>
                      console.log(
                        "Im executing my own function along with Page component functionality"
                      )
                    }
                    fontSize="sm"
                    _hover={{
                      bg: "pink.300"
                    }}
                    _current={{
                      bg: "pink.300",
                      fontSize: "sm",
                      w: 7
                    }}
                  />
                ))}
              </PaginationPageGroup>
              <PaginationNext
                _hover={{
                  bg: "pink.400"
                }}
                bg="pink.300"
                onClick={() =>
                  console.log(
                    "Im executing my own function along with Next component functionality"
                  )
                }
              >
                <Text>Next</Text>
              </PaginationNext>
            </PaginationContainer>
          </>
        </Pag>


      </Stack>
    </ChakraProvider>
  );
};

