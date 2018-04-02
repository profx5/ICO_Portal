from .fixture import fixture_path

def create_kyc(client):
    with open(fixture_path('photo.jpg'), 'rb') as photo, \
             open(fixture_path('selfie.jpg'), 'rb') as selfie:
            response = client.post('/api/kyc/', {
                'firstname': 'John',
                'surname': 'Doe',
                'birthdate': '1990-01-01',
                'document_no': 123123,
                'country': 'Russia',
                'photo': photo,
                'selfie': selfie
            }, format='multipart')

    return response
