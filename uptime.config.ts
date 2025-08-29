import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "lyc8503's Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://github.com/lyc8503', label: 'GitHub' },
    { link: 'https://blog.lyc8503.net/', label: 'Blog' },
    { link: 'mailto:me@lyc8503.net', label: 'Email Me', highlight: true },
  ],
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  group: {
    '🌐 Public': ['main_site', 'api_health'],
  },
}

const workerConfig: WorkerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    {
      id: "main_site",
      name: "Main Website",
      method: "GET",
      target: "https://dopamine-dev.com",
      interval: 60,
      expectedCodes: [200],
    },
    {
      id: "api_health",
      name: "API Health",
      method: "GET",
      target: "https://dopamine-dev.com/health",
      interval: 60,
      expectedCodes: [200],
    },
  ],
notification: {
  timeZone: 'Europe/London',
  gracePeriod: 5,
  skipNotificationIds: [],
},
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // Called when there's a status change
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // Called EVERY 1 MINUTE if there's an on-going incident
    },
  },
}

// You can define multiple maintenances here
const maintenances: MaintenanceConfig[] = [
  {
    monitors: ['main_site', 'api_health'],
    title: 'Test Maintenance',
    body: 'This is a test maintenance, server software upgrade',
    start: '2025-04-27T00:00:00+08:00',
    end: '2025-04-30T00:00:00+08:00',
    color: 'blue',
  },
]

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }
