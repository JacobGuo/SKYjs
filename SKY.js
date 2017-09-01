(function(){
	if(!window.SKY){window['SKY'] = {};}
	window['SKY']['$'] = function(){
		var elements = [];
		for(var i =0;i<arguments.length;i++){
			var ele = arguments[i];
			if(!(typeof ele == 'string')){continue;}
			var node = document.getElementById(ele);
			if(!node){
				//try search by class
				var eles = document.getElementsByClassName(ele);
				for(var j=0;j<eles.length;j++){elements.push(eles[j]);}
			}else{elements.push(node);}
		}
		return new SKYObject(elements);
	};

/* all base on SKYObject */
	function SKYObject(nodes){
		this.nodes = nodes;
	}
	SKYObject.prototype.foreach = function(handle){
		var self = this;
		var nodes = self.nodes;
		for(var i =0;i<nodes.length;i++){
			handle(nodes[i]);
		}
		return self;
	};
	SKYObject.prototype.addEvent = function(type,handle){
		return this.foreach(function(n){
			n.addEventListener(type,handle,false);
		});
	};
	SKYObject.prototype.removeEvent = function(type,handle){
		return this.foreach(function(n){
			n.removeEventListener(type,handle,false);
		});
	};
	SKYObject.prototype.toggleDisplay = function(v){
		return this.foreach(function(n){
			n.style.display = (n.style.display == 'none')?(v||''):'none';
		});
	};
	SKYObject.prototype.insertAfter = function(n){
		if(this.nodes.length!=1){return;}
		return this.foreach(function(node){
			node.parentNode.insertBefore(n,node.nextSibling);//insert before current node's brother node.
		});
	};
	SKYObject.prototype.removeChilds = function(){
		return this.foreach(function(n){
			while(n.firstChild){
				n.removeChild(n.firstChild);
			}
		});
	};
	SKYObject.prototype.appendChild = function(newNode){
		if(this.nodes.length!=1){return;}
		return this.foreach(function(n){
			if(n.firstChild){n.insertBefore(newNode,n.firstChild);}
			else{
				n.appendChild(newNode);
			}
		});
	};
}())