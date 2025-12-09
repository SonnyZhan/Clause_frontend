import * as Icons from "../icons";

export const TENANT_NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "My Dashboard",
        icon: Icons.HomeIcon,
        url: "/tenant/dashboard",
        items: [],
      },
      {
        title: "Upload New Lease",
        icon: Icons.UploadIcon,
        url: "/tenant/upload",
        items: [],
      },
      {
        title: "My Cases",
        icon: Icons.CasesIcon,
        url: "/tenant/cases",
        items: [],
      },
      {
        title: "Messages",
        icon: Icons.ChatIcon,
        url: "/tenant/messages",
        items: [],
      },
    ],
  },
  {
    label: "SUPPORT",
    items: [
      {
        title: "Settings",
        icon: Icons.SecurityIcon,
        url: "/tenant/settings",
        items: [],
      },
      {
        title: "Help & FAQ",
        icon: Icons.HelpIcon,
        url: "/help",
        items: [],
      },
    ],
  },
];

export const CLINIC_NAV_DATA = [
  {
    label: "CLINIC WORKSPACE",
    items: [
      {
        title: "Clinic Dashboard",
        icon: Icons.HomeIcon,
        url: "/clinic/dashboard",
        items: [],
      },
      {
        title: "Incoming Cases",
        icon: Icons.DownloadIcon,
        url: "/clinic/incoming",
        items: [],
      },
      {
        title: "Upload Case",
        icon: Icons.UploadIcon,
        url: "/clinic/upload",
        items: [],
      },
      {
        title: "Active Cases",
        icon: Icons.CasesIcon,
        url: "/clinic/active",
        items: [],
      },
      {
        title: "Messages",
        icon: Icons.ChatIcon,
        url: "/clinic/messages",
        items: [],
      },
      {
        title: "Analytics",
        icon: Icons.PieChart, // Changed from PieChartIcon to PieChart
        url: "/clinic/analytics",
        items: [],
      },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        title: "Team",
        icon: Icons.GroupIcon,
        url: "/clinic/team",
        items: [],
      },
      {
        title: "Settings",
        icon: Icons.SecurityIcon,
        url: "/clinic/settings",
        items: [],
      },
    ],
  },
];

export const NAV_DATA = TENANT_NAV_DATA; // Default fallback
