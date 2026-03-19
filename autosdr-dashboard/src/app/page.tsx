"use client";

import { useEffect, useState } from 'react';
import ScrapeForm from '@/components/ScrapeForm';
import LeadTable from '@/components/LeadTable';
import { getLeads } from '@/lib/api';
import { Lead } from '@/types';

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const response = await getLeads();
      setLeads(response as Lead[]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
      setLeads([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      </div>

      <ScrapeForm onSuccess={fetchLeads} />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="text-sm text-red-700">
              <strong>Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-600">Loading leads...</span>
          </div>
        </div>
      ) : (
        <LeadTable leads={leads} />
      )}
    </div>
  );
}