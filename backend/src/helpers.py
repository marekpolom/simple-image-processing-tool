from skimage import util, transform
import numpy as np
import base64
from PIL import Image
from io import BytesIO

def base64ToArray(img):
    imgArr = img.split(',')
    imgTemp = ''.join(imgArr[1:])

    img_data = base64.b64decode(imgTemp)
    im_file = BytesIO(img_data)

    if(imgArr[0].split('/')[1].split(';')[0].upper() == "PNG"):
        img_np = np.array(Image.open(im_file).convert('RGBA'))
    else:
        img_np = np.array(Image.open(im_file).convert('RGB'))

    return img_np, imgArr[0]

def arrayToBase64(img, type, compress):
    imgD = Image.fromarray(img)
    im_file = BytesIO()

    t = type.split('/')[1].split(';')[0].upper()

    if compress and t == 'PNG':
        imgD.save(im_file, format=t, optimize=True)
    elif compress and t == 'JPEG':
        imgD.save(im_file, format=t, quality=75)
    elif compress and t == 'BMP':
        imgD.save(im_file, format='JPEG')
    elif not compress and t == 'JPEG':
        imgD.save(im_file, format=t, quality=95)
    elif not compress and t == 'PNG':
        imgD.save(im_file, format=t, optimize=False)
    else:
        imgD.save(im_file, format=t)

    im_bytes = im_file.getvalue()
    im_b64 = base64.b64encode(im_bytes).decode("utf-8")

    return ''.join([type, ',', im_b64])

def negative(img):
    imgArr, type = base64ToArray(img)

    imgArrN = util.invert(imgArr)

    b64 = arrayToBase64(imgArrN, type, False)

    return b64

def resize(img, w, h):
    imgArr, type = base64ToArray(img)

    if w != '' and h != '':
        imgArrR = transform.resize(imgArr, (int(h), int(w)))*255
        imgArrR = imgArrR.astype(np.uint8)

        b64 = arrayToBase64(imgArrR, type, False)
    else:
        b64 = arrayToBase64(imgArr, type, False)

    return b64

def crop(img, w, h, x, y):
    imgArr, type = base64ToArray(img)

    if w != '' and h != '' and x != '' and y != '':
        if int(x) < imgArr.shape[1] and int(y) < imgArr.shape[0]:
            imgArrC = imgArr[int(y):int(y)+int(h), int(x):int(x)+int(w)]
            b64 = arrayToBase64(imgArrC, type, False)
        else:
            b64 = arrayToBase64(imgArr, type, False)
    else:
        b64 = arrayToBase64(imgArr, type, False)
        
    return b64

def rotate(img, deg, m, r):
    imgArr, type = base64ToArray(img)

    if(r == 'true'):
        r = True
    else:
        r = False

    imgArrR = transform.rotate(imgArr, float(int(deg)), mode=m, resize=r)*255
    imgArrR = imgArrR.astype(np.uint8)

    b64 = arrayToBase64(imgArrR, type, False)

    return b64

def compress(img):
    imgArr, type = base64ToArray(img)

    b64 = arrayToBase64(imgArr, type, True)

    return b64