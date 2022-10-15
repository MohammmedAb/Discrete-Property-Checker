import _ from 'underscore';

const set = [1, 2, 3, 4];

var relation = [
  [2, 2],
  [2, 3],
  [2, 4],
  [3, 2],
  [3, 3],
  [3, 4],
];


const inArray = (base, comareTo) => {
  return _.map(base, function (ele) {
    return JSON.stringify(ele) == JSON.stringify(comareTo);
  }).includes(true);
};


function isReflexive(r) {
  var counter=0;
  for (var i = 0; i < set.length; i++) {
    //set array loop
    var x = set[i];
    for (var ii = 0; ii < r.length; ii++) {
      //relation array loop
      var ele = r[ii];
      for (var j = 0; j < 1; j++) {
        //inner relation array ele
        var a = ele[j];
        var b = ele[j + 1];

        if (JSON.stringify([a, b]) == JSON.stringify([x, x])) {
          // console.log([x, x], [a, b]);
          counter++;
          break;
        }
      }
    }
  }
  return counter == set.length ? true : false;
}
console.log('isReflexive: ',isReflexive(relation));


function isSymmetric(r) {
  var rel = new Map(r.map((pair) => [pair[0], new Set()]));
  r.forEach(([a, b]) => rel.get(a).add(b));
  return r.every(([a, b]) => rel.has(b) && rel.get(b).has(a));
}
console.log('isSymmetric: ', isSymmetric(relation));


//function is antisymmetric
function isAntiSymmetric(r) {
  for (var i = 0; i < r.length; i++) {
    var ele = r[i];
    for (var j = 0; j < 1; j++) {
      var a = ele[j];
      var b = ele[j + 1];
      // console.log(a, b);
      if (inArray(r, [a, b]) && inArray(r, [b, a]) && a != b) {
        return false;
      }
    }
  }
  return true;
}
console.log('isAntiSymmetric: ', isAntiSymmetric(relation));


function isTransitive(r) {
  // convert to object
  var rel = {};
  for (var i = 0; i < r.length; i++) {
    if (!(r[i][0] in rel)) rel[r[i][0]] = {};
    rel[r[i][0]][r[i][1]] = true;
  }
  // Test to see if opposite relation is in object
  for (var a in rel) {
    for (var b in rel[a]) {
      if (!rel[b]) continue;
      for (var c in rel[b]) {
        if (!rel[a][c]) return false;
      }
    }
  }
  return true;
}

console.log('isTransitive: ', isTransitive(relation));






