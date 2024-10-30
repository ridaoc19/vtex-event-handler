declare namespace OrderFormType {
	interface OrderForm {
		id: string;
		items: Item[];
		value: number;
		totalizers: Totalizer[];
		marketingData: MarketingData;
		canEditData: boolean;
		loggedIn: boolean;
		paymentData: PaymentData;
		messages: Messages;
		shipping: Shipping;
		userProfileId: string;
		userType: string;
		clientProfileData: ClientProfileData;
		clientPreferencesData: ClientPreferencesData;
		allowManualPrice: boolean;
		customData: null;
		__typename: string;
	}

	interface ClientPreferencesData {
		locale: string;
		optInNewsletter: boolean;
		__typename: string;
	}

	interface ClientProfileData {
		email: string;
		firstName: string;
		lastName: string;
		document: null;
		documentType: null;
		phone: string;
		isValid: boolean;
		__typename: string;
	}

	interface Shipping {
		countries: string[];
		availableAddresses: AvailableAddress[];
		selectedAddress: AvailableAddress;
		deliveryOptions: DeliveryOption[];
		pickupOptions: unknown[];
		isValid: boolean;
		__typename: string;
	}

	interface DeliveryOption {
		id: string;
		deliveryChannel: string;
		price: number;
		estimate: string;
		isSelected: boolean;
		__typename: string;
	}

	interface AvailableAddress {
		addressId: string;
		addressType: string;
		city: string;
		complement: string;
		country: string;
		neighborhood: string;
		number: string;
		postalCode: string;
		receiverName: string;
		reference: string;
		state: string;
		street: string;
		isDisposable: boolean;
		geoCoordinates: number[];
		__typename: string;
	}

	interface Messages {
		couponMessages: unknown[];
		generalMessages: unknown[];
		__typename: string;
	}

	interface PaymentData {
		paymentSystems: PaymentSystem[];
		payments: unknown[];
		installmentOptions: InstallmentOption[];
		availableAccounts: unknown[];
		isValid: boolean;
		__typename: string;
	}

	interface InstallmentOption {
		paymentSystem: string;
		installments: Installment[];
		__typename: string;
	}

	interface Installment {
		count: number;
		hasInterestRate: boolean;
		interestRate: number;
		value: number;
		total: number;
		__typename: string;
	}

	interface PaymentSystem {
		id: string;
		name: string;
		groupName: string;
		validator: Validator;
		stringId: string;
		requiresDocument: boolean;
		isCustom: boolean;
		description: null | string;
		requiresAuthentication: boolean;
		dueDate: string;
		__typename: string;
	}

	interface Validator {
		regex: null | string;
		mask: null | string;
		cardCodeRegex: null | string;
		cardCodeMask: null | string;
		weights: number[] | null;
		useCvv: boolean;
		useExpirationDate: boolean;
		useCardHolderName: boolean;
		useBillingAddress: boolean;
		__typename: string;
	}

	interface MarketingData {
		coupon: string;
		utmCampaign: string;
		utmMedium: string;
		utmSource: string;
		utmiCampaign: string;
		utmiPart: string;
		utmiPage: string;
		__typename: string;
	}

	interface Totalizer {
		id: string;
		name: string;
		value: number;
		__typename: string;
	}

	interface Item {
		additionalInfo: AdditionalInfo;
		attachments: unknown[];
		attachmentOfferings: unknown[];
		bundleItems: unknown[];
		parentAssemblyBinding: null;
		parentItemIndex: null;
		sellingPriceWithAssemblies: null;
		options: null;
		availability: string;
		detailUrl: string;
		id: string;
		imageUrls: ImageUrls;
		listPrice: number;
		manualPrice: null;
		measurementUnit: string;
		modalType: null;
		name: string;
		offerings: unknown[];
		price: number;
		priceTags: unknown[];
		productCategories: ProductCategories;
		productCategoryIds: string;
		productRefId: null | string;
		productId: string;
		quantity: number;
		seller: string;
		sellingPrice: number;
		skuName: string;
		skuSpecifications: SkuSpecification[];
		unitMultiplier: number;
		uniqueId: string;
		refId: null | string;
		isGift: boolean;
		priceDefinition: PriceDefinition;
		__typename: string;
	}

	interface PriceDefinition {
		calculatedSellingPrice: number;
		total: number;
		sellingPrices: SellingPrice[];
		__typename: string;
	}

	interface SellingPrice {
		quantity: number;
		value: number;
		__typename: string;
	}

	interface SkuSpecification {
		fieldName: string;
		fieldValues: string[];
		__typename: string;
	}

	type ProductCategories = Record<string, string>;

	interface ImageUrls {
		at1x: string;
		at2x: string;
		at3x: string;
		__typename: string;
	}

	interface AdditionalInfo {
		brandName: string;
		__typename: string;
	}
}
