import React, { useState, useEffect } from 'react';
import { Customer } from '../types';
import { Bold, Italic, Underline, List, Image as ImageIcon, Link as LinkIcon, PlusCircle, Clock, Send, Info } from 'lucide-react';

interface EmailEditorProps {
    customer: Customer;
    month: number; // 1-indexed (1 = January, 12 = December)
    day: number;
    year: number;
    onCancel: () => void;
    onSend: () => void;
}

const EmailEditor: React.FC<EmailEditorProps> = ({ customer, month, day, year, onCancel, onSend }) => {
    const [subject, setSubject] = useState("Happy Birthday from your Allianz Team! 🎂");
    const [isSending, setIsSending] = useState(false);

    const handleSend = async () => {
        setIsSending(true);
        try {
            // POST to /sent endpoint
            const apiUrl = `https://peaka-traefik-peaka.apps.extprodocp.allianz-tr.local/api/test-lnes/sent`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pol_id: customer.policyNumber,
                    year: year.toString()
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to send email: ${response.status}`);
            }

            // Success - call onSend callback
            onSend();
        } catch (error) {
            console.error('Failed to send birthday email:', error);
            alert('Failed to send email. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-bg-light overflow-hidden h-full">
            {/* Breadcrumbs */}
            <div className="w-full max-w-5xl mx-auto px-10 pt-6">
                <div className="flex flex-wrap gap-2 py-2">
                    <button onClick={onCancel} className="text-text-sub text-sm font-medium hover:underline">Dashboard</button>
                    <span className="text-text-sub text-sm font-medium">/</span>
                    <button onClick={onCancel} className="text-text-sub text-sm font-medium hover:underline">Customers</button>
                    <span className="text-text-sub text-sm font-medium">/</span>
                    <span className="text-text-main text-sm font-medium">Email Editor</span>
                </div>

                <div className="flex flex-wrap justify-between gap-3 py-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-text-main text-3xl font-bold leading-tight">Compose Birthday Greeting</h1>
                        <p className="text-text-sub text-sm font-normal">Personalizing the automated template for Allianz VIP customers</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-10">
                <div className="w-full max-w-5xl mx-auto px-10">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                        {/* To Field */}
                        <div className="border-b border-gray-100">
                            <div className="flex items-center gap-4 px-6 py-4">
                                <span className="text-text-sub text-base font-medium min-w-[60px]">To</span>
                                <input
                                    readOnly
                                    className="flex-1 border-none focus:ring-0 text-text-main bg-transparent p-0 text-base font-normal outline-none"
                                    value={customer.email}
                                />
                            </div>
                        </div>
                        {/* Subject Field */}
                        <div className="border-b border-gray-100">
                            <div className="flex items-center gap-4 px-6 py-4">
                                <span className="text-text-sub text-base font-medium min-w-[60px]">Subject</span>
                                <input
                                    className="flex-1 border-none focus:ring-0 text-text-main bg-transparent p-0 text-base font-normal placeholder-text-sub outline-none"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Toolbar */}
                        <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 flex flex-wrap gap-4 items-center">
                            <div className="flex gap-1">
                                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-600"><Bold size={18} /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-600"><Italic size={18} /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-600"><Underline size={18} /></button>
                            </div>
                            <div className="w-px h-5 bg-gray-300"></div>
                            <div className="flex gap-1">
                                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-600"><List size={18} /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-600"><ImageIcon size={18} /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-600"><LinkIcon size={18} /></button>
                            </div>
                            <div className="flex-1"></div>
                            <button className="flex items-center gap-1 px-3 py-1.5 text-secondary hover:bg-blue-50 rounded-md text-sm font-medium transition-colors">
                                <PlusCircle size={16} />
                                Insert Variable
                            </button>
                        </div>

                        {/* Email Canvas */}
                        <div className="px-10 py-12 bg-gray-50/30 min-h-[500px]">
                            <div className="max-w-[600px] mx-auto bg-white border border-gray-200 p-8 shadow-sm">
                                <div className="mb-8 text-center border-b pb-6 border-gray-100">
                                    <div className="text-secondary font-bold text-2xl tracking-tighter mb-2">Allianz</div>
                                    <div className="text-[10px] uppercase tracking-widest text-text-sub">Securing your future</div>
                                </div>

                                <div className="text-text-main space-y-4 font-sans">
                                    <p className="text-lg font-medium">Dear <span className="bg-blue-50 text-secondary px-1 py-0.5 rounded border border-blue-100 cursor-help" title="Dynamic Variable">{customer.name}</span>,</p>

                                    <p className="leading-relaxed">On behalf of the whole team at Allianz, we would like to wish you a very <strong>Happy Birthday!</strong></p>

                                    <p className="leading-relaxed">We appreciate the trust you place in us for your insurance needs. As a small token of our appreciation, we've updated your policy rewards program with a special anniversary bonus.</p>

                                    <div className="py-6 text-center">
                                        <button className="inline-block px-8 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                            View Your Birthday Gift
                                        </button>
                                    </div>

                                    <p className="leading-relaxed">We hope you have a wonderful day filled with joy and celebration!</p>

                                    <div className="pt-6 mt-8 border-t border-gray-100">
                                        <p className="text-sm">Best regards,</p>
                                        <p className="text-sm font-bold">Your Allianz Agent</p>
                                        <p className="text-xs text-text-sub mt-2">Allianz Insurance Services - Local Office</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center sticky bottom-0">
                            <div className="flex gap-2 text-text-sub items-center">
                                <Clock size={16} />
                                <span className="text-sm font-medium">Schedule for 09:00 AM</span>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={onCancel} className="px-5 py-2.5 text-text-main text-sm font-bold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={isSending}
                                    className="px-5 py-2.5 bg-secondary text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                                >
                                    {isSending ? 'Sending...' : 'Send Now'}
                                    {!isSending && <Send size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Helper Info */}
                    <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100 flex gap-4 items-start mb-8">
                        <Info className="text-secondary shrink-0" size={20} />
                        <div>
                            <p className="text-text-main text-sm font-semibold">Automatic Dynamic Content</p>
                            <p className="text-text-sub text-sm mt-1">
                                The placeholder <span className="font-mono text-secondary bg-blue-100 px-1 rounded text-xs">{`[Customer Name]`}</span> will automatically be replaced with <span className="font-bold">{customer.name}</span> when the email is dispatched.
                            </p>
                        </div>
                    </div>

                    <footer className="py-6 text-center text-gray-400 text-xs">
                        © 2024 Allianz Insurance Services. Internal Use Only.
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default EmailEditor;