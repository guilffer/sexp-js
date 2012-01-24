var sexp = function(text){
    this.base = text;
    this.data = this.parse();
};

sexp.prototype = {
  
  slice_base: function(length) {
    this.base = this.base.slice(length);
  },
  
  scan: function() {
    var token = this.base[0] || null;
    this.slice_base(1)
    return token;
  },

  parse: function(parent_) {
    var list = parent_ || null;
    var node = null;
    
    do {
      var token = this.scan();
      switch(token) {
        case '(':
          if (list == null)
            list = this.parse([]);
          else
            list.push(this.parse([]));
          break;
          
        case ')':
          if (node != null) list.push(node);
          return list;
      
        case ' ':
          if (node != null) list.push(node);
          node = null;
          break;
        
        case '"':
          node = this.base.match(/(.*?)\"/)[1];
          this.slice_base(node.length+1);
          break;
        
        case null: break;
        
        default:
          //token += this.base.match(/([^\(\) \"]*)/)[0];
          //this.slice_base(token.length-1);
          node = (node == null) ? token : node+token;
          
            
      }
    } while(token != null);
    return list;
  }   
  
};

exports.sexp = sexp;

