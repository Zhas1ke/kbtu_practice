# -*- coding: utf-8 -*-
# @Author: bobur
# @Date:   2017-10-27 16:20:00
# @Last Modified by:   bobur554395
# @Last Modified time: 2017-11-14 16:18:14
import os

from flask import Flask, render_template


app = Flask(__name__)



@app.route('/', methods=['GET'])
def home():
  return render_template('home.html.j2')



@app.route('/3d', methods=['GET'])
def render_3d():
  return render_template('3d.html.j2')


if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)





