import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";

const otherPageChildMenus: NavItemType[] = [

  // {
  //   id: ncNanoId(),
  //   href: "/page-collection",
  //   name: "Collection page",
  // },
  // {
  //   id: ncNanoId(),
  //   href: "/page-search",
  //   name: "Explore",
  // },



  // {
  //   id: ncNanoId(),
  //   href: "/about",
  //   name: "Other Pages",
  //   type: "dropdown",
  //   children: [
  //     {
  //       id: ncNanoId(),
  //       href: "/about",
  //       name: "About",
  //     },
  //     {
  //       id: ncNanoId(),
  //       href: "/contact",
  //       name: "Contact us",
  //     },


  //   ],
  // },
  // {
  //   id: ncNanoId(),
  //   href: "/blog",
  //   name: "Blog Page",
  //   type: "dropdown",
  //   children: [
  //     {
  //       id: ncNanoId(),
  //       href: "/blog",
  //       name: "Blog Page",
  //     },
  //     {
  //       id: ncNanoId(),
  //       href: "/blog-single",
  //       name: "Blog Single",
  //     },
  //   ],
  // },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/page-search",
    name: "Explore",
    // type: "dropdown",
    // children: otherPageChildMenus,
  },
  // {
  //   id: ncNanoId(),
  //   href: "/about",
  //   name: "About",
  // },
];

export const NAVIGATION_DEMO_3: NavItemType[] = [
  ...NAVIGATION_DEMO_2,
  {
    id: ncNanoId(),
    href: "/list-NFT",
    name: "List Muisc",
  },

];
