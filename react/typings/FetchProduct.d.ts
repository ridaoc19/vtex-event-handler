declare namespace FetchProductType {
	interface FetchProduct {
		productId: string;
		productName: string;
		brand: string;
		brandId: number;
		brandImageUrl: null;
		linkText: string;
		productReference: string;
		productReferenceCode: string;
		categoryId: string;
		productTitle: null;
		metaTagDescription: string;
		releaseDate: string;
		clusterHighlights: ClusterHighlights;
		productClusters: ProductClusters;
		searchableClusters: SearchableClusters;
		categories: string[];
		categoriesIds: string[];
		link: string;
		HDMI: string[];
		Modelo: string[];
		Bluetooth: string[];
		Color: string[];
		allSpecifications: string[];
		allSpecificationsGroups: string[];
		description: string;
		items: Item[];
	}

	interface Item {
		itemId: string;
		name: string;
		nameComplete: string;
		complementName: string;
		ean: string;
		measurementUnit: string;
		unitMultiplier: number;
		modalType: null;
		isKit: boolean;
		images: Image[];
		sellers: Seller[];
		Videos: unknown[];
		estimatedDateArrival: null;
	}

	interface Seller {
		sellerId: string;
		sellerName: string;
		addToCartLink: string;
		sellerDefault: boolean;
		commertialOffer: CommertialOffer;
	}

	interface CommertialOffer {
		DeliverySlaSamplesPerRegion: DeliverySlaSamplesPerRegion;
		Installments: Installment[];
		DiscountHighLight: unknown[];
		GiftSkuIds: unknown[];
		Teasers: unknown[];
		PromotionTeasers: unknown[];
		BuyTogether: unknown[];
		ItemMetadataAttachment: unknown[];
		Price: number;
		ListPrice: number;
		PriceWithoutDiscount: number;
		FullSellingPrice: null | number;
		RewardValue: number;
		PriceValidUntil: null;
		AvailableQuantity: number;
		IsAvailable: boolean;
		Tax: number;
		DeliverySlaSamples: _0[];
		GetInfoErrorMessage: null | string;
		CacheVersionUsedToCallCheckout: string;
		PaymentOptions: PaymentOptions;
	}

	interface PaymentOptions {
		installmentOptions: InstallmentOption[];
		paymentSystems: PaymentSystem[];
		payments: unknown[];
		giftCards: unknown[];
		giftCardMessages: unknown[];
		availableAccounts: unknown[];
		availableTokens: unknown[];
	}

	interface PaymentSystem {
		id: number;
		name: string;
		groupName: string;
		validator: null;
		stringId: string;
		template: string;
		requiresDocument: boolean;
		isCustom: boolean;
		description: null | string;
		requiresAuthentication: boolean;
		dueDate: string;
		availablePayments: null;
	}

	interface InstallmentOption {
		paymentSystem: string;
		bin: null;
		paymentName: string;
		paymentGroupName: string;
		value: number;
		installments: Installment2[];
	}

	interface Installment2 {
		count: number;
		hasInterestRate: boolean;
		interestRate: number;
		value: number;
		total: number;
		sellerMerchantInstallments: SellerMerchantInstallment[];
	}

	interface SellerMerchantInstallment {
		id: string;
		count: number;
		hasInterestRate: boolean;
		interestRate: number;
		value: number;
		total: number;
	}

	interface Installment {
		Value: number;
		InterestRate: number;
		TotalValuePlusInterestRate: number;
		NumberOfInstallments: number;
		PaymentSystemName: string;
		PaymentSystemGroupName: string;
		Name: string;
	}

	type DeliverySlaSamplesPerRegion = Record<string, string>;

	interface Image {
		imageId: string;
		imageLabel: null;
		imageTag: string;
		imageUrl: string;
		imageText: string;
		imageLastModified: string;
	}

	type SearchableClusters = Record<string, string>;
	type ProductClusters = Record<string, string>;
	type ClusterHighlights = unknown;
}
