import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { Globe, User, Mail, Phone, MapPin } from 'lucide-react';

export const AddCollegeLinkModal = ({ isOpen, onClose, mode = 'link' }) => {
  const { addCollegeQuickLink, addCollegeContact } = useApp();

  const [linkData, setLinkData] = useState({
    title: '',
    url: '',
    category: 'Portals'
  });

  const [contactData, setContactData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    office: ''
  });

  const [error, setError] = useState('');

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (!linkData.title.trim()) {
      setError('Please provide a portal name.');
      return;
    }
    if (!linkData.url.trim()) {
      setError('Please provide a valid URL.');
      return;
    }

    addCollegeQuickLink({
      title: linkData.title.trim(),
      url: linkData.url.trim().startsWith('http') ? linkData.url.trim() : `https://${linkData.url.trim()}`,
      category: linkData.category
    });

    onClose();
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name.trim()) {
      setError('Please provide a contact name.');
      return;
    }

    addCollegeContact(contactData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'link' ? 'Add College Portal Link' : 'Add Department Contact'}
      subtitle={
        mode === 'link'
          ? 'Save links to your university ERP, exam portal, or library OPAC'
          : 'Save faculty advisors, placement officers, or department staff details'
      }
      maxWidth="max-w-lg"
    >
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium">
          {error}
        </div>
      )}

      {mode === 'link' ? (
        <form onSubmit={handleLinkSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Portal Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. University Fee & Exam Portal"
              value={linkData.title}
              onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Web URL <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="https://exams.college.edu"
                value={linkData.url}
                onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={linkData.category}
              onChange={(e) => setLinkData({ ...linkData, category: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Portals">Student Portals</option>
              <option value="Academics">Academics & Calenders</option>
              <option value="Library">Library & Research</option>
              <option value="Career">Placements & Careers</option>
              <option value="Campus Life">Campus & Hostels</option>
            </select>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Portal Link</Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Contact Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Dr. Ramesh Kumar"
                value={contactData.name}
                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Role / Designation
            </label>
            <input
              type="text"
              placeholder="e.g. Head of Department / Faculty Advisor"
              value={contactData.role}
              onChange={(e) => setContactData({ ...contactData, role: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@college.edu"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Cabin / Office Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. CS Block Room 102"
                value={contactData.office}
                onChange={(e) => setContactData({ ...contactData, office: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Contact</Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

