from flask import Flask, request
from flask_cors import CORS
from helpers import negative, resize

app = Flask(__name__)
CORS(app)

@app.route('/resize', methods=['POST'])
def resizeImg():
    width, height = request.args.get('width'), request.args.get('height')
    return resize(request.json['img'], width, height)
    return ''

@app.route('/crop', methods=['POST'])
def cropImg():
    pass

@app.route('/rotate', methods=['POST'])
def rotateImg():
    pass

@app.route('/compress', methods=['POST'])
def compressImg():
    pass

@app.route('/negative', methods=['POST'])
def negativeImg():
    return negative(request.json['img'])