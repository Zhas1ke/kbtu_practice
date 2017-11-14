import sys
import os
from time import time

import pandas as pd
import csv

sys._enablelegacywindowsfsencoding()

current_path = os.getcwd()
data_path = '{}\\{}'.format(current_path, 'data')
print ('Path to data folder:', data_path)

# Get number of clusters
n = len(os.listdir(data_path))
print ('Number of clusters:', n)

for i in range(n):
	print (i)
	df_3d = pd.read_csv('{}\\3d\\{}.csv'.format(current_path, i), sep=',')
	# print (df_2d.head())
	# print (df_names.head())
	# csv_names=csv.reader('{}\\{}\\names.csv'.format(data_path, i))
	# for line in csv_names:
	# 	print (line)
	# print (csv_names)
	# print (df_3d.shape)
	lst = []
	with open('{}\\{}\\names.csv'.format(data_path, i), "r") as f:
		reader = csv.reader(f, delimiter=",")
		for line in reader:
			d = dict()
			item_id = line[0]
			item_name = ', '.join([x.strip() for x in line[1:]])
			# d['item_id'] = item_id
			d['item_name'] = item_name
			lst.append(d)
	df_names = pd.DataFrame(lst)
	# print (df_names.head())
	# print (df_names.shape)
	df_new = pd.concat([df_3d, df_names], axis=1)
	# dfNew = pd.merge(df_3d, df_names, left_index=True, right_index=True, how='outer')
	# print (df_new.head())
	# print (df_new.shape)
	# input()
	df_new.to_csv('{}\\3d\\{}.csv'.format(current_path, i), index=None, header=True)