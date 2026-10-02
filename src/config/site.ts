import { PRIVACY_CONTACT_EMAIL } from '../legal/privacy-policy';

export const SITE_ORIGIN = 'https://hive-app.site';

export const CONTACT_EMAIL = PRIVACY_CONTACT_EMAIL;

export const DELETE_EMAIL_SUBJECT = 'Delete my Hive account';

export const DELETION_REQUEST_DAYS = 30;

export function deleteMailto(): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(DELETE_EMAIL_SUBJECT)}`;
}
