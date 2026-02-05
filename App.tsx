import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CalendarView from './components/CalendarView';
import EmailEditor from './components/EmailEditor';
import { AppView, Customer } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CALENDAR);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedDate, setSelectedDate] = useState<{ month: number; day: number; year: number } | null>(null);

  const handleCustomerSelect = (customer: Customer, month: number, day: number, year: number) => {
    setSelectedCustomer(customer);
    setSelectedDate({ month, day, year });
    setCurrentView(AppView.EMAIL_EDITOR);
  };

  const handleCancelEditor = () => {
    setCurrentView(AppView.CALENDAR);
    setSelectedCustomer(null);
    setSelectedDate(null);
  };

  const handleSendEmail = () => {
    // Success message
    alert(`Email successfully sent to ${selectedCustomer?.name}!`);
    setCurrentView(AppView.CALENDAR);
    setSelectedCustomer(null);
    setSelectedDate(null);
  };

  return (
    <div className="flex h-screen bg-bg-light font-sans text-text-main overflow-hidden">
      <Sidebar activeView={currentView} />

      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header />

        <main className="flex-1 overflow-hidden relative">
          {currentView === AppView.CALENDAR && (
            <CalendarView onCustomerSelect={handleCustomerSelect} />
          )}

          {currentView === AppView.EMAIL_EDITOR && selectedCustomer && selectedDate && (
            <EmailEditor
              customer={selectedCustomer}
              month={selectedDate.month}
              day={selectedDate.day}
              year={selectedDate.year}
              onCancel={handleCancelEditor}
              onSend={handleSendEmail}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;