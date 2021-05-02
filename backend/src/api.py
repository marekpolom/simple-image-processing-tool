from flask import Flask, request
from flask_cors import CORS
from helpers import negative, resize, crop, rotate, compress

app = Flask(__name__)
CORS(app)

@app.route('/resize', methods=['POST'])
def resizeImg():
    width, height = request.args.get('width'), request.args.get('height')
    return resize(request.json['img'], width, height)

@app.route('/crop', methods=['POST'])
def cropImg():
    width, height = request.args.get('width'), request.args.get('height')
    x, y = request.args.get('x'), request.args.get('y')
    return crop(request.json['img'], width, height, x, y)

@app.route('/rotate', methods=['POST'])
def rotateImg():
    deg, mode, resize = request.args.get('deg'), request.args.get('mode'), request.args.get('resize')
    return rotate(request.json['img'], deg, mode, resize)

@app.route('/compress', methods=['POST'])
def compressImg():
    return compress(request.json['img'])

@app.route('/negative', methods=['POST'])
def negativeImg():
    return negative(request.json['img'])