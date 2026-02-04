import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CalendarView from './components/CalendarView';
import EmailEditor from './components/EmailEditor';
import { AppView, Customer } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CALENDAR);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView(AppView.EMAIL_EDITOR);
  };

  const handleCancelEditor = () => {
    setCurrentView(AppView.CALENDAR);
    setSelectedCustomer(null);
  };

  const handleSendEmail = () => {
    // In a real app, this would make an API call
    alert(`Email successfully sent to ${selectedCustomer?.name}!`);
    setCurrentView(AppView.CALENDAR);
    setSelectedCustomer(null);
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
          
          {currentView === AppView.EMAIL_EDITOR && selectedCustomer && (
            <EmailEditor 
              customer={selectedCustomer} 
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