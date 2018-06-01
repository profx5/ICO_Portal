from .fixture import fixture_path

def create_kyc(client):
    with open(fixture_path('photo.jpg'), 'rb') as photo, \
             open(fixture_path('selfie.jpg'), 'rb') as selfie:
            response = client.post('/api/kyc/', {
                'user_photo': selfie,
                'firstname': 'John',
                'surname': 'Doe',
                'gender': 'M',
                'birthdate': '1990-01-01',
                'country': 'Russia',
                'city': 'Moscow',
                'registration_address': 'Lenina st., 1, 4',
                'postcode': '123422',
                'document_no': 123123,
                'document_type': 'Passport',
                'document_country': 'Russia',
                'document_date': '1990-01-01',
                'document_photo': photo,
            }, format='multipart')

    return response
