import logo from '../images/logo.png';

function initiatePayment(paymentHandlers, onOrderCreateFailure) {
    const request = new Request('api/orders/', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    });
    fetch(request)
    .then(res => res.json())
    .then(res => {
        const options = {
            key: process.env.REACT_APP_RZP_KEY_ID,
            amount: res.amount,
            currency: res.currency,
            order_id: res.rzpOrderId,
            name: 'Ecommerce',
            image: logo,
            description: 'Ecommerce clone',
            theme: {
                color: '#ff3f6c',
            },
            modal: {
                ondismiss: paymentHandlers.onDismiss || (() => {}),
                escape: false,
            },
            handler: response => {
                paymentHandlers.onSuccess &&
                    paymentHandlers.onSuccess({
                        ...response,
                        id: res.orderId,
                        amount: res.amount,
                        currency: res.currency,
                    });
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    },
    err => {
        onOrderCreateFailure && onOrderCreateFailure(err);
    });
}

export { initiatePayment };
