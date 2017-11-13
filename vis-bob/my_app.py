# -*- coding: utf-8 -*-
# @Author: bobur
# @Date:   2017-10-27 16:20:00
# @Last Modified by:   bobur554395
# @Last Modified time: 2017-11-14 02:52:59
import os

from flask import Flask, render_template


app = Flask(__name__)



@app.route('/', methods=['GET'])
def home():
  return render_template('index.html')


if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)





