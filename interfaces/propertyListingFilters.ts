interface PropertyListingBaseFilter {
  search: string;
  ordering: string | null;
  page: number;
  page_size: number;
}

export interface PropertyListingFilters extends PropertyListingBaseFilter {
  property_type: string | null;
  listing_type: string | null;
  property_status: number;
  price_min: number;
  price_max: number;
  lot_size_min: number;
  lot_size_max: number;
  floor_size_min: number;
  floor_size_max: number;
  building_size_min: number;
  building_size_max: number;
  num_bedrooms_min: number;
  num_bedrooms_max: number;
  num_bathrooms_min: number;
  num_bathrooms_max: number;
  num_carspaces_min: number;
  num_carspaces_max: number;
  location: string | null;
  indoor_features: string | null;
  outdoor_features: string | null;
  other_features: string | null;
}
