<template>
    <div class="flex grow flex-col w-full h-full justify-center items-center">

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import User from '@/scripts/User';
import { API } from '@/scripts/API';
import ROUTES from '@/scripts/routes';
import FurWazPortal from '@/scripts/FurWazPortal';

export default defineComponent({
    name: 'AddProductView',
    setup() {
        return {
            User
        };
    },
    mounted() {
        const productId = this.$route.params.id ?? this.$route.query.id;
        if (!productId) {
            console.error('No product id provided');
            return;
        }

        if (!User.CurrentUser) {
            const portal = new FurWazPortal();
            portal.on('success', async (data) => {
                const user = new User({ ...data.user, token: data.token });
                await user.fetch();
                user.save();
                window.location.href = '/order/' + productId;
            });
            portal.on('error', (error) => {
                console.error('Failed to login user :', error);
            });
            portal.on('ready', () => {
                portal.open();
            });
        }
        else {
            this.addProductToCart(parseInt(productId.toString()));
        }
    },
    methods: {
        async addProductToCart(productId: number) {
            const res = await API.RequestLogged(ROUTES.CART.ADD(productId, 1));
            if (res.error) {
                console.error('Error adding product to cart : ', res.message);
                return;
            }
            this.$router.push('/account/cart');
        }
    }
});
</script>
