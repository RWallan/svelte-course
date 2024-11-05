from pydantic import BaseModel, HttpUrl


class CheckoutInput(BaseModel):
    success_url: HttpUrl
    cancel_url: HttpUrl


class SessionOutput(BaseModel):
    session_id: str
