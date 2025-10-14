import { VictimCase, NGO, DistrictMetrics, StateMetrics } from '@/types';

// Initialize or get cases from localStorage
export const getCases = (): VictimCase[] => {
  const stored = localStorage.getItem('justicelink-cases');
  if (stored) return JSON.parse(stored);
  
  const initialCases: VictimCase[] = [
    {
      id: 'JL-MH-2025-001',
      caseNumber: 'FIR/2025/MUM/001',
      name: 'Rajesh Kumar',
      district: 'Mumbai',
      state: 'Maharashtra',
      status: 'verified',
      filingDate: '2025-01-05',
      lastUpdated: '2025-01-10',
      amount: 50000,
      category: 'SC',
      documents: [
        { id: 'd1', type: 'fir', name: 'FIR_001.pdf', uploadDate: '2025-01-05', status: 'verified' },
        { id: 'd2', type: 'caste-certificate', name: 'Caste_Cert.pdf', uploadDate: '2025-01-05', status: 'verified' },
      ],
      timeline: [
        { stage: 'FIR Registration', status: 'completed', date: '2025-01-05' },
        { stage: 'Document Upload', status: 'completed', date: '2025-01-05' },
        { stage: 'Verification', status: 'completed', date: '2025-01-10' },
        { stage: 'Sanction', status: 'in-progress' },
        { stage: 'DBT Transfer', status: 'pending' },
      ],
    },
    {
      id: 'JL-TN-2025-002',
      caseNumber: 'FIR/2025/CHN/002',
      name: 'Priya Sharma',
      district: 'Chennai',
      state: 'Tamil Nadu',
      status: 'pending',
      filingDate: '2025-01-12',
      lastUpdated: '2025-01-12',
      amount: 75000,
      category: 'ST',
      documents: [
        { id: 'd3', type: 'fir', name: 'FIR_002.pdf', uploadDate: '2025-01-12', status: 'uploaded' },
      ],
      timeline: [
        { stage: 'FIR Registration', status: 'completed', date: '2025-01-12' },
        { stage: 'Document Upload', status: 'completed', date: '2025-01-12' },
        { stage: 'Verification', status: 'in-progress' },
        { stage: 'Sanction', status: 'pending' },
        { stage: 'DBT Transfer', status: 'pending' },
      ],
    },
  ];
  
  saveCases(initialCases);
  return initialCases;
};

export const saveCases = (cases: VictimCase[]) => {
  localStorage.setItem('justicelink-cases', JSON.stringify(cases));
};

export const addCase = (newCase: VictimCase) => {
  const cases = getCases();
  cases.push(newCase);
  saveCases(cases);
};

export const updateCase = (id: string, updates: Partial<VictimCase>) => {
  const cases = getCases();
  const index = cases.findIndex(c => c.id === id);
  if (index !== -1) {
    cases[index] = { ...cases[index], ...updates, lastUpdated: new Date().toISOString().split('T')[0] };
    saveCases(cases);
  }
};

export const mockNGOs: NGO[] = [
  {
    id: 'NGO-001',
    name: 'Justice for All Foundation',
    registrationNumber: 'NGO/MH/2020/001',
    district: 'Mumbai',
    state: 'Maharashtra',
    contactPerson: 'Dr. Anil Desai',
    email: 'anil@justiceforall.org',
    phone: '+91 98765 43210',
    status: 'active',
    reputationScore: 4.8,
    casesHandled: 124,
  },
  {
    id: 'NGO-002',
    name: 'Tamil Nadu Rights Collective',
    registrationNumber: 'NGO/TN/2019/015',
    district: 'Chennai',
    state: 'Tamil Nadu',
    contactPerson: 'Ms. Lakshmi Iyer',
    email: 'lakshmi@tnrights.org',
    phone: '+91 98765 11111',
    status: 'active',
    reputationScore: 4.6,
    casesHandled: 89,
  },
];

export const getDistrictMetrics = (): DistrictMetrics[] => {
  const cases = getCases();
  const districts: District[] = ['Mumbai', 'Pune', 'Chennai', 'Bhopal', 'Indore', 'Coimbatore'];
  
  return districts.map(district => {
    const districtCases = cases.filter(c => c.district === district);
    const state = district === 'Mumbai' || district === 'Pune' ? 'Maharashtra' : 
                  district === 'Chennai' || district === 'Coimbatore' ? 'Tamil Nadu' : 'Madhya Pradesh';
    
    return {
      district,
      state,
      totalCases: districtCases.length,
      pending: districtCases.filter(c => c.status === 'pending').length,
      verified: districtCases.filter(c => c.status === 'verified').length,
      sanctioned: districtCases.filter(c => c.status === 'sanctioned').length,
      disbursed: districtCases.filter(c => c.status === 'disbursed').length,
      rejected: districtCases.filter(c => c.status === 'rejected').length,
      avgProcessingDays: Math.floor(Math.random() * 15) + 5,
      slaCompliance: Math.floor(Math.random() * 30) + 70,
      fundsUtilized: Math.floor(Math.random() * 5000000) + 1000000,
      fundsAllocated: 10000000,
    };
  });
};

export const getStateMetrics = (): StateMetrics[] => {
  const districtMetrics = getDistrictMetrics();
  const states: State[] = ['Maharashtra', 'Tamil Nadu', 'Madhya Pradesh'];
  
  return states.map(state => {
    const stateDistricts = districtMetrics.filter(d => d.state === state);
    const totalCases = stateDistricts.reduce((sum, d) => sum + d.totalCases, 0);
    const totalFundsAllocated = stateDistricts.reduce((sum, d) => sum + d.fundsAllocated, 0);
    const totalFundsDisbursed = stateDistricts.reduce((sum, d) => sum + d.fundsUtilized, 0);
    
    return {
      state,
      totalCases,
      totalFundsAllocated,
      totalFundsDisbursed,
      avgDelayDays: Math.floor(Math.random() * 10) + 3,
      slaCompliance: Math.floor(Math.random() * 20) + 75,
      districts: stateDistricts,
    };
  });
};

type District = 'Mumbai' | 'Pune' | 'Chennai' | 'Bhopal' | 'Indore' | 'Coimbatore';
type State = 'Maharashtra' | 'Tamil Nadu' | 'Madhya Pradesh';
