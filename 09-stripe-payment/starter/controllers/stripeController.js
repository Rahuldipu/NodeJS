const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
    const {purchase, total_ammount, shipping_fee} = req.body;

    const calculateOrderAmount = () => {
        return total_ammount + shipping_fee
    }
    const paymentIntent = await stripe.paymentIntents.create({
        description: 'Software development services',
        shipping: {
            name: 'Jenny Rosen',
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        },
        amount: 1000,
        currency: 'usd',
    })
    console.log(paymentIntent);
    res.json({clientSecret: paymentIntent.client_secret});
}

module.exports = stripeController;