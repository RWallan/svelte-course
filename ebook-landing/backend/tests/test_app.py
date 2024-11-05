from http import HTTPStatus

from fastapi.testclient import TestClient

from backend.app import app


def test_health_check():
    client = TestClient(app=app)

    response = client.get('/health_check')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'status': 'ok'}


def test_create_session():
    client = TestClient(app=app)

    response = client.post(
        '/checkout',
        json={
            'success_url': 'http://google.com',
            'cancel_url': 'http://google.com',
        },
    )

    assert response.status_code == HTTPStatus.CREATED
    assert response.json()['session_id'].startswith('cs_test_')
