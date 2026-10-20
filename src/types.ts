export type NavigationTab =
  | 'accueil'
  | 'activite'
  | 'envoyer-et-demander'
  | 'portefeuille'
  | 'offres'
  | 'aide';

export type ViewMode = 'desktop' | 'mobile';

export interface Transaction {
  id: string;
  name: string;
  type: 'received' | 'sent' | 'refund' | 'subscription';
  category: string;
  amount: number;
  currency: 'USD' | 'EUR';
  dateStr: string;
  timeStr?: string;
  dateGroup: 'Aujourd\'hui' | 'Hier' | 'Ce mois-ci' | 'Antérieur';
  status: 'Terminé' | 'En attente de compensation' | 'Remboursé' | 'Sous séquestre';
  email: string;
  paymentSource: string;
  fee: string;
  iconType: 'store' | 'headphones' | 'shopping' | 'person' | 'refund' | 'payments' | 'restaurant' | 'paypal';
  avatarUrl?: string;
}

export interface Contact {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  email: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'balance';
  brand?: 'visa' | 'mastercard';
  last4?: string;
  holder?: string;
  expiry?: string;
  bankName?: string;
  isPreferred?: boolean;
  isDefault?: boolean;
  statusBadge?: string;
  amount?: number;
  currency?: 'USD' | 'EUR';
}

export interface DisputeItem {
  id: string;
  caseNumber: string;
  merchantName: string;
  date: string;
  amount: string;
  status: string;
  resolution: string;
}

export interface OfferItem {
  id: string;
  brand: string;
  category: string;
  cashback: string;
  description: string;
  logo: string;
  expiry: string;
  activated: boolean;
}
