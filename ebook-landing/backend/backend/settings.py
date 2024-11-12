from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env', env_file_encoding='utf-8'
    )

    STRIPE_API_KEY: str
    PRICE_ID: str
    SENDGRID_API_KEY: str
    ALLOW_ORIGIN: str
    STRIPE_WEBHOOK_SECRET: str


settings = Settings()
