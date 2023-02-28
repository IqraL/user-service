export type UserProfile = {
  email: string;
  name: string;
  displayName: string;
  locales: string;
  company: string;
};

export type UserGroup = {
  id: string;
  name: string;
  users: string[];
  company: string;
};