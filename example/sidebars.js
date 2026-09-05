/**
 * Two sidebars, each reachable from its own navbar entry. That gives the built site two
 * documentation *sections*, which is the level only Docusaurus has -- and what makes
 * `--scope section` produce a separate manual per section.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
module.exports = {
  docs: [
    'intro',
    'install',
    { type: 'category', label: 'Guides', items: ['guides/configuration', 'guides/deployment'] },
  ],
  api: [
    { type: 'category', label: 'Reference', items: ['reference/cli', 'reference/api'] },
  ],
};
