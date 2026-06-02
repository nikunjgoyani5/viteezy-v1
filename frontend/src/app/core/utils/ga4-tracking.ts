declare var window: any;

export interface Ga4ItemInput {
  id?: number | string;
  item_id?: number | string;
  name?: string;
  item_name?: string;
  price?: number;
  quantity?: number;
  category?: string;
  item_category?: string;
  code?: string;
  sku?: string;
  item_variant?: string;
}

export interface Ga4EcommerceEventOptions {
  items?: Ga4ItemInput[];
  singleItem?: Ga4ItemInput;
  currency?: string;
  value?: number;
  transactionId?: string;
  tax?: number;
  userId?: string;
  email?: string;
}

const INGREDIENT_CATEGORY_BY_CODE: Record<string, string> = {
  'iron': 'Mineralen',
  'vitamin-b12': 'Vitamines',
  'vitamin-c': 'Vitamines',
  'vitamin-d': 'Vitamines',
  'magnesium': 'Mineralen',
  'zinc': 'Mineralen',
  'green-tea-extract': 'Kruiden',
  'kurkuma': 'Kruiden',
  'fish-oil': 'Specialiteiten',
  'omega-three-vegan': 'Specialiteiten',
  'cranberry': 'Kruiden',
  'sleep-formula': 'Specialiteiten',
  'energy-formula': 'Specialiteiten',
  'stress-formula': 'Specialiteiten',
  'prenatal-multi': 'Specialiteiten',
  'detox-formula': 'Specialiteiten',
  'hair-and-nail-formula': 'Specialiteiten',
  'skin-formula': 'Specialiteiten',
  'libido-formula': 'Specialiteiten',
  'gut-support': 'Specialiteiten',
  'brain-boost': 'Specialiteiten',
  'hormone-control': 'Specialiteiten',
};

export function resolveItemCategory(input: Ga4ItemInput): string | undefined {
  if (input.item_category) {
    return input.item_category;
  }
  if (input.category) {
    return input.category;
  }
  if (input.code) {
    return INGREDIENT_CATEGORY_BY_CODE[input.code];
  }
  return undefined;
}

export function buildGa4Item(input: Ga4ItemInput): Record<string, unknown> {
  const itemId = input.item_id ?? input.id ?? input.sku;
  const itemName = input.item_name ?? input.name;
  const item: Record<string, unknown> = {
    item_id: itemId != null ? String(itemId) : undefined,
    item_name: itemName,
    price: input.price ?? 0,
    quantity: input.quantity ?? 1,
  };
  const category = resolveItemCategory(input);
  if (category) {
    item.item_category = category;
  }
  if (input.item_variant) {
    item.item_variant = input.item_variant;
  }
  return item;
}

export function computeEcommerceValue(items: Array<Record<string, unknown>>): number {
  return items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + (price * quantity);
  }, 0);
}

export function pushGa4EcommerceEvent(eventName: string, options: Ga4EcommerceEventOptions = {}): void {
  const currency = options.currency ?? 'EUR';
  const items = options.singleItem
    ? [buildGa4Item(options.singleItem)]
    : (options.items ?? []).map(buildGa4Item);
  const value = options.value ?? computeEcommerceValue(items);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });

  const ecommerce: Record<string, unknown> = {
    currency,
    value,
    items,
  };

  if (options.transactionId) {
    ecommerce.transaction_id = options.transactionId;
  }
  if (options.tax != null) {
    ecommerce.tax = options.tax;
  }

  const payload: Record<string, unknown> = {
    event: eventName,
    ecommerce,
  };

  if (options.userId) {
    payload.userId = options.userId;
  }
  if (options.email) {
    payload.email = options.email;
  }

  window.dataLayer.push(payload);
}

window.pushGa4EcommerceEvent = pushGa4EcommerceEvent;
window.buildGa4Item = buildGa4Item;
