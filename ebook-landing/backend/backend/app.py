import base64
from http import HTTPStatus

import httpx
import stripe
from fastapi import Body, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment

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


@app.post('/purchase_confirmation')
def purchase_confirmation(payload: dict = Body(None)):
    pdf = httpx.get('https://narrify-public.s3.eu-central-1.amazonaws.com/sample.pdf').content
    attachment = Attachment(
        file_name='Digital Ebook - Spain Relocation.pdf',
        file_type='application/pdf',
        disposition='attachment',
        file_content=base64.b64encode(pdf)
    )
    customer_details = payload['data']['object']['customer_details']
    customer_email = customer_details['email']
    customer_name = customer_details['name']

    message = Mail(
        from_email='coding.rwallan@gmail.com',
        to_emails=customer_email,
        subject='Your Purchase Confirmation - Complete Spain Relocation Guide',
        html_content=f"""<h1>Thank You for Your Purchase!</h1>
            <p>Dear {customer_name},</p>
            <p>We appreciate your purchase of the <strong>Complete Spain Relocation Guide</strong>. We're confident that this ebook will provide you with the insights and advice you need to make your move to Spain as smooth and stress-free as possible.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
            <li>You will find your ebook attached to this email. Please download and save it for future reference.</li>
            <li>A separate purchase confirmation has been sent to your email as well.</li>
            <li>If you have any questions or need further assistance, don't hesitate to reach out to us at coding.rwallan@gmail.com.</li>
            </ul>
            <p>Thank you once again for choosing our guide. We wish you the best of luck on your journey to Spain!</p>
            <p>Best regards,<br/>Richard Wallan</p>
        """,
    )
    message.add_attachment(attachment)

    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
    _ = sg.send(message)
    return {'message': 'Email sent.'}