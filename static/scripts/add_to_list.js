function add_to_list(item){
	const card = item.parentNode.parentNode.parentNode;
	const quote_title = card.querySelector(".quote-card-title").querySelector("h3").innerHTML;
	const quote_price = card.querySelector(".quote-card-footer-price").querySelector("input").value;
	const quote_list = document.querySelector(".quote-list").querySelector("ul");

	const html = `
		<li class="quote-list-item">
			<span class="quote-list-item-name">${quote_title}</span>
			<div class="quote-list-item-price">
				<span>${quote_price}</span>
				<span>€</span>
			</div>
		</li>
	`;
	const nodes = new DOMParser().parseFromString(html, "text/html").body.childNodes[0];
	quote_list.appendChild(nodes);
}