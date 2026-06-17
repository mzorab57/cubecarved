import { contactInfo } from '../data/siteData';

export async function getContacts() {
  return [contactInfo];
}

export async function createContact(payload) {
  return payload;
}

export async function updateContact(payload) {
  return payload;
}

export async function deleteContact(id) {
  return { id };
}
