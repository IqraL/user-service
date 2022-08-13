export type GoogleUserData = {
  email: string;
  name: string;
  displayName: string;
  locales: string;
  googleSubId: string;
};

export type GoogleUsersDetailsResponse = {
  resourceName: string;
  etag: string;
  names: Name[];
  emailAddresses: EmailAddress[];
  locales: Locale[];
};

export type EmailAddress = {
  metadata: MetadataBase & { verified: boolean; sourcePrimary: boolean };
  value: string;
};

export type Name = {
  metadata: MetadataBase & { sourcePrimary: boolean };
  displayName: string;
  familyName: string;
  givenName: string;
  displayNameLastFirst: string;
  unstructuredName: string;
};

export type Locale = {
  metadata: MetadataBase;
  value: string;
};

export type MetadataBase = {
  primary: boolean;
  source: Source;
};

export type Source = {
  type: string; //PROFILE/ACCOUNT <-- google source
  id: string; // google sub number
};
