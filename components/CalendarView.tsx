import React, { useState, useEffect } from 'react';
import { Download, Sparkles, ChevronLeft, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { Customer } from '../types';
import { MOCK_CUSTOMERS } from '../constants';

interface CalendarViewProps {
  onCustomerSelect: (customer: Customer) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onCustomerSelect }) => {
  // Initialize to current month of 2026
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(2026, now.getMonth(), 1);
  });
  
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentMonthName = monthNames[month];

  // Calendar Logic
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon...

  // Generate calendar grid array
  // We use (null) for empty slots and (number) for days
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Simulated API Call
  const fetchBirthdays = async (day: number) => {
    setIsLoading(true);
    try {
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // DUMMY JSON RESPONSE LOGIC
      let dummyResponse: Customer[] = [];
      
      // Deterministic pseudo-random logic based on day number to vary data
      const seed = day + month; // varies by day and month
      
      if (seed % 5 === 0) {
        dummyResponse = MOCK_CUSTOMERS;
      } else if (seed % 3 === 0) {
        dummyResponse = MOCK_CUSTOMERS.slice(0, 3);
      } else if (seed % 2 === 0) {
        dummyResponse = MOCK_CUSTOMERS.slice(2, 5);
      } else if (seed % 7 === 0) {
        dummyResponse = [MOCK_CUSTOMERS[0], MOCK_CUSTOMERS[4]];
      } else {
        dummyResponse = [];
      }
      
      setCustomers(dummyResponse);
    } catch (error) {
      console.error("Failed to fetch birthdays:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDayClick = (day: number) => {
    if (day === selectedDay) return;
    setSelectedDay(day);
    fetchBirthdays(day);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1); // Reset to 1st of month
    fetchBirthdays(1);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1); // Reset to 1st of month
    fetchBirthdays(1);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-bg-light">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-8 pt-8 pb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-text-main text-3xl font-black leading-tight tracking-tight">Birthday Calendar</h1>
          <p className="text-text-sub text-base font-normal">Manage and automate birthday greetings for your policyholders.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors text-text-main">
            <Download size={16} />
            Export List
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
            <Sparkles size={16} />
            Automate All
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-6 p-8 overflow-hidden">
        {/* Calendar Widget */}
        <div className="w-full lg:w-[380px] flex flex-col gap-4 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center p-1 justify-between mb-4">
              <button 
                onClick={goToPreviousMonth}
                className="hover:bg-gray-100 rounded-full p-2 transition-colors text-text-main"
              >
                <ChevronLeft size={20} />
              </button>
              <p className="text-text-main text-lg font-bold">{currentMonthName} {year}</p>
              <button 
                onClick={goToNextMonth}
                className="hover:bg-gray-100 rounded-full p-2 transition-colors text-text-main"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <p key={day} className="text-text-sub text-[11px] font-bold text-center py-2">{day}</p>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((dayNum, index) => {
                if (dayNum === null) {
                  return <div key={`empty-${index}`} className="h-12" />;
                }

                // Simple pseudo-random event indicator
                const hasEvent = (dayNum + month) % 4 === 0 || (dayNum + month) % 7 === 0;
                const isSelected = dayNum === selectedDay;

                return (
                  <div 
                    key={dayNum}
                    onClick={() => handleDayClick(dayNum)} 
                    className={`
                      h-12 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all relative
                      ${isSelected 
                          ? 'bg-secondary text-white shadow-lg shadow-blue-500/30 transform scale-105 z-10' 
                          : 'hover:bg-gray-50 text-text-main hover:scale-105'}
                    `}
                  >
                    <span className={`text-sm ${isSelected ? 'font-bold' : 'font-medium'}`}>{dayNum}</span>
                    {hasEvent && !isSelected && (
                      <div className="absolute bottom-2 w-1.5 h-1.5 bg-secondary rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
            <h3 className="text-secondary font-bold text-sm mb-1">Summary</h3>
            <p className="text-xs text-text-main mb-4">{currentMonthName} {selectedDay}, {year}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-text-sub">Total Birthdays</span>
              <span className="text-sm font-bold text-secondary">
                 {isLoading ? '-' : `${customers.length} Policyholders`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-text-sub">Greetings Sent</span>
              <span className="text-sm font-bold text-green-600">
                {isLoading ? '-' : `${customers.filter(c => c.status === 'sent').length}/${customers.length}`}
              </span>
            </div>
            {/* Progress Bar */}
            {!isLoading && customers.length > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div 
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${(customers.filter(c => c.status === 'sent').length / customers.length) * 100}%` }}
                ></div>
                </div>
            )}
          </div>
        </div>

        {/* Customer Table */}
        <div className="flex-1 flex flex-col min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white z-20">
            <h2 className="text-text-main text-xl font-bold tracking-tight">Birthdays: {currentMonthName} {selectedDay}, {year}</h2>
            <span className="bg-bg-light text-text-sub px-3 py-1 rounded-full text-xs font-bold">
              {isLoading ? 'Loading...' : `${customers.length} results`}
            </span>
          </div>
          
          <div className="overflow-auto flex-1 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-30 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-secondary animate-spin" />
                    <p className="text-sm font-medium text-text-sub">Fetching data...</p>
                </div>
              </div>
            )}

            {!isLoading && customers.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="text-gray-300 w-8 h-8" />
                    </div>
                    <h3 className="text-text-main font-bold text-lg mb-1">No birthdays found</h3>
                    <p className="text-text-sub text-sm max-w-xs mx-auto">
                        There are no policyholders celebrating their birthday on this date.
                    </p>
                </div>
            ) : (
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/80 sticky top-0 z-10">
                    <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-wider">Customer Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-wider">Policy Number</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-wider text-center">Age</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-sub uppercase tracking-wider text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">
                            {customer.avatarInitials}
                            </div>
                            <span className="text-sm font-bold text-text-main">{customer.name}</span>
                        </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-sub">{customer.policyNumber}</td>
                        <td className="px-6 py-4 text-sm text-text-main text-center">{customer.age}</td>
                        <td className="px-6 py-4 text-right">
                        {customer.status === 'sent' ? (
                            <div className="flex items-center justify-end gap-2 text-green-600 font-bold text-xs">
                            <CheckCircle size={14} />
                            Sent at {customer.sentTime}
                            </div>
                        ) : (
                            <button 
                            onClick={() => onCustomerSelect(customer)}
                            className="bg-secondary hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm transform active:scale-95"
                            >
                            Send Email
                            </button>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
          </div>
          
          {!isLoading && customers.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-center">
                <button className="text-secondary text-sm font-bold hover:underline">View All Policyholders</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;