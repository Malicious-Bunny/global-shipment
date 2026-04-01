/**
 * Tracking number generator
 * Format: GES + 18 digits = 21 characters total
 * Example: GES051828334831272262
 */
export function generateTrackingNumber(): string {
  const timestamp = Date.now().toString(); // 13 digits
  const random = Math.floor(Math.random() * 99999).toString().padStart(5, '0'); // 5 digits
  const combined = (timestamp + random).slice(0, 18); // 18 digits
  return `GES${combined}`;
}

export const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PICKED_UP: 'Picked Up',
  IN_TRANSIT: 'In Transit',
  CUSTOMS_CLEARANCE: 'Customs Clearance',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  ON_HOLD: 'On Hold',
  CANCELLED: 'Cancelled',
};

export const STATUS_COLORS: Record<string, string> = {
  PENDING: '#757575',
  PICKED_UP: '#1565C0',
  IN_TRANSIT: '#1565C0',
  CUSTOMS_CLEARANCE: '#F57C00',
  OUT_FOR_DELIVERY: '#7B1FA2',
  DELIVERED: '#2E7D32',
  ON_HOLD: '#F57C00',
  CANCELLED: '#D32F2F',
};

export const ALL_STATUSES = [
  'PENDING',
  'PICKED_UP',
  'IN_TRANSIT',
  'CUSTOMS_CLEARANCE',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'ON_HOLD',
  'CANCELLED',
] as const;

export const PACKAGE_TYPE_LABELS: Record<string, string> = {
  DOCUMENT: 'Document',
  PARCEL: 'Parcel',
  FREIGHT: 'Freight',
  VEHICLE: 'Vehicle',
};
