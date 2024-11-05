from http import HTTPStatus

from fastapi.testclient import TestClient

from backend.app import app


def test_health_check():
    client = TestClient(app=app)

    response = client.get('/health_check')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'status': 'ok'}
