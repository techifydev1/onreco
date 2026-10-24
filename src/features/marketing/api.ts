import { api } from "@/services/api/client";

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

export function sendContactMessage(input: ContactInput): Promise<{ id: string }> {
  return api.post<{ id: string }>("/api/contact", input);
}
