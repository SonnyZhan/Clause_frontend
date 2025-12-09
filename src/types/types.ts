export interface User {
  id: string;
  email: string;
  password?: string;
  role: 'tenant' | 'clinic';
  name: string;
  phone?: string;
  organization?: string;
  created_at: string;
  avatar?: string;
}

export interface Clinic {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  logo: string;
}

export interface Document {
  id: string;
  name: string;
  type: string; // MIME type
  size: number;
  uploadedAt: string;
  url: string;
}

export interface Violation {
  id: string;
  title: string;
  description: string;
  statute: string;
  severity: 'high' | 'medium' | 'low';
  damages: number;
}

export interface Analysis {
  summary: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  violations: Violation[];
}

export interface Case {
  id: string;
  title: string;
  status: 'analyzing' | 'complete' | 'sent_to_clinic' | 'awaiting_clinic_response' | 'accepted_by_clinic' | 'pending_acceptance' | 'document_review' | 'demand_letter_sent' | 'negotiation' | 'settled' | 'court' | 'dismissed' | 'resolved';
  tenantId: string;
  tenantName?: string;
  clinicId?: string;
  createdAt: string;
  updatedAt?: string;
  type: string; // e.g., 'Security Deposit', 'Habitability'
  progress?: number; // 0-100
  estimatedDamages?: number;
  violationCount?: number;
  matchScore?: number;
  matchReason?: string;
  urgency?: 'critical' | 'high' | 'medium' | 'low';
  summary?: string;
  documents: Document[];
  analysis?: Analysis;
  stage?: string;
  nextAction?: string;
  nextActionDate?: string;
  settlementAmount?: number;
  settlementDate?: string;
}

export interface Message {
  id: string;
  caseId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: Document[];
}
