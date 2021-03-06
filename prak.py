import sys
import os
from time import time

import pandas as pd
import numpy as np
from sklearn.manifold import TSNE
import bokeh.plotting as bp
import matplotlib.pyplot as plt
# from MulticoreTSNE import MulticoreTSNE as TSNE

sys._enablelegacywindowsfsencoding()

# Path strings
current_path = os.getcwd()
data_path = '{}\\{}'.format(current_path, 'data')
print ('Path to data folder:', data_path)

# Get number of clusters
n = len(os.listdir(data_path))
print ('Number of clusters:', n)


# Centroids
centroids = pd.DataFrame()
for i in range(n):
	if i % 10 == 0: print (i)
	centroid = pd.read_csv('{}\\{}\\{}'.format(data_path, i, 'centroid_vector.txt'), sep=',', header=None)
	centroids = centroids.append(centroid)

# tsne_model = TSNE(n_components=2, random_state=12345, verbose=2, n_iter=100000, n_iter_without_progress=300, learning_rate=100, angle=0.999)
# centroids_2d = pd.DataFrame(tsne_model.fit_transform(centroids))
# centroids_2d.reset_index(inplace=True, drop=False)
# centroids_2d.columns = ['cluster_id', 'x', 'y']
# centroids_2d.to_csv('2d/centroids_2d.csv', index=None)


tsne_model = TSNE(n_components=3, random_state=12345, verbose=2, n_iter=100000, n_iter_without_progress=300, learning_rate=100, angle=0.999)
centroids_3d = pd.DataFrame(tsne_model.fit_transform(centroids))
centroids_3d.reset_index(inplace=True, drop=False)
centroids_3d.columns = ['cluster_id', 'x', 'y', 'z']
centroids_3d.to_csv('3d/centroids_3d.csv', index=None)
exit()
# Plot in matplotlib
# fig, ax = plt.subplots()
# ax.plot(centroids_2d[:,0], centroids_2d[:,1], 'o')
# plt.show()


# Points
points = pd.DataFrame()
for i in range(n):
	if i % 10 == 0: print (i)
	point = pd.read_csv('{}/{}/{}'.format(data_path, i, 'vectors.csv'), sep=',', header=None, low_memory=False)
	cluster_column = pd.DataFrame([i]*len(point))
	point = pd.concat([cluster_column, point], axis=1)
	# points = points.append(point)

	tsne_model = TSNE(n_components=2, random_state=12345, verbose=2, n_iter=100000, n_iter_without_progress=300, learning_rate=100, angle=0.999)

	vectors_2d = pd.DataFrame(tsne_model.fit_transform(point.iloc[:,2:]))
	vectors_2d = pd.concat([point.iloc[:,:2], vectors_2d], axis=1)
	vectors_2d.columns = ['cluster_id', 'item_id', 'x', 'y']
	vectors_2d.to_csv('{}\\{}\\{}.csv'.format(current_path, '2d', i), header=True, index=None)
exit()
points.reset_index(inplace=True, drop=True)
# points.to_csv('points.csv', header=None, index=None)
# points = pd.read_csv('points.csv')

tsne_model = TSNE(n_jobs=12, n_components=2, random_state=12345, verbose=2, n_iter=100000, n_iter_without_progress=300, learning_rate=100, angle=0.999)
points_2d = pd.DataFrame(tsne_model.fit_transform(points.iloc[:,2:]))
points_2d = pd.concat([points.iloc[:,:2], points_2d], axis=1)
points_2d.columns = ['cluster_id', 'item_id', 'x', 'y']
pd.DataFrame(points_2d).to_csv('2d/points_2d.csv', header=True, index=None)