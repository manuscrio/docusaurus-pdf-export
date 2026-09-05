// A deliberately small Docusaurus site, used to demonstrate a PDF export end to end.
// Two nested sidebar categories, so the exported manual has real structure to show.

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'Orbit',
  tagline: 'Telemetry for fleets that move',
  url: 'https://example.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/logo.svg',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Manuscrio reads this logo from the built markup and puts it on the manual's
      // cover and running header. No configuration needed on the Manuscrio side.
      navbar: {
        title: 'Orbit',
        logo: { alt: 'Orbit', src: 'img/logo.svg' },
        // Two documentation-bearing navbar entries make two sections. Only Docusaurus
        // describes this level in its built markup, so it is the only framework where
        // `manuscrio export --scope section` applies.
        items: [
          { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs' },
          { type: 'docSidebar', sidebarId: 'api', position: 'left', label: 'API' },
        ],
      },
      footer: { style: 'dark', copyright: 'Orbit — an example project.' },
    }),
};
