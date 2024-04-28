import { Stack, HStack, Link, Divider, Image, IconButton, LinkProps } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const links = ['Blog','Sign up', 'About us', 'Privacy policy'];
const accounts = [
  {
    url: 'https://github.com/hnc203204/blog-website',
    label: 'Github Account',
    type: 'gray',
    icon: <FaGithub />
  },
  {
    url: 'https://twitter.com/?lang=vi',
    label: 'Twitter Account',
    type: 'twitter',
    icon: <FaTwitter />
  },
  {
    url: 'https://www.linkedin.com/',
    label: 'LinkedIn Account',
    type: 'linkedin',
    icon: <FaLinkedin />
  }
];

const Footer = () => {
  return (
    <Stack
      maxW="5xl"
      marginInline="auto"
      p={8}
      spacing={{ base: 8, md: 0 }}
      justifyContent="space-between"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
    >
      <Link href="/" isExternal>
        <Image w="100px" src="logo.png" alt="footerlogo" />
      </Link>

      {/* Desktop Screen */}
      <HStack spacing={4} alignItems="center" d={{ base: 'none', md: 'flex' }}>
        {links.map((link, index) => (
          <CustomLink key={index}>{link}</CustomLink>
        ))}
      </HStack>

      {/* Mobile and Tablet Screens */}
      <Stack d={{ base: 'flex', md: 'none' }} alignItems="center">
        <HStack alignItems="center">
          <CustomLink>Sign up</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink>Blog</CustomLink>
          <Divider h="1rem" orientation="vertical" />
        </HStack>
      </Stack>

      <Stack direction="row" spacing={5} pt={{ base: 4, md: 0 }} alignItems="center">
        {accounts.map((sc, index) => (
          <IconButton
            key={index}
            as={Link}
            isExternal
            href={sc.url}
            aria-label={sc.label}
            colorScheme={sc.type}
            icon={sc.icon}
            rounded="md"
          />
        ))}
      </Stack>
    </Stack>
  );
};

const CustomLink = ({ children, ...props }) => {
  return (
    <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
      {children}
    </Link>
  );
};

export default Footer;