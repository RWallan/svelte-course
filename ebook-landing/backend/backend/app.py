from http import HTTPStatus

import stripe
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.schemas import CheckoutInput, SessionOutput
from backend.settings import settings

app = FastAPI()

stripe.api_key = settings.STRIPE_API_KEY
session = stripe.checkout.Session(api_key=settings.STRIPE_API_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.ALLOW_ORIGIN],
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health_check')
def health_check():
    return {'status': 'ok'}


@app.post(
    '/checkout', response_model=SessionOutput, status_code=HTTPStatus.CREATED
)
def checkout(checkout: CheckoutInput):
    created_session = session.create(
        success_url=checkout.success_url,
        cancel_url=checkout.cancel_url,
        line_items=[{'price': settings.PRICE_ID, 'quantity': 1}],
        mode='payment',
        payment_method_types=['card'],
    )
    return SessionOutput(session_id=created_session.id)
