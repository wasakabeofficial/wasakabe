export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResult {
  success: boolean;
  error?: string;
}

export interface IContactRepository {
  submit(data: ContactFormData): Promise<ContactResult>;
}
