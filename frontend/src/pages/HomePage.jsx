
import {
  ChakraProvider,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  extendTheme,
} from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f5e6ff',
      100: '#e1b3ff',
      200: '#cd80ff',
      300: '#b94dff',
      400: '#a51aff',
      500: '#8b00e6',
      600: '#6c00b4',
      700: '#4d0082',
      800: '#2e0050',
      900: '#0f001f',
    },
  },
});

export default function SwapVerseHomepage() {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="white">
        {/* Navigation */}
        <Box borderBottom="1px" borderColor="gray.100" py={4}>
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center">
              <HStack spacing={2}>
                <Box
                  w={10}
                  h={10}
                  borderRadius="full"
                  bg="brand.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white" fontWeight="bold" fontSize="lg">
                    S
                  </Text>
                </Box>
                <Text fontSize="xl" fontWeight="semibold" color="brand.500">
                  SwapVerse
                </Text>
              </HStack>

              <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
                <Text cursor="pointer" color="gray.600" _hover={{ color: 'brand.500' }}>
                  Home
                </Text>
                <Text cursor="pointer" color="gray.600" _hover={{ color: 'brand.500' }}>
                  Marketplace
                </Text>
                <Text cursor="pointer" color="gray.600" _hover={{ color: 'brand.500' }}>
                  About
                </Text>
                <Text cursor="pointer" color="gray.600" _hover={{ color: 'brand.500' }}>
                  Contact
                </Text>
              </HStack>

              <Button
                bg="brand.500"
                color="white"
                size="md"
                borderRadius="lg"
                _hover={{ bg: 'brand.600' }}
                px={8}
              >
                Sign In
              </Button>
            </Flex>
          </Container>
        </Box>

        {/* Hero Section */}
        <Container maxW="container.xl" py={20}>
          <VStack spacing={8} textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              bgGradient="linear(to-r, brand.500, purple.400)"
              bgClip="text"
            >
              Share, Trade, and Discover
            </Heading>

            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              maxW="2xl"
              lineHeight="tall"
            >
              A community-driven marketplace for students and individuals to donate, trade, and
              sell books and electronics. Build connections while sharing resources.
            </Text>

            <HStack spacing={4} pt={4}>
              <Button
                bg="brand.500"
                color="white"
                size="lg"
                borderRadius="lg"
                _hover={{ bg: 'brand.600', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                px={8}
              >
                Explore Marketplace
              </Button>
              <Button
                bg="purple.100"
                color="brand.500"
                size="lg"
                borderRadius="lg"
                _hover={{ bg: 'purple.200', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                px={8}
              >
                Get Started
              </Button>
            </HStack>
          </VStack>
        </Container>

        {/* How SwapVerse Works Section */}
        <Container maxW="container.xl" py={16}>
          <Heading
            as="h2"
            fontSize={{ base: '2xl', md: '3xl' }}
            textAlign="center"
            mb={12}
            color="gray.700"
          >
            How SwapVerse Works
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {/* Donate Card */}
            <Box
              bg="purple.100"
              borderRadius="2xl"
              p={8}
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            >
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="lg" color="brand.500">
                  Donate
                </Heading>
                <Text color="gray.700" lineHeight="tall">
                  Give away books and electronics you no longer need. Help others while decluttering
                  your space.
                </Text>
              </VStack>
            </Box>

            {/* Trade Card */}
            <Box
              bg="purple.100"
              borderRadius="2xl"
              p={8}
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            >
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="lg" color="brand.500">
                  Trade
                </Heading>
                <Text color="gray.700" lineHeight="tall">
                  Exchange items with other members. Get what you need while helping someone else.
                </Text>
              </VStack>
            </Box>

            {/* Sell Card */}
            <Box
              bg="purple.100"
              borderRadius="2xl"
              p={8}
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            >
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="lg" color="brand.500">
                  Sell
                </Heading>
                <Text color="gray.700" lineHeight="tall">
                  List items for sale and earn money. Set your own prices and connect with buyers.
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
