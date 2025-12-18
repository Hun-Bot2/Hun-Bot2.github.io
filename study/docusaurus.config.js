// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const remarkMath = require('remark-math').default || require('remark-math');
const rehypeKatex = require('rehype-katex').default || require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hunbot Study',
  tagline: 'Deep Learning · Machine Learning · Robotics Archive',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://hun-bot2.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/study/',

  // GitHub pages deployment config
  organizationName: 'Hun-Bot2',
  projectName: 'Hun-Bot2.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
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
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Hunbot Study',
        logo: {
          alt: 'Hunbot HB Logo',
          src: 'img/brand/HBo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mainSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/Hun-Bot2/Hun-Bot2.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Portfolio',
                href: 'https://hun-bot2.github.io',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Hun-Bot2',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Hunbot. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'python', 'javascript', 'typescript', 'json', 'yaml'],
      },
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
      },
    }),
  
  themes: ['@docusaurus/theme-mermaid'],
};

module.exports = config;
