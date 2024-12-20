document.addEventListener('DOMContentLoaded', function () {
	// Function to preload content
	function preloadContent() {
		const components = [
			{ url: 'Components_html/header.html', id: 'header' },
			{ url: 'Components_html/footer.html', id: 'footer' }
		];

		// Loop through the components and fetch each
		components.forEach(component => {
			fetch(component.url)
				.then(response => response.text())
				.then(data => {
					// Insert the HTML into the page
					document.getElementById(component.id).innerHTML = data;

					// After content is loaded, attach event listeners
					if (component.id === 'header') {
						attachHeaderEvents();
					}
				});
		});
	}

	// Attach the header events (navbar toggle and dropdown)
	function attachHeaderEvents() {
		const navbarToggler = document.getElementById('navbar-toggler');
		const navbarCollapse = document.getElementById('navbarNav');
		const navbarNav = document.querySelector('.navbar-nav');

		// Toggle mobile navigation on navbar toggler click
		if (navbarToggler) {
			navbarToggler.addEventListener('click', function () {
				navbarCollapse.classList.toggle('show');
				navbarToggler.classList.toggle('change'); // Hamburger icon animation
			});
		}

		// Handle the rotate button and dropdown menu visibility
		const rotateButton = document.getElementById('rotateButton');
		if (rotateButton) {
			rotateButton.addEventListener('click', function (event) {
				event.stopPropagation(); // Prevent click from propagating to window click listener
				this.classList.toggle('rotate-180');
				const dropdown = document.getElementById('dropdownMenu');
				dropdown.classList.toggle('show'); // Toggle dropdown visibility
			});
		}

		// Close the dropdown if the user clicks outside of the button or dropdown
		window.addEventListener('click', function (event) {
			const dropdown = document.getElementById('dropdownMenu');
			const button = document.getElementById('rotateButton');
			if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
				dropdown.classList.remove('show');
				button.classList.remove('rotate-180');
			}
		});
	}
	preloadContent();

	// Populate the products section with dynamic content
	const $sec = document.getElementById("home-products");
	const $dir_path = "/img/img-index/col_3_img-"; // Escape backslashes properly
	const $data = [
		{ shop: 'Tooling & Die', file_name: 'tooling_die.jpg' },
		{ shop: 'Stamping', file_name: 'stamping.jpg' },
		{ shop: 'Welding', file_name: 'welding.jpg' },
		{ shop: 'Plating', file_name: 'plating.jpg' },
	];

	function populateArray() {
		let $parent = '<div class="row">';
		$data.forEach(value => {
			$parent += `
			<div class="col-lg-3 col-md-6 p-1px">
				<a class="pstn_rel_dis_blck" href="#home-products" title="${value.shop}">
					<img class="img-fluid" src="${$dir_path}${value.file_name}" alt="${value.shop}">
					<div class="fill_tile">
						<h3>${value.shop}</h3>
					</div>
				</a>
			</div>
			`;
		});
		$parent += '</div>';
		$sec.innerHTML += $parent;
	}

	populateArray();
});
