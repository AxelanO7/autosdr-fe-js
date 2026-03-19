import axios from "axios";
import { ApiResponse } from "@/types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    const apiResponse: ApiResponse<unknown> = response.data;

    if (!apiResponse.success) {
      throw new Error(apiResponse.error || "Request failed");
    }

    return {
      ...response,
      data: apiResponse.data,
    };
  },
  (error) => {
    if (error.response?.data) {
      const apiError = error.response.data;
      throw new Error(
        apiError.error || apiError.message || "An unexpected error occurred",
      );
    }

    throw new Error(error.message || "Network error");
  },
);

export const scrapeWebsite = async (url: string): Promise<unknown> => {
  try {
    const response = await apiClient.post("/leads/scrape", { url });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLeads = async (): Promise<unknown> => {
  try {
    const response = await apiClient.get("/leads");
    return response;
  } catch (error) {
    throw error;
  }
};

export const generateOutreach = async (leadId: string): Promise<unknown> => {
  try {
    const response = await apiClient.post("/outreach/generate", {
      lead_id: leadId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOutreach = async (outreachId: string): Promise<unknown> => {
  try {
    const response = await apiClient.get(`/outreach/${outreachId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
