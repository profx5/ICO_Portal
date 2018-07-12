#!/usr/bin/env python

import json
from solc import compile_source

CONTRACT_FILENAME = 'VeraCoin.sol'
COMPILED_FILENAME = 'VeraCoin.json'

def main():
    with open(CONTRACT_FILENAME, 'r') as f:
        compiled = compile_source(f.read())

    with open(COMPILED_FILENAME, 'w') as f:
        f.write(json.dumps(compiled))

if __name__ == '__main__':
    main()
