import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";
import { create } from "zustand";

type PartialPropertyListingFilters = Partial<PropertyListingFilters>;

const propertyListingFilterInitialState: PartialPropertyListingFilters = {
  page_size: 100,
};

type StoreData = {
  filters: PartialPropertyListingFilters;
};

type StoreActions = {
  updateFilters: (filters: PartialPropertyListingFilters) => void;
};

const globalStateStore = create<StoreData & StoreActions>((set) => ({
  filters: propertyListingFilterInitialState,
  updateFilters: (filters: PartialPropertyListingFilters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
}));

export default globalStateStore;
