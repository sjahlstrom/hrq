import { Menu } from '@/types/menu'

const menuData: Menu[] = [
   {
      id: 1,
      title: 'Home',
      path: '/',
      newTab: false,
   },
   {
      id: 2,
      title: 'About',
      path: '/about',
      newTab: false,
   },
   // {
   //    id: 3,
   //    title: 'Services',
   //    path: '/services',
   //    newTab: false,
   // },
   {
      id: 4,
      title: 'Price',
      path: '/price',
      newTab: false,
   },
   {
      id: 5,
      title: 'Test',
      path: '/test',
      newTab: false,
   },
   {
      id: 8,
      title: 'Features',
      path: '/features',
      newTab: false,
   },
   {
      id: 9,
      title: 'Contact',
      path: '/contact',
      newTab: false,
   },
   {
      id: 10,
      title: 'More',
      newTab: false,
      submenu: [
         {
            id: 100,
            title: 'Blog',
            path: '/blog',
            newTab: false,
         },
         {
            id: 101,
            title: 'FAQs',
            path: '/faq',
            newTab: false,
         },
         {
            id: 102,
            title: 'Services',
            path: '/services',
            newTab: false,
         },
         {
            id: 103,
            title: 'Testimonials',
            path: '/testimonials',
            newTab: false,
         },
         {
            id: 104,
            title: 'Terms of Service',
            path: '/tos',
            newTab: false,
         },
      ],
   },

]
export default menuData
