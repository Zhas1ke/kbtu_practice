/*
* @Author: bobur554395
* @Date:   2017-11-14 16:20:43
* @Last Modified by:   bobur554395
* @Last Modified time: 2017-11-15 02:59:35
*/


Plotly.d3.csv('static/data/3d/centroids_3d.csv', function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }
  let data = [
        {
          x: unpack(rows, 'x'),  
          y: unpack(rows, 'y'), 
          z: unpack(rows, 'z'), 
          mode: 'markers',
          marker: {
            size: 7,
            line: {
              color: 'rgba(217, 217, 217, 0.14)',
              width: 0.5
            },
            opacity: 0.8
          },
          type: 'scatter3d'
        },
        {
          alphahull: 7,
          opacity: 0.1,
          type: 'mesh3d',
          x: unpack(rows, 'x'),
          y: unpack(rows, 'y'),
          z: unpack(rows, 'z')
        }
  ];

  let layout = {
    title: 'Clusters',
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0
    }
  };

  Plotly.newPlot('myDiv', data, layout);
});
