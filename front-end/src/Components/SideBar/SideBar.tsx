import React from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  FlexProps,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiEdit3,
  FiBell,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {Link} from 'react-router-dom'

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/'},
  { name: 'Trending', icon: FiTrendingUp, path: '/Trending'},
  { name: 'Explore', icon: FiCompass, path: '/AboutUs' },
  { name: 'Write', icon: FiEdit3, path: '/write' },
  { name: 'Notification', icon: FiBell, path: '/Notification' },
];

export default function Sidebar() {
  return (
    <Box minH="100vh" w = "240px" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent/>
    </Box>
  );
}

const SidebarContent = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
           Slay-Tech
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path} >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string
}
const NavItem = ({ icon, children,path,  ...rest }: NavItemProps) => {
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
      </Link>
  );
};
