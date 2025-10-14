export type UserRole = 'victim' | 'ngo' | 'state-official' | 'central' | 'admin' | 'auditor';

export type CaseStatus = 'pending' | 'verified' | 'sanctioned' | 'disbursed' | 'rejected';

export type District = 'Mumbai' | 'Pune' | 'Chennai' | 'Bhopal' | 'Indore' | 'Coimbatore';

export type State = 'Maharashtra' | 'Tamil Nadu' | 'Madhya Pradesh';

export interface VictimCase {
  id: string;
  caseNumber: string;
  name: string;
  district: District;
  state: State;
  status: CaseStatus;
  filingDate: string;
  lastUpdated: string;
  amount?: number;
  category: 'SC' | 'ST' | 'OBC' | 'General';
  documents: Document[];
  timeline: TimelineEvent[];
  verificationNotes?: string;
  sanctionOrderNumber?: string;
  dbtTransactionId?: string;
}

export interface Document {
  id: string;
  type: 'fir' | 'caste-certificate' | 'income-proof' | 'bank-details' | 'supporting-doc';
  name: string;
  uploadDate: string;
  status: 'uploaded' | 'verified' | 'rejected';
}

export interface TimelineEvent {
  stage: string;
  status: 'completed' | 'in-progress' | 'pending';
  date?: string;
  notes?: string;
}

export interface NGO {
  id: string;
  name: string;
  registrationNumber: string;
  district: District;
  state: State;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending-approval';
  reputationScore: number;
  casesHandled: number;
}

export interface DistrictMetrics {
  district: District;
  state: State;
  totalCases: number;
  pending: number;
  verified: number;
  sanctioned: number;
  disbursed: number;
  rejected: number;
  avgProcessingDays: number;
  slaCompliance: number;
  fundsUtilized: number;
  fundsAllocated: number;
}

export interface StateMetrics {
  state: State;
  totalCases: number;
  totalFundsAllocated: number;
  totalFundsDisbursed: number;
  avgDelayDays: number;
  slaCompliance: number;
  districts: DistrictMetrics[];
}
