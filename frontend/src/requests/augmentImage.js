import { defaultAxios } from './axios';

const augmentImage = async (img, data, order) => {
    const func = {
        NEGATIVE: negativeReq,
        COMPRESS: compressReq,
        RESIZE: resizeReq,
        ROTATE: rotateReq,
        CROP: cropReq
    }

    let image = img.data_url;

    for await (let x of order){
        image = await func[x]({...data, ['img']: image});
    }

    return image;
};

const negativeReq = async (data) => {
    return new Promise((resolve) => {
        defaultAxios.post('/negative', {
            img: data.img
        })
        .then((res) => {
            resolve(res.data);
        })
        .catch((e) => {
            console.log(e);
        })
    });
};

const compressReq = async (data) => {
    return new Promise((resolve) => {
        defaultAxios.post('/compress', {
            img: data.img
        })
        .then((res) => {
            resolve(res.data);
        })
        .catch((e) => {
            console.log(e);
        })
    });
};

const resizeReq = async (data) => {
    if(!isNaN(data.resizeH) && !isNaN(data.resizeW)){
        return new Promise((resolve) => {
            defaultAxios.post('/resize', {
                img: data.img
            },
            { params: {
                width: data.resizeW,
                height: data.resizeH
            }})
            .then((res) => {
                resolve(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
        });
    }
};

const rotateReq = async (data) => {
    if(data.rotateD !== '' && data.rotateM){
        return new Promise((resolve) => {
            defaultAxios.post('/rotate', {
                img: data.img
            },
            { params: {
                deg: data.rotateD,
                mode: data.rotateM,
                resize: data.rotateR
            }})
            .then((res) => {
                resolve(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
        });
    }

    return data.img
};

const cropReq = async (data) => {
    if(data.cropH !== '' && data.cropW !== '' && data.cropX !== '' && data.cropY !== ''){
        return new Promise((resolve) => {
            defaultAxios.post('/crop', {
                img: data.img
            },
            { params: {
                width: data.cropW,
                height: data.cropH,
                x: data.cropX,
                y: data.cropY
            }})
            .then((res) => {
                resolve(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
        });
    }

    return(data.img)
}

export default augmentImage;