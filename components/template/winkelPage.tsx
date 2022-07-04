//components
import { useState, useEffect, SyntheticEvent } from "react"
import { Navbar } from "../navbar"
import Footer from "../footer"
import { Products } from "../products"
import { Pagination } from "../pagination"
import { useRouter } from 'next/router'
import { Layout } from "../layout"
//style
import {
  Image, HStack, Heading, Text, Grid, GridItem, SimpleGrid, Box, AspectRatio
} from '@chakra-ui/react';

import { IoHome } from "react-icons/io5";
import { IProductCart } from "../../typescript"
import { getProductsByCategory } from "../../util/function"

import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";

interface IWinkel {
}



const options = [
  {
    label: "paarden",
    value: "paarden",
  },
  {
    label: "stallen",
    value: "stallen",
  },
  {
    label: "dekjes",
    value: "dekjes",
  }
]

interface Ie {
  label: string
  value: string
}


interface IWinkelPage {
  products: IProductCart[]
  category: string
}


const WinkelPage = ({ products, category }: IWinkelPage) => {
  const router = useRouter()



  const handleChange = (e: any) => {
    router.push(`/w/${e.value}`)

  }
  return (

    <Layout>
      <>
        <Box alignItems="center">
          <Box pt="10rem" w="sm">
            <Select
              defaultValue={{ label: category, value: category }}
              selectedOptionColor="purple"
              options={options}
              onChange={handleChange}
            />
          </Box>
        </Box>


        <Box mb="8">
          <Pagination products={products} />
        </Box>

        <Main />

      </>
    </Layout>
  )

}

const Main = () => {
  return (
    <Box />
  )
}




export default WinkelPage