export const fuzzySearch = (items: any, query: any) => {
  // Split up the query by space
  var search = query.split(" ");
  var found: any = [];
  items.forEach((i: any) => {
    // Extra step here to count each search query item (after splitting by space)
    var matches = 0;
    search.forEach((s: any) => {
      var props = 0;
      for (var prop in i) {
        // Check if property value contains search
        if (i[prop].indexOf(s) > -1) {
          props++;
        }
      }
      if (props >= 1) {
        // Found a matching prop, increase our match count
        matches++;
      }
    });
    if (matches == search.length) {
      // if all search paramters were found
      found.push(i);
    }
  });
  return found;
};
