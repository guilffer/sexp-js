var sexp = function(text){
    this.base = text;
    this.data = this.parse();
};

sexp.prototype = {
    scan: function() {
        var token = this.base[0] || null;
        this.base = this.base.slice(1);
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
                node = '';
                while((token = this.scan()) != '"')
                  node += token;
                break;
              
              default:
                if (token != null)
                    node = (node == null) ? token : node+token;
                
          }
        } while(token != null);
        return list;
    }   
};

exports.sexp = sexp;

