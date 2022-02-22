/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

    // But you can create a sidebar manually
    tutorialSidebar: [
        {
            type: 'doc',
            label: 'Getting started',
            id: 'introduction',
        },
        {
            type: 'doc',
            label: 'Quickstart',
            id: 'tutorials/basics/quickstart'
        },
        {
            type: 'category',
            label: 'Advanced Tutorial',
            collapsed: false,
            items: [
                'tutorials/advanced/bootstrap',
                'tutorials/advanced/app',
                'tutorials/advanced/screens',
                'tutorials/advanced/navigation',
                'tutorials/advanced/ui'
            ]
        },
        {
            label: 'Components',
            type: 'category',
            items: [
                'components/activity-indicator',
                'components/app',
                'components/icon',
                'components/image-background',
                'components/image',
                'components/modal',
                'components/pressable',
                'components/recyclable-list',
                'components/screen',
                'components/scrollview',
                'components/switch',
                'components/text-input',
                'components/text',
                'components/touchable-opacity',
                'components/view',
            ],
            collapsed: false,
        },
        {
            label: 'Guides',
            type: 'category',
            items: [
                'guides/focus-manager',
            ],
            collapsed: false,
        },
    ]
};

module.exports = sidebars;
