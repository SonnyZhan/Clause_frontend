import { User, Case, Clinic, Message, Document, Analysis, Violation } from '@/types/types';

// Mock Users
export const MOCK_TENANT_USER: User = {
  id: 'tenant-001',
  email: 'tenant@demo.com',
  password: 'demo123',
  role: 'tenant',
  name: 'Sarah Chen',
  phone: '617-555-0123',
  created_at: '2024-01-15',
  avatar: 'https://i.pravatar.cc/150?u=tenant-001'
};

export const MOCK_CLINIC_USER: User = {
  id: 'clinic-001',
  email: 'clinic@demo.com',
  password: 'demo123',
  role: 'clinic',
  name: 'Boston Legal Aid Clinic',
  organization: 'Boston Legal Aid',
  phone: '617-555-0199',
  created_at: '2023-06-10',
  avatar: 'https://i.pravatar.cc/150?u=clinic-001'
};

// Mock Clinics
export const MOCK_CLINICS: Clinic[] = [
  {
    id: 'clinic-001',
    name: 'Boston Legal Aid Clinic',
    description: 'Specializing in tenant rights and housing discrimination cases in the Greater Boston area.',
    address: '123 Legal Way, Boston, MA 02110',
    phone: '617-555-0199',
    email: 'contact@bostonlegalaid.org',
    website: 'https://bostonlegalaid.org',
    rating: 4.8,
    reviewCount: 124,
    specialties: ['Security Deposit', 'Eviction Defense', 'Habitability'],
    logo: 'https://ui-avatars.com/api/?name=Boston+Legal+Aid&background=0D8ABC&color=fff'
  },
  {
    id: 'clinic-002',
    name: 'Cambridge Housing Clinic',
    description: 'Free legal assistance for low-income tenants in Cambridge and Somerville.',
    address: '456 University Ave, Cambridge, MA 02138',
    phone: '617-555-0200',
    email: 'help@cambridgehousing.org',
    website: 'https://cambridgehousing.org',
    rating: 4.6,
    reviewCount: 89,
    specialties: ['Rent Control', 'Lease Review', 'Habitability'],
    logo: 'https://ui-avatars.com/api/?name=Cambridge+Housing&background=D946EF&color=fff'
  }
];

// Mock Cases for Tenant
export const MOCK_TENANT_CASES: Case[] = [
  {
    id: 'case-001',
    title: 'Security Deposit Violation - 123 Main St',
    status: 'analyzing',
    tenantId: 'tenant-001',
    createdAt: '2024-05-10T10:00:00Z',
    updatedAt: '2024-05-10T10:05:00Z',
    type: 'Security Deposit',
    progress: 67,
    documents: [
      {
        id: 'doc-001',
        name: 'Lease_Agreement_2023.pdf',
        type: 'application/pdf',
        size: 2450000,
        uploadedAt: '2024-05-10T09:55:00Z',
        url: '/mock/lease.pdf'
      }
    ]
  },
  {
    id: 'case-002',
    title: 'Habitability Issues - 456 Oak Ave',
    status: 'complete',
    tenantId: 'tenant-001',
    createdAt: '2024-04-15T14:30:00Z',
    updatedAt: '2024-04-15T14:35:00Z',
    type: 'Habitability',
    estimatedDamages: 3450,
    violationCount: 4,
    analysis: {
      summary: 'Multiple serious violations found regarding heating and security deposit.',
      riskLevel: 'High',
      violations: [
        {
          id: 'v-001',
          title: 'Illegal Security Deposit Clause',
          description: 'Landlord requires 3 months rent as deposit, exceeding the 1 month limit.',
          statute: 'M.G.L. c. 186 §15B',
          severity: 'high',
          damages: 2400
        },
        {
          id: 'v-002',
          title: 'Missing Heat Provision',
          description: 'Lease does not guarantee heating during winter months.',
          statute: '105 CMR 410.000',
          severity: 'high',
          damages: 500
        },
        {
          id: 'v-003',
          title: 'Retaliatory Eviction Clause',
          description: 'Clause allowing eviction for reporting violations is illegal.',
          statute: 'M.G.L. c. 186 §18',
          severity: 'medium',
          damages: 300
        },
        {
          id: 'v-004',
          title: 'Improper Notice Requirement',
          description: 'Requires 60 days notice for non-renewal, law states 30 days.',
          statute: 'M.G.L. c. 186 §12',
          severity: 'low',
          damages: 250
        }
      ]
    },
    documents: [
      {
        id: 'doc-002',
        name: 'Lease_Oak_Ave.pdf',
        type: 'application/pdf',
        size: 1800000,
        uploadedAt: '2024-04-15T14:25:00Z',
        url: '/mock/lease_oak.pdf'
      }
    ]
  },
  {
    id: 'case-003',
    title: 'Illegal Rent Increase',
    status: 'awaiting_clinic_response',
    tenantId: 'tenant-001',
    clinicId: 'clinic-001',
    createdAt: '2024-03-20T09:15:00Z',
    updatedAt: '2024-03-21T11:00:00Z',
    type: 'Rent Dispute',
    estimatedDamages: 1200,
    matchScore: 94,
    documents: [
      {
        id: 'doc-003',
        name: 'Rent_Increase_Notice.pdf',
        type: 'application/pdf',
        size: 500000,
        uploadedAt: '2024-03-20T09:10:00Z',
        url: '/mock/notice.pdf'
      }
    ]
  },
  {
    id: 'case-004',
    title: 'Security Deposit Return',
    status: 'settled',
    tenantId: 'tenant-001',
    clinicId: 'clinic-001',
    createdAt: '2024-01-10T16:00:00Z',
    updatedAt: '2024-02-28T10:00:00Z',
    type: 'Security Deposit',
    estimatedDamages: 2100,
    settlementAmount: 2100,
    settlementDate: '2024-02-28',
    documents: [
      {
        id: 'doc-004',
        name: 'Settlement_Agreement.pdf',
        type: 'application/pdf',
        size: 1200000,
        uploadedAt: '2024-02-28T09:50:00Z',
        url: '/mock/settlement.pdf'
      }
    ]
  }
];

// Mock Incoming Cases for Clinic
export const MOCK_INCOMING_CASES: Case[] = [
  {
    id: 'case-inc-001',
    title: 'Mold and Water Damage',
    status: 'pending_acceptance',
    tenantId: 'tenant-002',
    tenantName: 'John Doe',
    createdAt: '2024-05-11T08:30:00Z',
    type: 'Habitability',
    estimatedDamages: 5000,
    violationCount: 3,
    matchScore: 92,
    matchReason: 'High win rate for habitability cases + Capacity available',
    urgency: 'high',
    summary: 'Tenant reports severe mold in bedroom and bathroom. Landlord unresponsive to multiple requests.',
    violations: ['Mold/Moisture Issues', 'Failure to Repair', 'Habitability Violation'],
    submissionDate: '2024-05-12T08:30:00Z',
    documents: []
  },
  {
    id: 'case-inc-002',
    title: 'Unlawful Eviction Notice',
    status: 'pending_acceptance',
    tenantId: 'tenant-003',
    tenantName: 'Emily Blunt',
    createdAt: '2024-05-11T10:15:00Z',
    type: 'Eviction',
    estimatedDamages: 0, // Injunction needed
    violationCount: 1,
    matchScore: 88,
    matchReason: 'Specializes in eviction defense',
    urgency: 'critical',
    summary: 'Received 14-day notice to quit without proper cause. Tenant is current on rent.',
    violations: ['Unlawful Eviction'],
    submissionDate: '2024-05-11T10:15:00Z',
    documents: []
  },
  {
    id: 'case-inc-003',
    title: 'Security Deposit Not Returned',
    status: 'pending_acceptance',
    tenantId: 'tenant-004',
    tenantName: 'Michael Scott',
    createdAt: '2024-05-10T15:45:00Z',
    type: 'Security Deposit',
    estimatedDamages: 1800,
    violationCount: 1,
    matchScore: 85,
    matchReason: 'Standard security deposit case',
    urgency: 'medium',
    summary: 'Moved out 45 days ago, landlord has not returned deposit or provided itemized list of deductions.',
    violations: ['Security Deposit Violation'],
    submissionDate: '2024-05-10T15:45:00Z',
    documents: []
  }
];

// Mock Active Cases for Clinic
export const MOCK_ACTIVE_CASES: Case[] = [
  {
    id: 'case-act-001',
    title: 'Heating Failure',
    status: 'document_review',
    tenantId: 'tenant-005',
    tenantName: 'Jim Halpert',
    clinicId: 'clinic-001',
    createdAt: '2024-05-01T09:00:00Z',
    updatedAt: '2024-05-02T11:00:00Z',
    type: 'Habitability',
    estimatedDamages: 1500,
    stage: 'Document Review',
    priority: 'high',
    lastUpdated: '2024-05-02T11:00:00Z',
    nextAction: 'Review evidence photos',
    nextActionDate: '2024-05-13',
    documents: [
      { id: 'doc-act-001', name: 'Lease.pdf', type: 'application/pdf', size: 1000000, uploadedAt: '2024-05-01', url: '#' },
      { id: 'doc-act-002', name: 'Photo_Heater.jpg', type: 'image/jpeg', size: 2000000, uploadedAt: '2024-05-02', url: '#' }
    ]
  },
  {
    id: 'case-act-002',
    title: 'Illegal Lease Clauses',
    status: 'demand_letter_sent',
    tenantId: 'tenant-006',
    tenantName: 'Pam Beesly',
    clinicId: 'clinic-001',
    createdAt: '2024-04-20T14:00:00Z',
    updatedAt: '2024-05-05T16:00:00Z',
    type: 'Lease Review',
    estimatedDamages: 800,
    stage: 'Demand Letter Sent',
    priority: 'medium',
    lastUpdated: '2024-05-05T16:00:00Z',
    nextAction: 'Follow up with landlord',
    nextActionDate: '2024-05-15',
    documents: []
  },
  {
    id: 'case-act-003',
    title: 'Rent Withholding',
    status: 'negotiation',
    tenantId: 'tenant-007',
    tenantName: 'Dwight Schrute',
    clinicId: 'clinic-001',
    createdAt: '2024-04-10T10:00:00Z',
    updatedAt: '2024-05-08T09:30:00Z',
    type: 'Rent Dispute',
    estimatedDamages: 2000,
    stage: 'Negotiation',
    priority: 'low',
    lastUpdated: '2024-05-08T09:30:00Z',
    nextAction: 'Review settlement offer',
    nextActionDate: '2024-05-12',
    documents: []
  }
];

// Mock Messages
export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-001',
    caseId: 'case-003',
    senderId: 'clinic-001',
    receiverId: 'tenant-001',
    content: 'Hello Sarah, we have reviewed your case and would like to help. Please upload the rent increase notice.',
    timestamp: '2024-03-21T10:00:00Z',
    read: true
  },
  {
    id: 'msg-002',
    caseId: 'case-003',
    senderId: 'tenant-001',
    receiverId: 'clinic-001',
    content: 'Hi, I have uploaded the notice. Let me know if you need anything else.',
    timestamp: '2024-03-21T10:15:00Z',
    read: true
  },
  {
    id: 'msg-003',
    caseId: 'case-003',
    senderId: 'clinic-001',
    receiverId: 'tenant-001',
    content: 'Thanks Sarah. We will review it and get back to you shortly.',
    timestamp: '2024-03-21T10:30:00Z',
    read: false
  }
];

// Mock Tenant Stats
export const MOCK_TENANT_STATS = {
  activeCases: 3,
  potentialRecovery: 6650,
  actionRequired: 1,
  resolvedCases: 1
};

// Mock Recent Cases for Tenant Dashboard
export const MOCK_RECENT_CASES = [
  {
    id: 'case-001',
    title: 'Security Deposit Violation - 123 Main St',
    status: 'In Progress',
    type: 'Security Deposit',
    estimatedDamages: 2500,
    lastUpdated: '2024-05-10T10:05:00Z'
  },
  {
    id: 'case-002',
    title: 'Habitability Issues - 456 Oak Ave',
    status: 'Complete',
    type: 'Conditions',
    estimatedDamages: 3450,
    lastUpdated: '2024-04-15T14:35:00Z'
  },
  {
    id: 'case-003',
    title: 'Illegal Rent Increase',
    status: 'Action Required',
    type: 'Rent Dispute',
    estimatedDamages: 700,
    lastUpdated: '2024-03-21T11:00:00Z'
  }
];

// Mock Clinic Stats
export const MOCK_CLINIC_STATS = {
  activeCases: 12,
  pendingRequests: 3,
  totalCases: 47,
  winRate: 89,
  totalRecovered: 127450,
  avgResolutionTime: 23,
  activeCaseload: 12,
  monthlyRevenue: 3240,
  casesByType: [
    { name: 'Security Deposit', value: 35 },
    { name: 'Habitability', value: 25 },
    { name: 'Illegal Clauses', value: 20 },
    { name: 'Retaliatory Eviction', value: 15 },
    { name: 'Other', value: 5 }
  ],
  revenueTrend: [
    { month: 'Jan', revenue: 2500 },
    { month: 'Feb', revenue: 2800 },
    { month: 'Mar', revenue: 3100 },
    { month: 'Apr', revenue: 2900 },
    { month: 'May', revenue: 3240 }
  ]
};
