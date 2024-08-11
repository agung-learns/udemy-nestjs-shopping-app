import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ProductsService } from '../products/products.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly stripe: Stripe,
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}
  async createSession(productId: number) {
    const product = await this.productsService.getProduct(productId);
    return this.stripe.checkout.sessions.create({
      metadata: {
        productId,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: product.price * 100,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: this.configService.getOrThrow<string>('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.getOrThrow<string>('STRIPE_CANCEL_URL'),
    });
  }

  async handleCheckoutWebhook(event: any) {
    if (event.type !== 'checkout.session.completed') {
      return;
    }

    const session = await this.stripe.checkout.sessions.retrieve(
      event.data.object.id,
    );
    await this.productsService.update(+session.metadata.productId, {
      sold: true,
    });
  }
}
