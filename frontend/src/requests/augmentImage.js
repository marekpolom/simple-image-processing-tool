import { defaultAxios } from './axios';

const augmentImage = async (img, data, order) => {
    const func = {
        NEGATIVE: negativeReq,
        COMPRESS: compressReq,
        RESIZE: resizeReq,
        ROTATE: rotateReq,
        CROP: cropReq
    }

    let image = img;

    await Promise.all(order.map(async (name) => {
        image = await func[name](image);
    }));

    return image;
};

const negativeReq = async (img) => {
    return new Promise((resolve) => {
        defaultAxios.post('/negative', {
            img: img.data_url
        })
        .then((res) => {
            resolve(res.data);
        })
        .catch((e) => {
            console.log(e);
        })
    });
};

const compressReq = async (img) => {

};

const resizeReq = async (img, h, w) => {

};

const rotateReq = async (img, deg) => {

};

const cropReq = async (img, w, h, x, y) => {

}

export default augmentImage;