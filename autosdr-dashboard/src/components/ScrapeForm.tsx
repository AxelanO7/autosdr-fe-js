"use client";

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { scrapeWebsite } from '@/lib/api';

interface ScrapeFormProps {
  onSuccess: () => void;
}

export default function ScrapeForm({ onSuccess }: ScrapeFormProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a website URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await scrapeWebsite(url);
      setUrl('');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scrape website');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Scrape New Website</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">
            Website URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Scraping...
            </>
          ) : (
            'Scrape Website'
          )}
        </button>
      </form>
    </div>
  );
}