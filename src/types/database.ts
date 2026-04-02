export type ShipmentStatus =
  | 'PENDING'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'CUSTOMS_CLEARANCE'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'ON_HOLD'
  | 'CANCELLED';

export type PackageType = 'DOCUMENT' | 'PARCEL' | 'FREIGHT' | 'VEHICLE';

export interface Shipment {
  id: string;
  tracking_number: string;
  status: ShipmentStatus;
  shipper_name: string;
  shipper_address: string;
  shipper_phone: string | null;
  shipper_email: string | null;
  receiver_name: string;
  receiver_address: string;
  receiver_phone: string | null;
  receiver_email: string | null;
  package_type: PackageType;
  weight: number | null;
  dimensions: string | null;
  description: string | null;
  origin: string | null;
  destination: string | null;
  estimated_delivery: string | null;
  current_lat: number | null;
  current_lng: number | null;
  created_at: string;
  updated_at: string;
}

export interface TrackingEvent {
  id: string;
  shipment_id: string;
  status: ShipmentStatus;
  location: string | null;
  description: string;
  event_timestamp: string;
  created_at: string;
}

export interface ShipmentWithEvents extends Shipment {
  tracking_events: TrackingEvent[];
}

// Supabase Database type
export interface Database {
  public: {
    Tables: {
      shipments: {
        Row: Shipment;
        Insert: Omit<Shipment, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Shipment, 'id' | 'created_at' | 'updated_at'>>;
      };
      tracking_events: {
        Row: TrackingEvent;
        Insert: Omit<TrackingEvent, 'id' | 'created_at'>;
        Update: Partial<Omit<TrackingEvent, 'id' | 'created_at'>>;
      };
    };
    Enums: {
      shipment_status: ShipmentStatus;
      package_type: PackageType;
    };
  };
}
