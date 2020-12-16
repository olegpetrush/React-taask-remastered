const data = [
  {
    id: 'gogo',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.jobmarket',
    to: '/app/market',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.create_task',
        to: '/app/market/newtask',
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.myjobs',
        to: '/app/market/myjobs',
      }
    ],
  },
  {
    id: 'profilemenu',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.myprofile',
    to: '/app/profile',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.myprofile.edit',
        to: '/app/profile/edit',
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.myprofile.notifications',
        to: '/app/profile/notifications',
      }
    ],
  },
];
export default data;
