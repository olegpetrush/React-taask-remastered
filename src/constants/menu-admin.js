const data = [
  {
    id: 'admin-market',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.jobmarket',
    to: '/app/admin/market',
  },
  {
    id: 'admin-users',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.admin.users',
    to: '/app/admin/users',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.admin.users.consumers',
        to: '/app/admin/users/consumers',
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.admin.users.merchants',
        to: '/app/admin/users/merchants',
      },
    ],
  },
  {
    id: 'admin-plans',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.admin.plans',
    to: '/app/admin/plans',
  },
  {
    id: 'admin-industries',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.admin.industries',
    to: '/app/admin/industries',
  },
  {
    id: 'admin-upgrades',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.admin.upgrades',
    to: '/app/admin/upgrades',
  },
  {
    id: 'admin-translations',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.admin.translations',
    to: '/app/admin/translations',
  },
];
export default data;
