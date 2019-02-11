export default function formatInvestedValue (value) {
    let val = value.replace(',', '.'),
        lastChar = val.substr(-1);

    if (val.match(/((?:[^0-9.])+)/g) !== null) return false;

    if (val.length > 0 && lastChar.match(/[0-9.]/g) === null) return false;

    if (val.length > 1 && val.startsWith('0') && !val.match(/[.]/g)) return false;

    if (val.startsWith('.')) return false;

    if (val.match(/\./g) !== null && val.match(/\./g).length >= 2) return false;

    return val;
}
