import { portfolioItems } from '../data/siteData';

export async function getPortfolios() {
  return portfolioItems;
}

export async function getPortfolioById(id) {
  const portfolio = portfolioItems.find((item) => String(item.id) === String(id));

  if (!portfolio) {
    throw new Error(`Portfolio with ID ${id} not found`);
  }

  return portfolio;
}
