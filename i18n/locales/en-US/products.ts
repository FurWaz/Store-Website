export default {
    name: 'Products',
    title: 'Discover all products of FurWaz applications and services.',
    description: 'Discover all the products available on the FurWaz store, filtered by category, type, and more.',
    products: 'Products',
    filters: 'Filters',
    categories: 'Categories',
    types: {
        title: 'Types',
        physical: 'Physical product',
        software: 'Software',
        service: 'Service',
        subscription: 'Subscription',
    },
    orderBy: {
        title: 'Sort by',
        mostRecent: 'Most recent',
        mostPopular: 'Most popular',
        priceAsc: 'Price ascending',
        priceDesc: 'Price descending',
        name: 'Name',
    },
    addToCart: 'Add to cart',
    noProducts: {
        title: 'No products found',
        description: 'Sorry, we couldn\'t find any products matching your search.',
    },
    loading: {
        title: 'Loading products',
        description: 'Loading products available on the FurWaz store...',
    },
    error: {
        title: 'Error loading products',
        description: 'An error occurred while loading the products. Please try again later.',
    }
}