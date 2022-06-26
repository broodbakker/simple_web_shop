import React, { useEffect, useState } from "react";
//typescript
import { IProductCart } from "../typescript"
import {
  Text,
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

interface IPagination {
  products: IProductCart[]
}

export const Pagination = ({ products }: IPagination) => {

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
    total: products.length,
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
                  bg: "purple.100"
                }}
                bg="purple.200"
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
                      bg: "purple.300"
                    }}
                    _current={{
                      bg: "purple.300",
                      fontSize: "sm",
                      w: 7
                    }}
                  />
                ))}
              </PaginationPageGroup>
              <PaginationNext
                _hover={{
                  bg: "purple.200"
                }}
                bg="purple.100"
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

