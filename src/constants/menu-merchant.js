const data = [
  {
    id: 'dashboard',
    icon: 'simple-icon-speedometer',
    label: 'menu.dashboard',
    to: '/app/dashboard',
  },
  {
    id: 'gogo',
    icon: 'simple-icon-folder',
    label: 'menu.jobmarket',
    to: '/app/market',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.searchjobs',
        to: '/app/market/search',
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
    icon: 'simple-icon-user',
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
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.myprofile.myplan',
        to: '/app/profile/plan',
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.myprofile.activate',
        to: '/app/profile/activate',
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.myprofile.payments',
        to: '/app/profile/payments',
      },
    ],
  },
];
export default data;
