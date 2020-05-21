$(document).ready(function(){
	$('#mainQuestion').css({"font-size": " 40px", "font-style":" oblique"})
	$('.second').hide();
	$('.first').show();
	var marketProducts = AllProducts();
	var opNum = $('#opNum');
	var btn_go = $('#go');
	var btn_back = $('#back');
	var btn_search = $('#search');
	var btn_add = $('#add');
	var btn_remove = $('#remove');
	var divFirst = $('.first');
	var divSecond = $('.second');
	var tbl = $('#tbl');
	var h2 = $('#h2');
	var ask = $('#ask');
	var word = $('#tf_word');
	var low =  $('#tf_low');
	var high = $('#tf_high');
	var inpSearch = $('.inpSearch');
	var ft_id = $('#ft_id');
	var q = $('#q');
	var alert = $('.alert');
	var alertTwo = $('.alertTwo');
	var cart = [];

	btn_go.click(function(){
		switch(opNum[0].value){
			case "one":
				$('.first').hide();
				$('.second').show();
				ask.hide();
				btn_add.hide();
				btn_remove.hide();
				console.log(h2)
				// alert.hide();
				// alertTwo.hide();
				search.style.display = "none";
				tbl[0].innerText="";
				tbl.append("<tr><th>Product Id</th><th>Product Name</th><th>Product Discription</th><th>Product Price</th><th>Product Quantity</th></tr>")
				for(var i in marketProducts){
					tbl.append("<tr><td>"+marketProducts[i].id+"</td><td>"+marketProducts[i].name+"</td><td>"+marketProducts[i].disc+"</td><td>"+marketProducts[i].price+"</td><td>"+marketProducts[i].quantity+"</td></tr>")
				}
				divSecond.append(tbl);
				break;
			case "two":
				$('.first').hide();
				$('.second').show();
				ask.show();
				ft_id.hide();
				btn_add.hide();
				btn_remove.hide();
				inpSearch.show();
				// alert.hide();
				search.style.display = "";
				$('#h2')[0].textContent="Compatible products";
				tbl[0].innerText="";
				break;
			case "three":
				$('.first').hide();
				$('.second').show();
				ask.hide();
				btn_add.hide();
				btn_remove.hide();
				tbl[0].innerText="";
				search.style.display = "none";
				// alert.hide();
				$('#h2')[0].textContent="Cart products";
				tbl.append("<tr><th>Product Id</th><th>Product Name</th><th>Product Discription</th><th>Product Price</th><th>Product Quantity</th></tr>");
				if (cart.length === 0) {
					tbl.append("<tr><td>Empty</td><td>Empty</td><td>Empty</td><td>Empty</td><td>Empty</td></tr>");
				} else {
					for(var i in cart){
						tbl.append("<tr><td>"+cart[i].id+"</td><td>"+cart[i].name+"</td><td>"+cart[i].disc+"</td><td>"+cart[i].price+"</td><td>"+cart[i].quantity+"</td></tr>")
					}
				}
				break; 
			case "four":
				$('.first').hide();
				$('.second').show();
				ask.show();
				inpSearch.hide();
				ft_id.show();
				btn_add.show();
				btn_remove.hide();
				// alert.hide();
				q[0].textContent = "Choose the product Id you want to add to the cart:";
				tbl[0].innerText="";
				search.style.display = "none";
				btn_add[0].textContent = "";
				btn_add[0].innerHTML = "add";
				$('#h2')[0].textContent="Add product to cart";
				break;
			case "five":
				$('.first').hide();
				$('.second').show();
				ask.show();
				inpSearch.hide();
				ft_id.show();
				btn_add.hide();
				btn_remove.show();
				// alert.hide();
				q[0].textContent = "Choose the product Id you want to remove from the cart:";
				tbl[0].innerText="";
				search.style.display = "none";
				$('#h2')[0].textContent="Remove product from cart";
				break;
			case "six":
				if (cart.length === 0) {
					alertTwo[0].textContent = "The cart is already empty.";
					alertTwo.css("background-color","red");
					alertTwo.show();
					
				} else {
					cart = [];
					alertTwo[0].textContent = "The cart has been cleared successfully";
					alertTwo.css("background-color","forestgreen");
					alertTwo.show();

				}
				setTimeout(function(){
					alertTwo.hide();
				},2000)
				break;
		}
	});

	btn_add.click(function(){
		if (ft_id[0].value !== "") {
			var ind = -1;
			var a = filter(marketProducts, function(product, i){
				if (product.id == ft_id[0].value) {
					ind = i;
					return true;
				} else {
					return false;
				}
			})
			if (cart.length === 0) {
				cart.push(a[0]);
			} else {
				var b = false;
				for(var i in cart){
					if (cart[i].id == ft_id[0].value) {
						cart[i]['quantity']++;
						cart[i]['price'] *= 2;
						b = true;
					}
				}
				if (!b) {
					cart.push(a[0]);
				}	
			}
			alert[0].textContent = "The product has been added successfully";
			alert.css("background-color","forestgreen");
			alert.show();
		} else {
			alert[0].textContent = "Please choose a product id to added it to the cart.";
			alert.css("background-color","red");
			alert.show()
		}
		setTimeout(function(){
			alert.hide();
		},2000)
		ft_id[0].value = "";
	})

	btn_back.click(function(){
		$(this.parentElement.parentNode).hide();
		divFirst.show();
		divSecond.append(tbl);
		// alert.hide();
	})

	btn_search.click(function(){
		ask.hide();
		search.style.display = "none";
		var x =  compatibleProducts(marketProducts, word[0].value, Number(low[0].value), Number(high[0].value));
		tbl.append('<tr><th>Product Id</th><th>Product Name</th><th>Product Discription</th><th>Product Price</th><th>Product Quantity</th></tr>')
		for(var i in x){
			tbl.append("<tr><td>"+x[i].id+"</td><td>"+x[i].name+"</td><td>"+x[i].disc+"</td><td>"+x[i].price+"</td><td>"+x[i].quantity+"</td></tr>")
		}
	});

	btn_remove.click(function(){
		if (ft_id[0].value !== "") {
			if (cart.length === 0) {
				alert[0].textContent = "The cart doesn't have any product to remove.";
				alert.css("background-color","red");
				alert.show()
			} else {
				var indOfProductToRemove = -1;
				var a = filter(cart, function(product, i){
					if (product.id == ft_id[0].value) {
						indOfProductToRemove = i;
						return true;
					} else {
						return false;
					}
				})
				if (indOfProductToRemove === -1) {
					alert[0].textContent = "The product doesn't exist in the cart.";
					alert.css("background-color","red");
					alert.show()
				} else {
					if (cart[indOfProductToRemove]['quantity']>1) {
						cart[indOfProductToRemove]['quantity']--;
						cart[indOfProductToRemove]['price']/=2;
					} else {
						cart.splice(indOfProductToRemove,1);
					}
					alert[0].textContent = "The product has been removed successfully.";
					alert.css("background-color","forestgreen");
					alert.show()
				}
			}
		} else {
			alert[0].textContent = "Please choose a product id to remove it from the cart.";
			alert.css("background-color","red");
			alert.show();
		}
		setTimeout(function(){
			alert.hide();
		},2000)
	});
})

function generateProduct(id, name, disc, price, quantity){
	return {
		name : name,
		id : id,
		disc : disc,
		price : price,
		quantity : quantity
	}
}

function AllProducts(){
	var products = [];
	products.push(generateProduct(1000, "Oil", "Pure oil ,One bottle contains 3 liters", 15, 1));
	products.push(generateProduct(1001, "Rice", "Long grain ,One bag contain 5 kilogram", 30, 1));
	products.push(generateProduct(1002, "Sugar", "Soft sugar ,One bag contains 3 kilogram", 11.5, 1));
	products.push(generateProduct(1003, "Salt", "Coarse salt ,One bag contains 3 kilogram", 3.5, 1));
	products.push(generateProduct(1004, "Milk", "Cow milk ,One bottle contains 2 liters", 10, 1));
	products.push(generateProduct(1005, "Fish", "Fradi fish ,One bag contains 1 kilogram", 11, 1));
	return products;
}

function each(coll, func) {
	for (var key in coll) {
		func(coll[key], key);
	}
}

function filter (array,predicate){
	var acc=[];
	each(array,function(element,index){
	    if(predicate(element, index)){
	      acc.push(element);
	    }
	});
	return acc;
}


function compatibleProducts(marketProducts, keyWord, low, high){
	return filter(marketProducts, function(product, i){
		return product.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1 && product.price >= low && product.price <= high;
	})
}