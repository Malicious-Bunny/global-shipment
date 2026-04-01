-- ============================================================
-- Global Express Shipments — Initial Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE shipment_status AS ENUM (
  'PENDING',
  'PICKED_UP',
  'IN_TRANSIT',
  'CUSTOMS_CLEARANCE',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'ON_HOLD',
  'CANCELLED'
);

CREATE TYPE package_type AS ENUM (
  'DOCUMENT',
  'PARCEL',
  'FREIGHT',
  'VEHICLE'
);

-- ============================================================
-- SHIPMENTS TABLE
-- ============================================================

CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number VARCHAR(24) UNIQUE NOT NULL,
  status shipment_status NOT NULL DEFAULT 'PENDING',

  -- Shipper info
  shipper_name VARCHAR(255) NOT NULL,
  shipper_address TEXT NOT NULL,
  shipper_phone VARCHAR(50),
  shipper_email VARCHAR(255),

  -- Receiver info
  receiver_name VARCHAR(255) NOT NULL,
  receiver_address TEXT NOT NULL,
  receiver_phone VARCHAR(50),
  receiver_email VARCHAR(255),

  -- Package details
  package_type package_type NOT NULL DEFAULT 'PARCEL',
  weight DECIMAL(10,2),
  dimensions VARCHAR(100),
  description TEXT,

  -- Route
  origin VARCHAR(255),
  destination VARCHAR(255),
  estimated_delivery DATE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TRACKING EVENTS TABLE
-- ============================================================

CREATE TABLE tracking_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status shipment_status NOT NULL,
  location VARCHAR(255),
  description TEXT NOT NULL,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_tracking_events_shipment_id ON tracking_events(shipment_id);
CREATE INDEX idx_tracking_events_timestamp ON tracking_events(event_timestamp DESC);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER shipments_updated_at
  BEFORE UPDATE ON shipments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;

-- Public can read shipments (for tracking by number)
CREATE POLICY "Public can read shipments" ON shipments
  FOR SELECT USING (true);

-- Public can read tracking events
CREATE POLICY "Public can read tracking events" ON tracking_events
  FOR SELECT USING (true);

-- Only authenticated users (admin) can insert/update/delete shipments
CREATE POLICY "Admin can manage shipments" ON shipments
  FOR ALL USING (auth.role() = 'authenticated');

-- Only authenticated users (admin) can manage tracking events
CREATE POLICY "Admin can manage tracking events" ON tracking_events
  FOR ALL USING (auth.role() = 'authenticated');
