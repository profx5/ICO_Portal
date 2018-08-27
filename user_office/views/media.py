import mimetypes
from django.http import HttpResponse
from django.conf import settings
from django.contrib.auth.decorators import login_required


@login_required
def serve_media(request, file_path):
    file_abs_path = settings.MEDIA_ROOT + file_path

    content_type, encoding = mimetypes.guess_type(file_abs_path)
    content_type = content_type or 'application/octet-stream'

    response = HttpResponse(content_type=content_type)

    if encoding:
        response["Content-Encoding"] = encoding

    url = "/internal_media/" + file_path
    response['X-Accel-Redirect'] = url

    return response
