export default interface IUser {
  app_metadata: { provider: string };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_change_confirm_status: number;
  email_confirmed_at: string;
  id: string;
  invited_at: string;
  last_sign_in_at: string;
  phone: string;
  recovery_sent_at: string;
  role: string;
  updated_at: string;
  user_metadata: {
    first_name: string,
    last_name: string,
    username: string
  };
}