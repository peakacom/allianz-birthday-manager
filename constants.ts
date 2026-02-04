import { Customer } from './types';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Sarah Miller',
    policyNumber: 'ALZ-98231-A',
    age: 42,
    dob: '1981-10-05',
    email: 'sarah.miller@example.com',
    status: 'pending',
    avatarInitials: 'SM'
  },
  {
    id: '2',
    name: 'James Dupont',
    policyNumber: 'ALZ-11044-B',
    age: 28,
    dob: '1995-10-05',
    email: 'james.dupont@example.com',
    status: 'pending',
    avatarInitials: 'JD'
  },
  {
    id: '3',
    name: 'Elena Wagner',
    policyNumber: 'ALZ-45098-C',
    age: 55,
    dob: '1968-10-05',
    email: 'elena.wagner@example.com',
    status: 'sent',
    sentTime: '09:15',
    avatarInitials: 'EW'
  },
  {
    id: '4',
    name: 'Michael Kovic',
    policyNumber: 'ALZ-22391-A',
    age: 31,
    dob: '1992-10-05',
    email: 'm.kovic@example.com',
    status: 'sent',
    sentTime: '08:30',
    avatarInitials: 'MK'
  },
  {
    id: '5',
    name: 'Linda Hsu',
    policyNumber: 'ALZ-77812-D',
    age: 64,
    dob: '1959-10-05',
    email: 'linda.hsu@example.com',
    status: 'sent',
    sentTime: '08:05',
    avatarInitials: 'LH'
  }
];