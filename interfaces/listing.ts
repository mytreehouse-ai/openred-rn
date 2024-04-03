interface Propertytype {
  id: number;
  description: string;
}

type ListingType = Propertytype;

type PropertyStatus = Propertytype;

interface City {
  id: number;
  name: string;
  slug: string;
}

interface Estate {
  id: number;
  building_name: string | null;
  subdivision_name: string | null;
  address: string | null;
  lot_size: number | null;
  floor_size: number | null;
  building_size: number | null;
  num_bedrooms: number;
  num_bathrooms: number;
  num_carspaces: number;
  city: City;
  longitude: number;
  latitude: number;
  image_url: string | null;
  indoor_features: string[];
  outdoor_features: string[];
  other_features: string[];
  description: string | null;
  markdown: string | null;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: number;
  listing_title: string;
  slug: string;
  listing_url: string;
  estate: Estate;
  property_type: Propertytype;
  listing_type: ListingType;
  property_status: PropertyStatus;
  price: string;
  price_formatted: string;
  is_delisted: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
