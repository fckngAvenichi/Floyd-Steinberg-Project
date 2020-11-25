var img;

/*
    https://oir.mobi/uploads/posts/2019-12/1576383095_39-71.jpg
    https://oir.mobi/uploads/posts/2019-12/1576383100_7-8.jpg
    https://wallpapercave.com/wp/wp7308660.jpg
    https://www.vpesports.com/wp-content/uploads/2019/01/marcus-aurelius.jpg
    https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-original-hand-painted-watercolor-texture-gradient-candy-color-rainbow-background-material-image_281810.jpg
*/

function preload() {
    img = loadImage('https://cors-anywhere.herokuapp.com/https://oir.mobi/uploads/posts/2019-12/1576383095_39-71.jpg');
}

function setup() {
    let picWidth = window.innerWidth / img.width * img.width;
    let picHeight = window.innerHeight / img.height * img.height;
    console.log(window.innerWidth / img.width * img.width);
    console.log(window.innerHeight / img.height * img.height);

    createCanvas(picWidth, picHeight);
    image(img, 0, 0, picWidth, picHeight);
}

function draw() {
    loadPixels();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let oldR = getRedAtXY(x, y, width);
            let oldG = getGreenAtXY(x, y, width);
            let oldB = getBlueAtXY(x, y, width);

            let factor = 1;

            let newR = getNewColor(oldR, factor);
            let newG = getNewColor(oldG, factor);
            let newB = getNewColor(oldB, factor);

            let errR = getColorError(oldR, newR);
            let errG = getColorError(oldG, newG);
            let errB = getColorError(oldB, newB);

            setColorsAtXY(x, y, width, newR, newG, newB);

            pixels[index(x + 1, y, width)]         += errR * 7 / 16.0;
            pixels[index(x + 1, y, width) + 1]     += errG * 7 / 16.0;
            pixels[index(x + 1, y, width) + 2]     += errB * 7 / 16.0;

            pixels[index(x - 1, y + 1, width)]     += errR * 3 / 16.0;
            pixels[index(x - 1, y + 1, width) + 1] += errG * 3 / 16.0;
            pixels[index(x - 1, y + 1, width) + 2] += errB * 3 / 16.0;

            pixels[index(x, y + 1, width)]         += errR * 5 / 16.0;
            pixels[index(x, y + 1, width) + 1]     += errG * 5 / 16.0;
            pixels[index(x, y + 1, width) + 2]     += errB * 5 / 16.0;

            pixels[index(x + 1, y + 1, width)]     += errR * 1 / 16.0;
            pixels[index(x + 1, y + 1, width) + 1] += errG * 1 / 16.0;
            pixels[index(x + 1, y + 1, width) + 2] += errB * 1 / 16.0;
        }
    }
    updatePixels();
    filter(GRAY);
}


function index(x, y, awidth) {
    return (x + y * awidth) * 4;
}

function getRedAtXY(x, y, awidth) {
    return pixels[index(x, y, awidth)];
}

function getGreenAtXY(x, y, awidth) {
    return pixels[index(x, y, awidth) + 1];
}

function getBlueAtXY(x, y, awidth) {
    return pixels[index(x, y, awidth) + 2];
}

function setColorsAtXY(x, y, awidth, r, g ,b) {
    pixels[index(x, y, awidth)] = r;
    pixels[index(x, y, awidth) + 1] = g;
    pixels[index(x, y, awidth) + 2] = b;
}

function getNewColor(oldCol, factor) {
    return round(factor * oldCol / 256) * (256 / factor);
}

function getColorError(oldCol, newCol) {
    return oldCol - newCol;
}