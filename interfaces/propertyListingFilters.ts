interface PropertyListingBaseFilter {
  search: string;
  ordering: string;
  page: number;
  page_size: number;
}

export interface PropertyListingFilters extends PropertyListingBaseFilter {
  property_type: string;
  listing_type: string;
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
  location: string;
  indoor_features: string;
  outdoor_features: string;
  other_features: string;
}
