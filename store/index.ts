import { Listing } from "@/interfaces/listing";
import { PropertyListingFilters } from "@/interfaces/propertyListingFilters";
import { create } from "zustand";

type PartialPropertyListingFilters = Partial<PropertyListingFilters>;

const propertyListingFilterInitialState: PartialPropertyListingFilters = {
  property_type: "Warehouse",
  page_size: 5,
};

type StoreData = {
  filters: PartialPropertyListingFilters;
  currentPropertyListingSelected: Listing | null;
};

type StoreActions = {
  updateFilters: (filters: PartialPropertyListingFilters) => void;
  setCurrentPropertyListingSelected: (listing: Listing) => void;
};

const globalStateStore = create<StoreData & StoreActions>((set) => ({
  filters: propertyListingFilterInitialState,
  currentPropertyListingSelected: null,
  updateFilters: (filters: PartialPropertyListingFilters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setCurrentPropertyListingSelected: (listing: Listing) =>
    set((state) => ({ currentPropertyListingSelected: listing })),
}));

export default globalStateStore;
