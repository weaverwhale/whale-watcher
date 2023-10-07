import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'Whale Watcher',
  description: 'Real-time advertising trends from 10,000+ Shopify stores.',
  version: '1.0.0',
  manifest_version: 3,
  icons: {
    '16': 'img/logo-16.png',
    '32': 'img/logo-32.png',
    '48': 'img/logo-60.png',
    '128': 'img/logo-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-128.png',
  },
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-32.png', 'img/logo-60.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  permissions: ['activeTab'],
})
