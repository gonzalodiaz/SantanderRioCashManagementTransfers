function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
};

function formatImporte(importe) {
    importe = parseFloat(importe);
    // I need a 2 decimal precision
    importe = importe.toFixed(2);
    // toFixed retuns a string, I need a float
    importe = parseFloat(importe)
    // I need to move the decimal point two positions
    importe = importe * 100;
    // 149.20 * 100 = 14919.999999999998. Thank you javascript!
    // I have to round it
    importe = importe.toFixed(0);
    // We need to pad it to a fixed 14 positions as the pdf says
    return pad(importe, 14);
};
