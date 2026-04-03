import { z } from 'zod';

export const shipmentSchema = z.object({
  shipper_name: z.string().min(2, 'Shipper name is required'),
  shipper_address: z.string().min(5, 'Shipper address is required'),
  shipper_phone: z.string().optional(),
  shipper_email: z.string().email('Invalid email').optional().or(z.literal('')),
  receiver_name: z.string().min(2, 'Receiver name is required'),
  receiver_address: z.string().min(5, 'Receiver address is required'),
  receiver_phone: z.string().optional(),
  receiver_email: z.string().email('Invalid email').optional().or(z.literal('')),
  package_type: z.enum(['DOCUMENT', 'PARCEL', 'FREIGHT', 'VEHICLE']),
  weight: z.number().positive().optional().nullable(),
  dimensions: z.string().optional(),
  description: z.string().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  estimated_delivery: z.string().optional().nullable(),
  current_lat: z.number().min(-90).max(90).optional().nullable(),
  current_lng: z.number().min(-180).max(180).optional().nullable(),
  delivery_price: z.number().min(0).optional().nullable(),
  status: z.enum([
    'PENDING', 'PICKED_UP', 'IN_TRANSIT', 'CUSTOMS_CLEARANCE',
    'OUT_FOR_DELIVERY', 'DELIVERED', 'ON_HOLD', 'CANCELLED'
  ]),
});

export const trackingEventSchema = z.object({
  status: z.enum([
    'PENDING', 'PICKED_UP', 'IN_TRANSIT', 'CUSTOMS_CLEARANCE',
    'OUT_FOR_DELIVERY', 'DELIVERED', 'ON_HOLD', 'CANCELLED'
  ]),
  location: z.string().optional(),
  description: z.string().min(3, 'Description is required'),
  event_timestamp: z.string(),
});

export type ShipmentFormData = z.infer<typeof shipmentSchema>;
export type TrackingEventFormData = z.infer<typeof trackingEventSchema>;
