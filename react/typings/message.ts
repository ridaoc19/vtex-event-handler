import { MapEventsClick } from '../hooks/useClickElektraGTM/type';
import { MapEventsMessage } from '../hooks/useMessageElektraGTM/helper/type';

// eslint-disable-next-line no-restricted-syntax
export enum KeyMessage {
	promoView = 'vtex:promoView',
	productView = 'vtex:productView',
	pageView = 'vtex:pageView',
	pageInfo = 'vtex:pageInfo',
	userData = 'vtex:userData',
	cartId = 'vtex:cartId',
	productImpression = 'vtex:productImpression',
	menuClick = 'vtex:menuClick',
	clpView = 'vtex:clpView',
	clpClick = 'vtex:clpClick',
	categoryView = 'vtex:categoryView',
	productClick = 'vtex:productClick',
	promotionClick = 'vtex:promotionClick',
	internalSiteSearchView = 'vtex:internalSiteSearchView',
	autocomplete = 'vtex:autocomplete',
	search = 'vtex:search',
	emptySearchView = 'vtex:emptySearchView',
	// addToCart = 'vtex:addToCart',
	modalData = 'vtex:modalData',
}

// eslint-disable-next-line no-restricted-syntax
export enum RouteId {
	Home = 'store.home',
	Product = 'store.product',
	Search = 'store.search',
	SearchBrand = 'store.search#brand',
	SearchDepartment = 'store.search#department',
	SearchCategory = 'store.search#category',
	SearchSubcategory = 'store.search#subcategory',
}

export type MapMessage = {
	[KeyMessage.modalData]: {
		event: KeyMessage.modalData;
		data: TotalMapEvents[keyof TotalMapEvents] & { 'gtm.uniqueEventId': number };
	};
	[KeyMessage.promoView]: {
		currency: string;
		eventName: KeyMessage.promoView;
		event: string;
		promotions: Array<{
			id: string;
			name: string;
			creative: string;
			position: string;
		}>;
	};
	[KeyMessage.productView]: {
		currency: string;
		eventName: string;
		event: string;
		product: {
			detailUrl: string;
			brand: string;
			brandId: number;
			productReference: string;
			linkText: string;
			categoryId: string;
			categories: string[];
			categoryTree: Array<{
				id: number;
				name: string;
				href: string;
				__typename: string;
			}>;
			productId: string;
			productName: string;
			items: Array<{
				itemId: string;
				name: string;
				ean: string;
				referenceId: null;
				imageUrl: string;
				sellers: Array<{
					sellerId: string;
					sellerName: string;
					sellerDefault: boolean;
					commertialOffer: {
						Price: number;
						ListPrice: number;
						AvailableQuantity: number;
						PriceWithoutDiscount: number;
					};
				}>;
			}>;
			selectedSku: {
				itemId: string;
				name: string;
				ean: string;
				referenceId: null;
				imageUrl: string;
				sellers: Array<{
					sellerId: string;
					sellerName: string;
					sellerDefault: boolean;
					commertialOffer: {
						Price: number;
						ListPrice: number;
						AvailableQuantity: number;
						PriceWithoutDiscount: number;
					};
				}>;
			};
		};
		list: string;
	};
	[KeyMessage.pageView]: {
		currency: string;
		eventName: string;
		event: string;
		pageTitle: string;
		pageUrl: string;
		accountName: string;
		routeId: RouteId;
	};
	[KeyMessage.pageInfo]: {
		currency: string;
		eventName: string;
		event: string;
		eventType: string;
		accountName: string;
		pageTitle: string;
		pageUrl: string;
		pageCategory: string;
	};
	[KeyMessage.userData]: {
		currency: string;
		eventName: string;
		event: string;
		isAuthenticated: boolean;
	};
	[KeyMessage.cartId]: {
		currency: string;
		eventName: string;
		event: string;
		cartId: string;
	};
	[KeyMessage.productImpression]: {
		currency: string;
		eventName: string;
		eventType: string;
		event: string;
		list: string;
		impressions: Array<{
			product: {
				cacheId: string;
				productId: string;
				productName: string;
				productReference: null;
				description: string;
				link: string;
				linkText: string;
				brand: string;
				brandId: number;
				categories: string[];
				priceRange: {
					sellingPrice: {
						highPrice: number;
						lowPrice: number;
						__typename: string;
					};
					listPrice: {
						highPrice: number;
						lowPrice: number;
						__typename: string;
					};
					__typename: string;
				};
				specificationGroups: Array<{
					name: string;
					originalName: string;
					specifications: Array<{
						name: string;
						originalName: string;
						values: string[];
						__typename: string;
					}>;
					__typename: string;
				}>;
				skuSpecifications: string[];
				items: Array<{
					name: string;
					itemId: string;
					measurementUnit: string;
					unitMultiplier: number;
					referenceId: Array<{
						Value: string;
						__typename: string;
					}>;
					images: Array<{
						imageUrl: string;
						imageTag: string;
						imageLabel: string;
						__typename: string;
					}>;
					variations: string[];
					sellers: Array<{
						sellerId: string;
						sellerName: string;
						commertialOffer: {
							Installments: Array<{
								Value: number;
								InterestRate: number;
								TotalValuePlusInterestRate: number;
								NumberOfInstallments: number;
								Name: string;
								__typename: string;
							}>;
							AvailableQuantity: number;
							Price: number;
							PriceWithoutDiscount: number;
							ListPrice: number;
							spotPrice: number;
							Tax: number;
							taxPercentage: number;
							teasers: string[];
							discountHighlights: string[];
							__typename: string;
						};
						__typename: string;
					}>;
					__typename: string;
				}>;
				productClusters: Array<{
					id: string;
					name: string;
					__typename: string;
				}>;
				properties: Array<{
					name: string;
					values: string[];
					__typename: string;
				}>;
				__typename: string;
				sku: {
					name: string;
					itemId: string;
					measurementUnit: string;
					unitMultiplier: number;
					referenceId: {
						Value: string;
						__typename: string;
					};
					images: Array<{
						imageUrl: string;
						imageTag: string;
						imageLabel: string;
						__typename: string;
					}>;
					variations: string[];
					sellers: Array<{
						sellerId: string;
						sellerName: string;
						commertialOffer: {
							Installments: Array<{
								Value: number;
								InterestRate: number;
								TotalValuePlusInterestRate: number;
								NumberOfInstallments: number;
								Name: string;
								__typename: string;
							}>;
							AvailableQuantity: number;
							Price: number;
							PriceWithoutDiscount: number;
							ListPrice: number;
							spotPrice: number;
							Tax: number;
							taxPercentage: number;
							teasers: string[];
							discountHighlights: string[];
							__typename: string;
						};
						__typename: string;
					}>;
					__typename: string;
					seller: {
						sellerId: string;
						sellerName: string;
						commertialOffer: {
							Installments: string[];
							AvailableQuantity: number;
							Price: number;
							PriceWithoutDiscount: number;
							ListPrice: number;
							spotPrice: number;
							Tax: number;
							taxPercentage: number;
							teasers: string[];
							discountHighlights: string[];
							__typename: string;
						};
						__typename: string;
					};
					image: {
						imageUrl: string;
						imageTag: string;
						imageLabel: string;
						__typename: string;
					};
				};
			};
			position: number;
		}>;
	};
	[KeyMessage.menuClick]: {
		currency: string;
		eventName: string;
		event: string;
		eventType: string;
		item_name: string;
		item_category: string;
		item_category2: string;
		item_category3: string;
		page_location: string;
		page_referrer: string;
		page_title: string;
		index: number;
	};
	[KeyMessage.clpView]: {
		currency: string;
		eventName: string;
		event: string;
		eventType: string;
		ecommerce: {
			item_category: string;
			item_category2: string;
			item_category3: string;
			item_category4: string;
			department_id: string;
			department_name: string;
		};
	};
	[KeyMessage.clpClick]: {
		currency: string;
		eventName: string;
		event: string;
		eventType: string;
		ecommerce: {
			event: string;
			page_type: string;
			index: number;
			card_name: string;
			item_category: string;
			item_category2: string;
			item_category3: string;
			item_category4: string;
			department_id: string;
			department_name: string;
		};
	};
	[KeyMessage.categoryView]: {
		currency: string;
		eventName: string;
		event: string;
		products: Array<{
			advertisement: null;
			cacheId: string;
			productId: string;
			description: string;
			productName: string;
			productReference: string;
			linkText: string;
			brand: string;
			brandId: number;
			link: string;
			categories: string[];
			categoryId: string;
			releaseDate: string;
			priceRange: {
				sellingPrice: {
					highPrice: number;
					lowPrice: number;
					__typename: string;
				};
				listPrice: {
					highPrice: number;
					lowPrice: number;
					__typename: string;
				};
				__typename: string;
			};
			specificationGroups: Array<{
				name: string;
				originalName: string;
				specifications: Array<{
					name: string;
					originalName: string;
					values: string[];
					__typename: string;
				}>;
				__typename: string;
			}>;
			skuSpecifications: string[];
			productClusters: Array<{
				id: string;
				name: string;
				__typename: string;
			}>;
			clusterHighlights: Array<{
				id: string;
				name: string;
				__typename: string;
			}>;
			properties: Array<{
				name: string;
				values: string[];
				__typename: string;
			}>;
			__typename: string;
			items: Array<{
				itemId: string;
				name: string;
				nameComplete: string;
				complementName: string;
				ean: string;
				variations: string[];
				referenceId: Array<{
					Key: string;
					Value: string;
					__typename: string;
				}>;
				measurementUnit: string;
				unitMultiplier: number;
				images: Array<{
					cacheId: string;
					imageId: string;
					imageLabel: string;
					imageTag: string;
					imageUrl: string;
					imageText: string;
					__typename: string;
				}>;
				__typename: string;
				sellers: Array<{
					sellerId: string;
					sellerName: string;
					sellerDefault: boolean;
					__typename: string;
					commertialOffer: {
						discountHighlights: string[];
						teasers: string[];
						Price: number;
						ListPrice: number;
						Tax: number;
						taxPercentage: number;
						spotPrice: number;
						PriceWithoutDiscount: number;
						RewardValue: number;
						PriceValidUntil: string;
						AvailableQuantity: number;
						__typename: string;
						Installments: Array<{
							Value: number;
							InterestRate: number;
							TotalValuePlusInterestRate: number;
							NumberOfInstallments: number;
							Name: string;
							PaymentSystemName: string;
							__typename: string;
						}>;
					};
				}>;
			}>;
			selectedProperties: null;
			rule: {
				id: string;
				__typename: string;
			} | null;
		}>;
	};
	// [KeyMessage.productClick]: {
	// 	currency: string;
	// 	eventName: string;
	// 	event: string;
	// 	product: {
	// 		advertisement: null;
	// 		cacheId: string;
	// 		productId: string;
	// 		description: string;
	// 		productName: string;
	// 		productReference: string;
	// 		linkText: string;
	// 		brand: string;
	// 		brandId: number;
	// 		link: string;
	// 		categories: string[];
	// 		categoryId: string;
	// 		releaseDate: string;
	// 		priceRange: {
	// 			sellingPrice: {
	// 				highPrice: number;
	// 				lowPrice: number;
	// 				__typename: string;
	// 			};
	// 			listPrice: {
	// 				highPrice: number;
	// 				lowPrice: number;
	// 				__typename: string;
	// 			};
	// 			__typename: string;
	// 		};
	// 		specificationGroups: Array<{
	// 			name: string;
	// 			originalName: string;
	// 			specifications: Array<{
	// 				name: string;
	// 				originalName: string;
	// 				values: string[];
	// 				__typename: string;
	// 			}>;
	// 			__typename: string;
	// 		}>;
	// 		skuSpecifications: string[];
	// 		productClusters: Array<{
	// 			id: string;
	// 			name: string;
	// 			__typename: string;
	// 		}>;
	// 		clusterHighlights: Array<{
	// 			id: string;
	// 			name: string;
	// 			__typename: string;
	// 		}>;
	// 		properties: Array<{
	// 			name: string;
	// 			values: string[];
	// 			__typename: string;
	// 		}>;
	// 		__typename: string;
	// 		items: Array<{
	// 			itemId: string;
	// 			name: string;
	// 			nameComplete: string;
	// 			complementName: string;
	// 			ean: string;
	// 			variations: string[];
	// 			referenceId: Array<{
	// 				Key: string;
	// 				Value: string;
	// 				__typename: string;
	// 			}>;
	// 			measurementUnit: string;
	// 			unitMultiplier: number;
	// 			images: Array<{
	// 				cacheId: string;
	// 				imageId: string;
	// 				imageLabel: string;
	// 				imageTag: string;
	// 				imageUrl: string;
	// 				imageText: string;
	// 				__typename: string;
	// 			}>;
	// 			__typename: string;
	// 			sellers: Array<{
	// 				sellerId: string;
	// 				sellerName: string;
	// 				sellerDefault: boolean;
	// 				__typename: string;
	// 				commertialOffer: {
	// 					discountHighlights: string[];
	// 					teasers: string[];
	// 					Price: number;
	// 					ListPrice: number;
	// 					Tax: number;
	// 					taxPercentage: number;
	// 					spotPrice: number;
	// 					PriceWithoutDiscount: number;
	// 					RewardValue: number;
	// 					PriceValidUntil: string;
	// 					AvailableQuantity: number;
	// 					__typename: string;
	// 					Installments: Array<{
	// 						Value: number;
	// 						InterestRate: number;
	// 						TotalValuePlusInterestRate: number;
	// 						NumberOfInstallments: number;
	// 						Name: string;
	// 						PaymentSystemName: string;
	// 						__typename: string;
	// 					}>;
	// 				};
	// 			}>;
	// 		}>;
	// 		selectedProperties: null;
	// 		rule: {
	// 			id: string;
	// 			__typename: string;
	// 		};
	// 		sku: {
	// 			itemId: string;
	// 			name: string;
	// 			nameComplete: string;
	// 			complementName: string;
	// 			ean: string;
	// 			variations: string[];
	// 			referenceId: {
	// 				Key: string;
	// 				Value: string;
	// 				__typename: string;
	// 			};
	// 			measurementUnit: string;
	// 			unitMultiplier: number;
	// 			images: Array<{
	// 				cacheId: string;
	// 				imageId: string;
	// 				imageLabel: string;
	// 				imageTag: string;
	// 				imageUrl: string;
	// 				imageText: string;
	// 				__typename: string;
	// 			}>;
	// 			__typename: string;
	// 			sellers: Array<{
	// 				sellerId: string;
	// 				sellerName: string;
	// 				sellerDefault: boolean;
	// 				__typename: string;
	// 				commertialOffer: {
	// 					discountHighlights: string[];
	// 					teasers: string[];
	// 					Price: number;
	// 					ListPrice: number;
	// 					Tax: number;
	// 					taxPercentage: number;
	// 					spotPrice: number;
	// 					PriceWithoutDiscount: number;
	// 					RewardValue: number;
	// 					PriceValidUntil: string;
	// 					AvailableQuantity: number;
	// 					__typename: string;
	// 					Installments: Array<{
	// 						Value: number;
	// 						InterestRate: number;
	// 						TotalValuePlusInterestRate: number;
	// 						NumberOfInstallments: number;
	// 						Name: string;
	// 						PaymentSystemName: string;
	// 						__typename: string;
	// 					}>;
	// 				};
	// 			}>;
	// 			seller: {
	// 				sellerId: string;
	// 				sellerName: string;
	// 				sellerDefault: boolean;
	// 				__typename: string;
	// 				commertialOffer: {
	// 					discountHighlights: string[];
	// 					teasers: string[];
	// 					Price: number;
	// 					ListPrice: number;
	// 					Tax: number;
	// 					taxPercentage: number;
	// 					spotPrice: number;
	// 					PriceWithoutDiscount: number;
	// 					RewardValue: number;
	// 					PriceValidUntil: string;
	// 					AvailableQuantity: number;
	// 					__typename: string;
	// 					Installments: Array<{
	// 						Value: number;
	// 						InterestRate: number;
	// 						TotalValuePlusInterestRate: number;
	// 						NumberOfInstallments: number;
	// 						Name: string;
	// 						PaymentSystemName: string;
	// 						__typename: string;
	// 					}>;
	// 				};
	// 			};
	// 			image: {
	// 				cacheId: string;
	// 				imageId: string;
	// 				imageLabel: string;
	// 				imageTag: string;
	// 				imageUrl: string;
	// 				imageText: string;
	// 				__typename: string;
	// 			};
	// 		};
	// 	};
	// 	query: string;
	// 	map: string;
	// 	position: number;
	// 	list: string;
	// };
	[KeyMessage.promotionClick]: {
		currency: string;
		eventName: string;
		event: string;
		promotions: Array<{
			id: string;
			name: string;
			creative: string;
			position: string;
		}>;
	};
	[KeyMessage.internalSiteSearchView]: {
		currency: string;
		eventName: string;
		event: string;
		products: Array<{
			advertisement: null;
			cacheId: string;
			productId: string;
			description: string;
			productName: string;
			productReference: null;
			linkText: string;
			brand: string;
			brandId: number;
			link: string;
			categories: string[];
			categoryId: string;
			releaseDate: string;
			priceRange: {
				sellingPrice: {
					highPrice: number;
					lowPrice: number;
					__typename: string;
				};
				listPrice: {
					highPrice: number;
					lowPrice: number;
					__typename: string;
				};
				__typename: string;
			};
			specificationGroups: Array<{
				name: string;
				originalName: string;
				specifications: Array<{
					name: string;
					originalName: string;
					values: string[];
					__typename: string;
				}>;
				__typename: string;
			}>;
			skuSpecifications: string[];
			productClusters: Array<{
				id: string;
				name: string;
				__typename: string;
			}>;
			clusterHighlights: Array<{
				id: string;
				name: string;
				__typename: string;
			}>;
			properties: Array<{
				name: string;
				values: string[];
				__typename: string;
			}>;
			__typename: string;
			items: Array<{
				itemId: string;
				name: string;
				nameComplete: string;
				complementName: string;
				ean: string;
				variations: string[];
				referenceId: Array<{
					Key: string;
					Value: string;
					__typename: string;
				}>;
				measurementUnit: string;
				unitMultiplier: number;
				images: Array<{
					cacheId: string;
					imageId: string;
					imageLabel: string;
					imageTag: string;
					imageUrl: string;
					imageText: string;
					__typename: string;
				}>;
				__typename: string;
				sellers: Array<{
					sellerId: string;
					sellerName: string;
					sellerDefault: boolean;
					__typename: string;
					commertialOffer: {
						discountHighlights: string[];
						teasers: string[];
						Price: number;
						ListPrice: number;
						Tax: number;
						taxPercentage: number;
						spotPrice: number;
						PriceWithoutDiscount: number;
						RewardValue: number;
						PriceValidUntil: null | null | string;
						AvailableQuantity: number;
						__typename: string;
						Installments: Array<{
							Value: number;
							InterestRate: number;
							TotalValuePlusInterestRate: number;
							NumberOfInstallments: number;
							Name: string;
							PaymentSystemName: string;
							__typename: string;
						}>;
					};
				}>;
			}>;
			selectedProperties: null;
			rule: null;
		}>;
	};
	[KeyMessage.autocomplete]: {
		currency: string;
		eventName: string;
		event: string;
		eventType: string;
		search: {
			operator: string;
			misspelled: null;
			text: string;
			match: number;
		};
	};
	[KeyMessage.search]: {
		currency: string;
		eventName: string;
		event: string;
		term: string;
	};
	[KeyMessage.emptySearchView]: {
		currency: string;
		eventName: string;
		event: string;
		products: [];
	};

	// [KeyMessage.addToCart]: {
	// 	currency: string;
	// 	eventName: string;
	// 	event: string;
	// 	items: Array<{
	// 		index: number;
	// 		id: string;
	// 		ean: string;
	// 		productId: string;
	// 		quantity: number;
	// 		uniqueId: string;
	// 		detailUrl: string;
	// 		name: string;
	// 		brand: string;
	// 		category: string;
	// 		productRefId: string;
	// 		seller: string;
	// 		sellerName: string;
	// 		variant: string;
	// 		skuName: string;
	// 		price: number;
	// 		listPrice: number;
	// 		sellingPrice: number;
	// 		sellingPriceWithAssemblies: number;
	// 		measurementUnit: string;
	// 		skuSpecifications: string[];
	// 		imageUrl: string;
	// 		options: string[];
	// 		assemblyOptions: {
	// 			added: string[];
	// 			removed: string[];
	// 			parentPrice: number;
	// 		};
	// 		referenceId: null;
	// 		weekly: number;
	// 		stockAvailable: boolean;
	// 		shippingAvailable: boolean;
	// 		storeAvailable: boolean;
	// 	}>;
	// 	list: string;
	// };
};

export type TotalMapEvents = MapEventsMessage & MapEventsClick;
