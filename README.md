# @es-meta/unicode-gen
A compressed data generator for unicode with specific properties.

## Installation
```
npm install -g @es-meta/unicode-gen
```

## Usage
```sh
$ unicod-gen help
Usage: unicode-gen -p [property-name] -o [output-file]

Options:
  -h, --help             Show help                                     [boolean]
  -p, --property         The property name of Unicode                   [string]
  -u, --unicode-version  The unicode version        [string] [default: "15.1.0"]
  -o, --out              The output filename                            [string]
  -v, --version          Show version number                           [boolean]

Examples:
  unicode-gen -u 15.1.0 -p ID_Start -o id_start.json
```
