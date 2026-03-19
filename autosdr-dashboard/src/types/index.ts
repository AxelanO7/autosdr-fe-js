export interface Lead {
  id: string;
  company_name: string;
  website: string;
  is_qualified: boolean;
  scraped_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Outreach {
  id: string;
  lead_id: string;
  generated_email: string;
  status: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
