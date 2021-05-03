from PIL import Image
import requests, base64
from io import BytesIO
import numpy as np

URL = 'http://localhost:5000'

image = Image.open('data/dog.jpg')
im_file = BytesIO()
image.save(im_file, format="JPEG")
im_bytes = im_file.getvalue()

t = 'data:image/jpeg;base64'

imgB64 = t+','+base64.b64encode(im_bytes).decode("utf-8")

imgB64 = requests.post(URL+'/negative', json = {'img': imgB64})
imgB64 = requests.post(URL+'/resize', json = {'img': imgB64.text}, params={'width': '500', 'height': '500'})
imgB64 = requests.post(URL+'/rotate', json = {'img': imgB64.text}, params={'deg': '30', 'mode': 'constant', 'resize': 'true'})
imgB64 = requests.post(URL+'/crop', json = {'img': imgB64.text}, params={'width': '200', 'height': '200', 'x': '250', 'y': '200'})
imgB64 = requests.post(URL+'/compress', json = {'img': imgB64.text})

imgArr = imgB64.text.split(',')
imgTemp = ''.join(imgArr[1:])

img_data = base64.b64decode(imgTemp)
im_file = BytesIO(img_data)

img_np = np.array(Image.open(im_file).convert('RGB'))

im = Image.fromarray(img_np)

im.save("data/dog_script.jpg")