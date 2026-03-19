"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Copy, Mail, Loader2 } from "lucide-react";
import { generateOutreach } from "@/lib/api";
import { Lead, Outreach } from "@/types";

export default function LeadDetail() {
  const params = useParams();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [outreach, setOutreach] = useState<Outreach | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real application, you would fetch the lead details by ID
  // For now, we'll use mock data or fetch from a real API
  useEffect(() => {
    // This would be replaced with actual API call to fetch lead by ID
    const mockLead: Lead = {
      id: leadId,
      company_name: `Company ${leadId}`,
      website: `https://company${leadId}.com`,
      is_qualified: true,
      scraped_data: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setLead(mockLead);
  }, [leadId]);

  const handleGenerateOutreach = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await generateOutreach(leadId);
      const outreachData = response as Outreach;
      setOutreach(outreachData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate outreach",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (outreach?.generated_email) {
      try {
        await navigator.clipboard.writeText(outreach.generated_email);
        alert("Email copied to clipboard!");
      } catch {
        alert("Failed to copy to clipboard");
      }
    }
  };

  if (!lead) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Loading lead details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Lead Details</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-900 px-4 py-2 rounded-md hover:bg-blue-50"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Company Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company Name
            </label>
            <p className="text-slate-900">{lead.company_name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Website
            </label>
            <a
              href={lead.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-900"
            >
              {lead.website}
            </a>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Qualified
            </label>
            <p className="text-slate-900">{lead.is_qualified ? "Yes" : "No"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Created
            </label>
            <p className="text-slate-900">
              {new Date(lead.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          AI Outreach Generation
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="text-sm text-red-700">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {!outreach ? (
          <div className="text-center py-8">
            <Mail className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <p className="text-slate-600 mb-6">
              Generate an AI-powered outreach email for this lead.
            </p>
            <button
              onClick={handleGenerateOutreach}
              disabled={isGenerating}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Generating...
                </>
              ) : (
                "Generate AI Outreach"
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-900">Generated Email</h3>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center text-blue-600 hover:text-blue-900 text-sm"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-slate-700 bg-white p-3 rounded border border-slate-200 overflow-x-auto">
                {outreach.generated_email}
              </pre>
            </div>

            <div className="text-sm text-slate-600">
              <strong>Status:</strong> {outreach.status}
              <br />
              <strong>Generated:</strong>{" "}
              {new Date(outreach.created_at).toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
