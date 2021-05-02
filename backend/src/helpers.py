from skimage import color, util, transform
import numpy as np
import base64
from PIL import Image
from io import BytesIO

def base64ToArray(img):
    imgArr = img.split(',')
    imgTemp = ''.join(imgArr[1:])

    img_data = base64.b64decode(imgTemp)
    im_file = BytesIO(img_data)
    img_np = np.array(Image.open(im_file))

    return img_np, imgArr[0]

def arrayToBase64(img, type):
    imgD = Image.fromarray(img)
    im_file = BytesIO()
    imgD.save(im_file, format=type.split('/')[1].split(';')[0].upper())
    im_bytes = im_file.getvalue()
    im_b64 = base64.b64encode(im_bytes).decode("utf-8")

    return ''.join([type, ',', im_b64])

def negative(img):
    imgArr, type = base64ToArray(img)

    imgArrN = util.invert(imgArr)

    b64 = arrayToBase64(imgArrN, type)

    return b64

def resize(img, w, h):
    imgArr, type = base64ToArray(img)

    imgArrR = transform.resize(imgArr, (int(w), int(h)))*255
    imgArrR = imgArrR.astype(np.uint8)

    b64 = arrayToBase64(imgArrR, type)

    return b64