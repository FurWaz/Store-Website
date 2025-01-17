<template>
    <div class="flex grow min-h-full h-fit w-full min-w-0 max-w-full min-h-0 max-h-full">
        <div class="show-right hidden md:flex flex-col grow min-w-fit min-h-0 max-h-full pl-2 pr-8 overflow-y-scroll space-y-8">
            <h1> {{ $t('products.filters') }} </h1>

            <div class="flex flex-col space-y-2">
                <h2> {{ $t('products.categories') }} </h2>
                <div class="flex flex-col space-y-2">
                    <div v-for="categ in categories" class="flex space-x-4 justify-start items-center">
                        <UCheckbox :name="categ.name" v-model="(filters as any).categories[categ.name]" />
                        <p> {{ categ.label || categ.name }} </p>
                    </div>
                </div>
            </div>

            <div class="flex flex-col space-y-2">
                <h2> {{ $t('products.types.title') }} </h2>
                <div class="flex flex-col space-y-2">
                    <div v-for="type in types" class="flex space-x-4 justify-start items-center">
                        <UCheckbox :name="type.name" v-model="(filters as any).type[type.name]" />
                        <p> {{ $t('products.types.' + type.name) }} </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="show-right hidden md:flex  grow w-fit px-1">
            <span class="flex grow w-1 bg-slate-200 dark:bg-slate-600 rounded-lg" />
        </div>
        <div class="flex flex-col w-full min-w-0 max-w-full px-2 space-y-2 overflow-y-auto">
            <div class="show-down flex w-full flex-col space-y-2">
                <h1> {{ $t('products.products') }} </h1>
                <div class="flex flex-col lg:flex-row w-full justify-between items-start lg:items-center space-y-2 lg:space-y-0">
                    <div class="flex space-x-2">
                        <UInput v-model="search" :placeholder="$t('verbs.search')" />
                        <UButton icon="i-heroicons-magnifying-glass"> {{ $t('verbs.search') }} </UButton>
                    </div>

                    <!-- TODO : Not working for now -->
                    <!-- <div class="flex space-x-2 justify-end items-center">
                        <p> {{ $t('products.orderBy.title') }} :</p>
                        <USelect name="order" value="recent" :options="orderOptions" />
                    </div> -->
                </div>
            </div>
            <div class="flex px-2 min-h-0 max-h-full pt-8">
                <div class="flex flex-col space-y-8 h-fit min-w-0 max-w-full">
                    <div v-for="categ in filterCategories()" v-show="getProducts(categ.name).length" class="show-up flex flex-col space-y-2">
                        <h2> {{ categ.label ?? '- - -' }} </h2>
                        <div class="flex h-fit w-full max-w-full min-w-0 overflow-x-auto p-4">
                            <div class="flex min-w-fit space-x-12 overflow-y-hidden py-2">
                                <ProductCard v-for="product in getProducts(categ.name)" :key="product.id" :product="product" />
                            </div>
                        </div>
                    </div>
                </div>

                <div v-show="!hasProducts() && !isLoading() && !isError" class="show-up flex flex-col justify-center items-center w-full h-32 space-y-2">
                    <h2 class="text-center"> {{ $t('products.noProducts.title') }} </h2>
                    <p class="text-center"> {{ $t('products.noProducts.description') }} </p>
                </div>

                <div v-show="!hasProducts() && isLoading()" class="show-up flex flex-col justify-center items-center w-full h-32 space-y-2">
                    <h2 class="text-center"> {{ $t('products.loading.title') }} </h2>
                    <p class="text-center"> {{ $t('products.loading.description') }} </p>
                </div>

                <div v-show="!hasProducts() && isError()" class="show-up flex flex-col justify-center items-center w-full h-32 space-y-2">
                    <h2 class="text-center"> {{ $t('products.error.title') }} </h2>
                    <p class="text-center"> {{ $t('products.error.description') }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n();

useSeoMeta({
    title: `${t('store.title')} - ${t('products.title')}`,
    description: `${t('products.description')}`,
    ogTitle: `${t('store.title')} - ${t('products.title')}`,
    ogDescription: `${t('products.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://store.furwaz.com' + route.fullPath
});

const search = ref('');

const orderOptions = ref<any[]>([]);
function setOrderOptions() {
    orderOptions.value = [
        { value: 'recent', label: t('products.orderBy.mostRecent') },
        { value: 'popular', label: t('products.orderBy.mostPopular') },
        { value: 'price-asc', label: t('products.orderBy.priceAsc') },
        { value: 'price-desc', label: t('products.orderBy.priceDesc') },
        { value: 'name', label: t('products.orderBy.name') },
    ];
}
watch(() => locale.value, setOrderOptions);
setOrderOptions();

type ProductCategory = { id: number; name: string; furwazId: number, label: string; };
const categories = ref<ProductCategory[]>([]);
async function fetchCategories() {
    const res = await API.Request(ROUTES.STORE.CATEGORIES.GET());
    if (res.error) {
        return console.error(res.error);
    }
    categories.value = [];
    for await (const categ of res.data.categories) {
        const labelRes = await API.Request(ROUTES.FURWAZ.APP.GET(categ.furwazId));
        if (labelRes.error) {
            console.error('Error fetching app name for category', categ.name, labelRes.message);
        }
        let label = labelRes.error ? '' : labelRes.data.name;
        
        categories.value.push({
            id: categ.id,
            name: categ.name,
            furwazId: categ.furwazId,
            label: label,
        });
    }
}

type ProductType = { id: number; name: string; };
const types = ref<ProductType[]>([]);
async function fetchTypes() {
    const res = await API.Request(ROUTES.STORE.TYPES.GET());
    if (res.error) {
        return console.error(res.error);
    }
    types.value = res.data.types;
}

type ProductInfos = {
    id: number;
    category: string;
    image: string;
    type: string;
    title: string;
    description: string;
    price: number;
    available?: boolean;
};
const products = ref<ProductInfos[]|undefined|null>(undefined);
async function fetchProducts() {
    const productRes = await API.Request(ROUTES.STORE.PRODUCTS.GET());
    products.value = [];

    for await (const product of productRes.data.products) {
        products.value.push({
            id: product.id,
            category: categories.value.find((categ) => categ.id === product.categoryId)?.name || '',
            type: types.value.find((type) => type.id === product.typeId)?.name || '',
            image: product.image,
            title: product.title,
            description: product.description,
            price: product.price,
            available: product.available,
        });
    }
}

onMounted(async () => {
    try {
        await fetchTypes();
        await fetchCategories();
        await fetchProducts();
    } catch (error) {
        products.value = null;
        console.error(error);
    }
});

const filters = ref({
    categories: {
        fullbowody: false,
        tny360: false,
        pypoll: false,
        vybeen: false,
    },
    type: {
        physical: false,
        service: false,
        subscription: false,
    },
});

function filterCategories() {
    const hasFilteredCategs = Object.values(filters.value.categories).some((value) => value);

    return categories.value.filter((categ) =>
        hasFilteredCategs ? (filters.value as any).categories[categ.name] : true
    );
}

function getProducts(category?: string) {
    if (!products.value) return [];

    let filteredProducts = products.value;

    // select only products of this category
    filteredProducts = filteredProducts.filter((product: any) =>
        category ? product.category === category : true
    );

    // filter products by type if any type is selected
    const hasFilteredTypes = Object.values(filters.value.type).some((value) => value);
    filteredProducts = filteredProducts.filter((product: any) =>
        hasFilteredTypes ? (filters.value as any).type[product.type] : true
    );

    // filter products by search
    const searchWords = search.value.split(' ').filter((word) => word.length);
    filteredProducts = filteredProducts.filter((product: any) =>
        searchWords.every((word) =>
            product.title.toLowerCase().includes(word.toLowerCase()) ||
            product.description.toLowerCase().includes(word.toLowerCase()) ||
            product.category.toLowerCase().includes(word.toLowerCase()) ||
            product.type.toLowerCase().includes(word.toLowerCase())
        ) || !searchWords.length
    );

    // return matching products 
    return filteredProducts;
}

function hasProducts() {
    return filterCategories().some((categ) => getProducts(categ.name).length);
}

function isLoading() {
    return products.value === undefined;
}

function isError() {
    return products.value === null;
}
</script>