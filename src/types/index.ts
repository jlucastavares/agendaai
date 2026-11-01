export type Business = { id: string; name: string; slug: string; owner_id: string };
export type Service = { id: string; business_id: string; name: string; duration_min: number; price_cents: number };
export type Professional = { id: string; business_id: string; name: string };
export type Appointment = {
  id: string;
  business_id: string;
  service_id: string;
  professional_id: string;
  customer_name: string;
  customer_phone: string;
  starts_at: string;
  ends_at: string;
  status: "confirmado" | "cancelado" | "concluido";
};
