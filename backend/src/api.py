from flask import Flask, request, jsonify
from flask_cors import CORS
from helpers import negative

app = Flask(__name__)
CORS(app)

@app.route('/resize', methods=['POST'])
def resizeImg():
    pass

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