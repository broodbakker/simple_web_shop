import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  AspectRatio
} from '@chakra-ui/react';
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,

} from 'react-icons/io5';

import {
  FaHorseHead,
} from 'react-icons/fa';

import {
  MdDraw,
} from 'react-icons/md';

import {
  GiMountainClimbing,
} from 'react-icons/gi';


import { ReactElement } from 'react';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Container maxW={'5xl'} py={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>

          <Heading>Iets over mijzelf</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
            <Feature
              icon={
                <Icon as={MdDraw} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Knutselen'}
            />
            <Feature
              icon={<Icon as={FaHorseHead} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Paarden'}
            />
            <Feature
              icon={
                <Icon as={GiMountainClimbing} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Boulderen'}
            />
          </Stack>
        </Stack>
        <Flex>
          <AspectRatio w='560px' ratio={1}>
            <Image
              w="full"
              h="full"
              rounded={'md'}
              alt={'feature image'}
              src='https://res.cloudinary.com/dta9vptzh/image/upload/v1655718212/lauren/lauren2.jpg'
              objectFit={'cover'}
              maxH="50vh"
            />
          </AspectRatio>

        </Flex>
      </SimpleGrid>
    </Container>
  );
}