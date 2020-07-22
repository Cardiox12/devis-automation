let counter = 0;

function add_to_list(item){
	const card = item.parentNode.parentNode.parentNode;
	const quote_title = card.querySelector(".quote-card-title").querySelector("h3").innerHTML;
	const quote_price = card.querySelector(".quote-card-footer-price").querySelector("input").value;
	const quote_list = document.querySelector(".quote-list").querySelector("ul");
	const quote_desc = item.parentNode.parentNode.parentNode.querySelector(".quote-card-desc").querySelector("p").innerHTML;

	console.log(quote_desc)

	const html = `
		
		<li class="quote-list-item" onclick="delete_item(this)">
			<span class="quote-list-item-name">${quote_title}</span>
			<div class="quote-list-item-price">
				<span>${quote_price}</span>
				<span>€</span>
			</div>
			<input type="hidden" name="price,${counter}" value="${quote_price}">
			<input type="hidden" name="title,${counter}" value="${quote_title}">
			<input type="hidden" name="desc,${counter}" value="${quote_desc}">
		</li>
	`;
	counter++;
	const nodes = new DOMParser().parseFromString(html, "text/html").body.childNodes[0];
	quote_list.appendChild(nodes);
	get_price();
}

function get_price(){
	const price_label = document.querySelector(".quote-resume-price-dyn-item").querySelector("span");
	const items = document.querySelector("ul").children;
	let acc = 0;

	for (const item of items){
		const price = item.querySelector(".quote-list-item-price").querySelector("span");
		acc += parseInt(price.innerHTML, 10);
	}
	price_label.innerHTML = `${acc}`;
}

function delete_item(item){
	item.remove();
	get_price();
}