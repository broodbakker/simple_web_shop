import { default as NextLink } from 'next/link'
//components
import { CartModal } from "./cartModal"
import { TextAnimation } from "./animation/textAnimation"
//hooks
import { useAuth } from "../util/hooks/useAuth"
//typescript
import { IAuthContext } from "../typescript"
//style
import {
  Box,
  Flex,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack, Text,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  Center, Image, Heading, HStack
} from '@chakra-ui/react';

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';

import { IoHome } from "react-icons/io5";

import { ImGift } from "react-icons/im";


export const Navbar = () => {
  const auth = useAuth();

  return (<NavbarView auth={auth} />)
}


const NEWSBAR_LINES = ["this is 1", "and 2", "3", "and last 4"];

interface INavbarView {
  auth: IAuthContext
}
export const NavbarView = ({ auth }: INavbarView) => {
  const {
    authReady,
    user,
    login,
    logout,
  } = auth;

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box pos="fixed" w="full" zIndex="2">

      <Center bg='purple.500' color='white'>
        <TextAnimation lines={NEWSBAR_LINES}></TextAnimation>
      </Center>

      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        pos="relative">
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>

          <NextLink href="/">
            <a>

              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                colorScheme="purple"
                variant='ghost'>
                <HStack>
                  {/* <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                cursor="pointer"
                color={useColorModeValue('gray.800', 'white')}>
                Lauren schleich
              </Text> */}

                  <Image
                    borderRadius='full'
                    boxSize='40px'
                    src='./images/logo_lauren.jpeg'
                    alt='Dan Abramov'
                  />
                  <Heading as='h6' size='xs'>Laus Schleich </Heading>
                </HStack>
              </Button>
            </a>
          </NextLink>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>

          <CartModal />
          {/* {authReady &&
            <>
              {!user && <>
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}

                  onClick={login}
                  href={'#'}>
                  Log In
                </Button>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  onClick={login}
                  _hover={{
                    bg: 'pink.300',
                  }}>
                  Sign Up
                </Button>
              </>}
              {user &&
                <>
                  <NextLink href="/admin">
                    <a>
                      <Button
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'pink.400'}
                        _hover={{
                          bg: 'pink.300',
                        }}>
                        add Products
                      </Button>
                    </a>
                  </NextLink>

                  <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'pink.400'}
                    onClick={logout}
                    _hover={{
                      bg: 'pink.300',
                    }}>
                    log out
                  </Button>
                </>
              }

            </>
          } */}


        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>

              {navItem.href ?
                <NextLink href={navItem.href}>
                  <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    colorScheme="pink"
                    leftIcon={<IoHome />}
                    variant='ghost'>
                    {navItem.label}
                  </Button>

                </NextLink> :
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant='ghost'
                  leftIcon={<ImGift />}
                  cursor="pointer"

                >
                  {navItem.label}
                </Button>



              }

            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem1) => {
  return (
    <NextLink href={href}>
      <Link
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
        borderBottom='1px' borderColor='gray.200'
      >

        <Button
          fontSize={'sm'}
          fontWeight={600}
          colorScheme="pink"
          leftIcon={<IoHome />}
          variant='ghost'>
          <HStack>

            <Text
              fontWeight={600}
              color={useColorModeValue('gray.600', 'gray.200')}>
              {label}
            </Text>
          </HStack>
        </Button>

        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

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
    children: [
      {
        label: 'Paarden',
        subLabel: 'Alle paarden',
        href: '/w/paarden',
      },
      {
        label: 'Dekjes',
        subLabel: 'Alle dekjes',
        href: '/w/dekjes',
      },
      {
        label: 'pony',
        subLabel: 'Alle sprongen',
        href: '/w/stallen',
      },

    ],
  },
  {
    label: 'Over Mij',
    href: "/over-mij"
  },

];

