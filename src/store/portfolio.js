import { create } from 'zustand';
import { getPortfolios } from '../lib/portfolioApi';

const usePortfolioStore = create((set) => ({
  items: [],
  loading: false,
  error: null,
  filter: { category: 'All', subcategory: 'All' },

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getPortfolios();
      const items = Array.isArray(data) ? data : [];
      set({ items, loading: false });
    } catch (err) {
      const message = err?.response?.data?.error || err?.message || 'Failed to fetch portfolio';
      set({ error: message, loading: false });
    }
  },

  setCategory: (category) =>
    set({
      filter: {
        category,
        subcategory: 'All',
      },
    }),

  setSubcategory: (subcategory) =>
    set((state) => ({
      filter: {
        ...state.filter,
        subcategory,
      },
    })),
}));

export default usePortfolioStore;
