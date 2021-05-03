from src.helpers import *
import unittest
from assertpy import *
from PIL import Image
import base64
from io import BytesIO
import os

class TestHelpers(unittest.TestCase):
    def setUp(self):
        image = Image.open('data/dog.jpg')
        im_file = BytesIO()
        image.save(im_file, format="JPEG")
        im_bytes = im_file.getvalue()

        self.t = 'data:image/jpeg;base64'
        
        self.imgB64 = self.t+','+base64.b64encode(im_bytes).decode("utf-8")

        self.imgArray = np.array(Image.open('data/dog.jpg'))

    def testBase64ToArray(self):
        assert_that(base64ToArray(self.imgB64)[0].shape).is_equal_to((940, 1700, 3))

    def testArrayToBase64(self):
        assert_that('/'.join(arrayToBase64(self.imgArray, self.t, False).split('/')[:4])).is_equal_to('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD')
    
    def testNegative(self):
        imgN = negative(self.imgB64)

        imgArr = imgN.split(',')
        imgTemp = ''.join(imgArr[1:])

        img_data = base64.b64decode(imgTemp)
        im_file = BytesIO(img_data)

        img_np = np.array(Image.open(im_file).convert('RGB'))
        
        assert_that(img_np[1][1]).contains(75, 75, 65)
    
    def testResize(self):
        imgN = resize(self.imgB64, 500, 500)

        imgArr = imgN.split(',')
        imgTemp = ''.join(imgArr[1:])

        img_data = base64.b64decode(imgTemp)
        im_file = BytesIO(img_data)

        img_np = np.array(Image.open(im_file).convert('RGB'))

        assert_that(img_np.shape).is_equal_to((500, 500, 3))
    
    def testCrop(self):
        imgN = crop(self.imgB64, 200, 200, 125, 200)

        imgArr = imgN.split(',')
        imgTemp = ''.join(imgArr[1:])

        img_data = base64.b64decode(imgTemp)
        im_file = BytesIO(img_data)

        img_np = np.array(Image.open(im_file).convert('RGB'))

        assert_that(img_np.shape).is_equal_to((200, 200, 3))
    
    def testRotate(self):
        imgN = rotate(self.imgB64, 30, 'constant', 'true')

        imgArr = imgN.split(',')
        imgTemp = ''.join(imgArr[1:])

        img_data = base64.b64decode(imgTemp)
        im_file = BytesIO(img_data)

        img_np = np.array(Image.open(im_file).convert('RGB'))

        assert_that(img_np.shape).is_equal_to((1664, 1942, 3))

    def testCompress(self):
        imgN = compress(self.imgB64)
        imgArr = imgN.split(',')
        imgTemp = ''.join(imgArr[1:])

        img_data = base64.b64decode(imgTemp)
        im_file = BytesIO(img_data)

        img_np = np.array(Image.open(im_file).convert('RGB'))

        im = Image.fromarray(img_np)

        oSize = os.path.getsize('data/dog.jpg')

        im.save("data/dog_compressed.jpg")

        compSize = os.path.getsize('data/dog_compressed.jpg')

        assert_that(compSize).is_less_than(oSize)

    def tearDown(self):
        self.imgB64 = None

if __name__ == '__main__':
    unittest.main()