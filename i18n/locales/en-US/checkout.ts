export default {
    name: 'Order Status',
    title: 'Order Tracking',
    description: 'Track the status of your order from placement to delivery.',
    loading: "Retrieving order",
    error: {
        title: "Oops!",
        description: "An error occurred while retrieving the order. Please try again later."
    },
    commandSuccess: "Order placed! ✨",
    commandSuccessDesc: "Your order has been successfully placed.\nYou will receive a confirmation email soon.",
    commandFailed: "Order failed 😢",
    commandFailedDesc: "An error occurred while placing your order.\nPlease try again later.",
    commandPending: "Order pending...",
    commandPendingDesc: "Your order is being processed.\nPlease wait while we finalize it.",
    commandCanceled: "Order canceled",
    commandCanceledDesc: "Your order has been canceled.\nYou can place a new order whenever you like."
}