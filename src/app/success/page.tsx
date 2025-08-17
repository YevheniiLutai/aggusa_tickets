// src/app/success/page.tsx
import Stripe from 'stripe';
import Image from 'next/image';
import FallingLeaves from '../components/FallingLeaves';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  // Чекаємо searchParams
  const params = await searchParams;
  const sessionId = params?.session_id;

  if (!sessionId) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <FallingLeaves />
        <h1>❌ Sorry</h1>
      </div>
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent.charges'],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    const chargeId = paymentIntent.latest_charge as string;
    const charge = chargeId ? await stripe.charges.retrieve(chargeId) : null;

    return (
      <div className='success'>
        <FallingLeaves />
        <h1 className='success_title'> Thank you for the payment! ✅</h1>
        {charge?.receipt_url && (
          <a
            href={charge.receipt_url}
            target="_blank"
            rel="noopener noreferrer"
            className='cancel_button'
          >
            View receipt 📄
          </a>
        )}
        <Image src="/party.png" alt="Payment Success" width={400} height={400} />
      </div>
    );
  } catch (err) {
    return (
      <div className='success'>
        <FallingLeaves />
        <h1 className='success_title'> Thank you for the payment! ✅</h1>
        <Image src="/party.png" alt="Payment Success" width={400} height={400} />
      </div>
    );
  }
}