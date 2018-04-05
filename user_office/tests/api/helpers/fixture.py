import os

def fixture_path(name):
    path = os.path.join(
        os.path.dirname(os.path.realpath(__file__)),
        '..',
        'fixtures',
        name)

    return path


def fixture(name, mode='r'):
    with open(fixture_path(name), mode) as f:
        return f.read()
