<template>
    <div class="py-8 px-4">
        <div v-if="!error">
            <h1> {{ t('order.adding', { product: productName }) }} </h1>
        </div>
        <div v-if="error">
            <h1> {{ t('order.error.title') }} </h1>
            <p> {{ error }} </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const productName = ref<string|undefined>(undefined);
const productDescription = ref<string|undefined>(undefined);

const error = ref<string|null>(null);
const productId = route.query.id as string;
if (!productId) {
    error.value = t('order.error.id');
} else {
    const productIdNumber = parseInt(productId);
    if (isNaN(productIdNumber)) {
        error.value = t('order.error.nan');
    }

    try {
        const res = await API.Request(ROUTES.STORE.PRODUCTS.GET(productIdNumber));
        if (res.error) {
            if (res.status === 404) {
                error.value = t('order.error.notFound');
            } else {
                error.value = t('order.error.unknown');
            }
            console.error(res.message);
        }

        console.log(res.data);

        productName.value = res.data.product.title as string
        productDescription.value = res.data.product.description as string
    } catch (e) {
        error.value = t('order.error.unknown');
        console.error(e);
    }

    useSeoMeta({
        title: `${t('store.title')} - ${productName.value}`,
        description: `${productName.value} - ${productDescription.value}`,
        ogTitle: `${t('store.title')} - ${productName.value}`,
        ogDescription: `${productName.value} - ${productDescription.value}`,
        ogImage: '/icon.png',
        ogUrl: 'https://store.furwaz.com' + route.fullPath
    });
}

async function loginUser() {
    return new Promise((resolve, reject) => {
        const portal = new FurWazPortal();
        portal.on('success', async (data) => {
            const new_user = new User({ ...data.user, token: data.token });
            await new_user.fetchInformations();
            new_user.save();
            resolve(new_user);
        });
        portal.on('error', (error) => {
            console.error('Failed to login user :', error);
        });
        portal.on('ready', () => {
            portal.open();
        });
    })
}

onMounted(async () => {
    if (!import.meta.client) return; // only run on client side

    // If an error occurred, stop the process
    if (error.value) return;

    // If not connected, open the login portal first
    if (!User.Current) {
        try {
            const user = await loginUser();
            if (!user) return;
        } catch (e) {
            console.error(e);
        }
    }

    // Now that we are connected, we can continue the order process
    const orderResponse = await API.RequestLogged(ROUTES.CART.ADD(parseInt(productId), 1));
    if (orderResponse.error) {
        error.value = t('order.error.unknown');
        console.error(orderResponse.message);
        return;
    }

    // It's all good, redirect to the cart
    router.push('/account/cart');
})

</script>