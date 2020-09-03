module.exports = {
  title: 'Reactjs Popup ',
  tagline: 'The tagline of my site',
  url: 'https://reactjs-popup.elazizi.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'yjose', // Usually your GitHub org/user name.
  projectName: 'reactjs-popup', // Usually your repo name.
  themeConfig: {
    //sidebarCollapsible: false,
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',
    },
    navbar: {
      title: 'Reactjs-popup',
      logo: {
        alt: 'reactjs-logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://github.com/yjose/reactjs-popup',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} reactjs-popup, Inc. Built with Docusaurus.`,
    },
    googleAnalytics: {
      trackingID: 'UA-127901499-1',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/yjose/reactjs-popup/edit/master/docs/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/yjose/reactjs-popup/edit/master/docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'weekly',
          priority: 0.5,
        },
      },
    ],
  ],
};
