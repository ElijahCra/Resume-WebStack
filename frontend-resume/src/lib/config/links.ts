import {
  SiGithub,
  SiInstagram,
} from '@icons-pack/svelte-simple-icons';
import type { Component } from 'svelte';

interface Link {
  title: string;
  href: string;
  icon: Component;
}

export const links: Link[] = [
  {
    title: 'GitHub',
    href: 'https://github.com/your-username',
    icon: SiGithub,
  },
  {
    title: 'Instagram',
    href: 'https://instagram.com/your-username',
    icon: SiInstagram,
  },
];