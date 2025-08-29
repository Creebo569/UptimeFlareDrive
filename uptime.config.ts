import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "lyc8503's Status Page",
  links: [
    { link: 'https://github.com/lyc8503', label: 'GitHub' },
    { link: 'https://blog.lyc8503.net/', label: 'Blog' },
    { link: 'mailto:me@lyc8503.net', label: 'Email Me', highlight: true },
  ],
  group: {
    '🌐 Public': ['main_site', 'api_health'],
  },
}

const workerConfig: WorkerConfig = {
  kvWriteCooldownMinutes: 3,
  // passwordProtection: 'username:password',
  monitors: [
    {
      id: 'main_site',
      name: 'Main Website',
      method: 'GET',
      target: 'https://dopamine-dev.com',
      expectedCodes: [200],
    },
    {
      id: 'api_health',
      name: 'API Health',
      method: 'GET',
      target: 'https://dopamine-dev.com/health',
      expectedCodes: [200],
    },
  ],
  notification: {
    timeZone: 'Europe/London',
    gracePeriod: 5,
    skipNotificationIds: [],
  },
  callbacks: {
    onStatusChange: async () => {},
    onIncident: async () => {},
  },
}

const maintenances: MaintenanceConfig[] = []

export { pageConfig, workerConfig, maintenances }
