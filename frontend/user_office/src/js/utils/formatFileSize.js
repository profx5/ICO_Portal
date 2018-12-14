const formatFileSize = inputSize => {
    let size = inputSize;
    let formattedSize = {
      size: size,
      units: 'K'
    }

    if (size * 0.000001 > 1) {
        size *= 0.000001;
        formattedSize.size = size.toFixed(2);
        formattedSize.units = 'MB';
    } else {
        size *= 0.001;
        formattedSize.size = size.toFixed(2);
        formattedSize.units = 'K';
    }

    return formattedSize;
}

export default formatFileSize;
