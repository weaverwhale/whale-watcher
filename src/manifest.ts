import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'Whale Watcher',
  description: 'Real-time advertising trends from 10,000+ Shopify stores.',
  version: '0.0.2',
  manifest_version: 3,
  icons: {
    '16': 'img/logo.png',
    '32': 'img/logo.png',
    '48': 'img/logo.png',
    '128': 'img/logo.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo.png',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo.png', 'img/logo.png', 'img/logo.png', 'img/logo.png'],
      matches: [],
    },
  ],
  permissions: ['activeTab'],
})
