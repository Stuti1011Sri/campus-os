import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Building2,
  Globe,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  BookOpen,
  Calendar,
  Briefcase,
  Home
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { AddCollegeLinkModal } from './AddCollegeLinkModal';

export const CollegeInfoPage = () => {
  const {
    collegeInfo,
    deleteCollegeQuickLink,
    deleteCollegeContact,
    userProfile
  } = useApp();

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [modalType, setModalType] = useState('link'); // 'link' | 'contact'

  const quickLinks = collegeInfo.quickLinks || [];
  const contacts = collegeInfo.contacts || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            College Portals & Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Quick links to university ERP, examination portals, library catalogs and department contacts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setModalType('link');
              setIsLinkModalOpen(true);
            }}
            variant="secondary"
            icon={Plus}
          >
            Add Portal Link
          </Button>
          <Button
            onClick={() => {
              setModalType('contact');
              setIsLinkModalOpen(true);
            }}
            icon={Plus}
          >
            Add Contact
          </Button>
        </div>
      </div>

      {/* College Institution Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/40 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/80 border border-indigo-400/40 flex items-center justify-center text-white shadow-lg">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                Enrolled Academic Institution
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {userProfile.collegeName || 'National Institute of Technology'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {userProfile.course} in {userProfile.branch} • {userProfile.year} ({userProfile.semester})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Portal Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" />
            <span>Essential College Portals & Resources</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Card
              key={link.id}
              className="p-5 flex flex-col justify-between hover:border-indigo-500/50"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                    {link.category || 'Portal'}
                  </span>
                  <button
                    onClick={() => deleteCollegeQuickLink(link.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {link.title}
                </h3>
                <p className="text-xs text-slate-400 truncate mt-1">{link.url}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <span>Launch Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Important Faculty & Administration Directory */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-indigo-500" />
            <span>Important Campus Contacts & Advisors</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {contact.name}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {contact.role}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteCollegeContact(contact.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 mt-4 text-xs text-slate-600 dark:text-slate-300">
                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-indigo-500 truncate"
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`tel:${contact.phone}`} className="hover:text-indigo-500">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                  {contact.office && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{contact.office}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {isLinkModalOpen && (
        <AddCollegeLinkModal
          isOpen={isLinkModalOpen}
          onClose={() => setIsLinkModalOpen(false)}
          mode={modalType}
        />
      )}
    </div>
  );
};

