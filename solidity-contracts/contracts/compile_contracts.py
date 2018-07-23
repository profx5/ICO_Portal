#!/usr/bin/env python
import json
import os
from solc import compile_standard

def compile(contract_file_path, contract_name):
    compiled = compile_standard({
        'language': 'Solidity',
        'sources': {
            contract_name: {
                'urls': [contract_file_path]
            }
        },
        'settings': {
            'remappings': ["openzeppelin-solidity=%s" % os.path.abspath(os.path.join(os.path.abspath(__file__), '../../openzeppelin-solidity'))],
            'outputSelection': {
                contract_name: {
                    contract_name: ['abi', 'evm.bytecode.object']
                }
            }
        }
    }, allow_paths=os.path.abspath(os.path.join(os.path.abspath(__file__), '../../../')))

    abi = compiled['contracts'][contract_name][contract_name]['abi']
    bin = compiled['contracts'][contract_name][contract_name]['evm']['bytecode']['object']

    output_filename = contract_file_path.replace('.sol', '.json')

    with open(output_filename, 'w') as f:
        json.dump({'abi': abi, 'bin': bin}, f)

def main():
    compile('VeraCoin.sol', 'VeraCoin')
    compile('VeraCrowdsale.sol', 'VeraCrowdsale')
    compile('PriceOracle.sol', 'PriceOracle')


if __name__ == '__main__':
    main()
