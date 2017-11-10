import sys
import os
from time import time

import pandas as pd
import numpy as np
from sklearn.manifold import TSNE
import bokeh.plotting as bp
import matplotlib.pyplot as plt

sys._enablelegacywindowsfsencoding()

# Path strings
current_path = os.getcwd()
data_path = '{}\\{}'.format(current_path, 'data')
print ('Path to data folder:', data_path)

# Get number of clusters
n = len(os.listdir(data_path))
print ('Number of clusters:', n)

tsne_model = TSNE(n_components=2, random_state=12345, verbose=2, n_iter=100000, n_iter_without_progress=300, learning_rate=100, angle=0.999)
# perplexity=30.0,
# early_exaggeration=12.0,
# init= ['random','pca']
# method=['barnes_hut','exact']

centroids = pd.DataFrame()

# Centroids
for i in range(n):
	if i % 10 == 0: print (i)
	centroid = pd.read_csv('{}\\{}\\{}'.format(data_path, i, 'centroid_vector.txt'), sep=',', header=None)
	centroids = centroids.append(centroid)

centroids_2d = tsne_model.fit_transform(centroids)
pd.DataFrame(centroids_2d).to_csv('2d/centroids_2d.csv', header=None)

# Plot in matplotlib
fig, ax = plt.subplots()
ax.plot(centroids_2d[:,0], centroids_2d[:,1], 'o')
plt.show()

# Points
lst = np.array([])
points = pd.DataFrame()
for i in range(n):
	if i % 10 == 0: print (i)
	point = pd.read_csv('{}\\{}\\{}'.format(data_path, i, 'vectors.csv'), sep=',', header=None, low_memory=False)
	# point_2d = tsne_model.transform( point.loc[2:] )
	# point = np.fromfile('{}\\{}\\{}'.format(data_path, i, 'vectors.csv'))#,  dtype=np.float32)
	cluster_column = pd.DataFrame([i]*len(point))
	point = pd.concat([cluster_column, point], axis=1)
	# lst.append(point)
	# lst = np.append(lst, [point])
	# print(lst.shape)
	points = points.append(point)

points_2d = tsne_model.fit_transform(points_2d.loc[2:])
points_2d = pd.concat([points.loc[:2], points_2d], axis=1)
pd.DataFrame(points_2d).to_csv('2d/points_2d.csv', header=None)