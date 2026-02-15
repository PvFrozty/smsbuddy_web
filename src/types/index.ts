export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  userProblem: string;
  buddySolution: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  message: string;
  mask: string;
}

export interface SmsPackage {
  code: string;
  name: string;
  price: number;
  smsCount: number;
  perSmsCost: number;
  description?: string;
  highlighted?: boolean;
  color?: "coral" | "navy" | "yellow";
}

/** @deprecated Use SmsPackage instead */
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  credits: number;
  pricePerSms: string;
  totalPrice: string;
  features: string[];
  popular?: boolean;
  color: "coral" | "navy" | "yellow";
}
