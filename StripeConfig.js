import {StripeProvider} from '@stripe/stripe-react-native';

export default function StripeConfig({children}) {
  return (
    <StripeProvider
      publishableKey="pk_test_9VvzSCWXlvBTtzpWrciFHg5w00dVUMwe3x"
      merchantIdentifier="merchant.com.yourapp" // Optional for Apple Pay
    >
      {children}
    </StripeProvider>
  );
}