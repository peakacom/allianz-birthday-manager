export enum AppView {
  CALENDAR = 'CALENDAR',
  EMAIL_EDITOR = 'EMAIL_EDITOR'
}

export interface Customer {
  id: string;
  name: string;
  policyNumber: string;
  age: number;
  dob: string; // ISO date string YYYY-MM-DD
  email: string;
  status: 'pending' | 'sent';
  sentTime?: string;
  avatarInitials: string;
}

export interface CalendarDay {
  day: number;
  hasEvent: boolean;
  isSelected: boolean;
  isToday?: boolean;
}