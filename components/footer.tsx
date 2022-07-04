import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden, Image
} from '@chakra-ui/react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import { default as NextLink } from 'next/link'


interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem1>;
  href?: string;
}

interface NavItem1 {
  label: string;
  subLabel?: string;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [

  {
    label: 'Thuis',
    href: "/"
  },
  {
    label: 'Mijn winkel',
    href: "winkel"
  },
  {
    label: 'Over Mij',
    href: "/over-mij"
  },

];



const Logo = (props: any) => {
  return (
    <NextLink href="/">
      <a>
        <Image
          borderRadius='full'
          boxSize='60px'
          src='./images/logo_lauren.jpeg'
          alt='Lauren van Hofwegen'
        />
      </a>
    </NextLink>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallCentered() {
  return (
    <Box
      bg={useColorModeValue('pink.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Logo />
        <Stack direction={'row'} spacing={6}>

          {NAV_ITEMS.map((item, index) => <Link key={index} href={item.href}>{item.label}</Link>)}

        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© 2022 Ampolo Design All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'FaTiktok'} href={'#'}>
              <FaTiktok />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}