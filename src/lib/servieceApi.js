import { siteContent } from '../data/siteData';

export async function getServices() {
  return siteContent.servicesOffered;
}

export async function createService(payload) {
  return payload;
}

export async function updateService(id, payload) {
  return { id, ...payload };
}

export async function deleteService(id) {
  return { id };
}
