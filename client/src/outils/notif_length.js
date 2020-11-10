export default function notif(t, id) {
  // let newt=t.filter(el=>el.notiftype=="New_Event")
  let newt = t;
  let sum = 0;
  for (let i = 0; i < newt.length; i++) {
    for (let j = 0; j < newt[i].state.length; j++) {
      if (newt[i].state[j].users == id && newt[i].state[j].consulted == false)
        sum += 1;
    }
  }

  return sum;
}

export function filter_notif(t, id) {
  let newt = [];
  for (let i = 0; i < t.length; i++) {
    for (let j = 0; j < t[i].state.length; j++) {
      if (t[i].state[j].users == id) newt = [...newt, t[i]];
    }
  }

  return newt;
}

export function filter_inactive_notif(t, id) {
  let newt = [];
  for (let i = 0; i < t.length; i++) {
    for (let j = 0; j < t[i].state.length; j++) {
      if (t[i].state[j].users == id&&t[i].state[j].consulted == false) 
      newt = [...newt, t[i]];
    }
  }

  return newt;
}

export function sort_notif_bydate(t) {
  var ref = {};
  return t.reverse().reduce(function(arr1, o) {
    //  get day value
    var d = Number(o.created_at.toString().slice(8,10));
    // check already defined in the reference array
    if (!(d in ref)) {
    // define if not defined
      ref[d] = arr1.length;
      // push an empty array
      arr1.push([]);
    }
    // push the object into the array
    arr1[ref[d]].push(o);
    // return array refernece
    return arr1;
    // set initial value as an empty array for result
  }, [])
}