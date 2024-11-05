from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.schemas import CheckoutInput, SessionOutput
from backend.settings import settings

app = FastAPI()

stripe.api_key = settings.STRIPE_API_KEY
session = stripe.checkout.Session(api_key=settings.STRIPE_API_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health_check')
def health_check():
    return {'status': 'ok'}
