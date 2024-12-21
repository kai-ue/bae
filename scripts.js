document.addEventListener('DOMContentLoaded', function () {
	// Function to preload content
	function preloadContent() {
		const components = [
			{ url: 'Components/header.html', id: 'header' },
			{ url: 'Components/footer.html', id: 'footer' }
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
	const $dir_path = "img/img-index/col_3_img-"; // Escape backslashes properly
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
	
	// Data arrays for carousel
	const path_Pro_gal = "C:\\Users\\kaika\\Documents\\BAE\\Website\\ref\\img\\";
	const $arrProGal = [
		{ title: 'Parts1 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor	E.jpg`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor	E.jpg` },
		// More items...
	];

	const path_Client = "C:\\Users\\kaika\\Documents\\BAE\\Website\\img\\img-index\\img-crsl-client_gal\\logo-";
	const $arrClient = [
		{ title: 'Mitsubishi Motors (Thailand) Co., Ltd.', file_name: `${ path_Client }MMTh.svg`, link_add: 'https://www.mitsubishi-motors.co.th/th?rd=true' },
		// More items...
	];

	// Function to populate carousel items dynamically
	function populateCarousel(carouselId, data) {
		const container = document.getElementById(carouselId);
		data.forEach(value => {
			const itemDiv = document.createElement('div');
			itemDiv.classList.add('carousel-item');

			// Create <a> tag for opening the image (conditionally applied)
			const linkElement = document.createElement('a');
			linkElement.href = value.link_add;

			// Check carousel type and handle target behavior
			if (carouselId === 'crsl_img-pro_gal') {
				linkElement.removeAttribute('target');
				linkElement.addEventListener('click', (event) => {
					event.preventDefault();
					openModal(value.file_name);	// Open the modal with the image
				});
			} else {
				linkElement.target = "_blank"; // For client gallery, open in new tab
			}

			const imgElement = document.createElement('img');
			imgElement.src = value.file_name;
			imgElement.alt = value.title;

			// Caption
			const captionDiv = document.createElement('div');
			captionDiv.classList.add('caption');
			captionDiv.textContent = value.title;

			// Append image and caption to the link
			linkElement.appendChild(imgElement);
			linkElement.appendChild(captionDiv);
			itemDiv.appendChild(linkElement);

			// Append the item to the carousel
			container.appendChild(itemDiv);
		});
	}

	// Populate both carousels
	populateCarousel('crsl_img-pro_gal', $arrProGal);
	populateCarousel('crsl_img-client', $arrClient);

	// Initialize index for carousel movement
	let index1 = 0;
	let index2 = 0;

	// Function to move the carousel images
	function moveSlide(step, carouselId) {
		const slides = document.querySelectorAll(`#${carouselId} .carousel-item`);
		const totalSlides = slides.length;
		let index = carouselId === 'crsl_img-pro_gal' ? index1 : index2;
		index = (index + step + totalSlides) % totalSlides;

		const carouselContainer = document.querySelector(`#${carouselId}`);
		carouselContainer.style.transform = `translateX(-${index * 100}%)`; // 100% for full carousel slide

		// Update the index for the respective carousel
		if (carouselId === 'crsl_img-pro_gal') {
			index1 = index;
		} else {
			index2 = index;
		}
	}

	// Modal functionality for image enlargement
	function openModal(src) {
		const modal = document.getElementById("imageModal");
		const modalImage = document.getElementById("modalImage");
		modalImage.src = src;
		modal.style.display = "flex"; // Show the modal
	}

	function closeModal() {
		const modal = document.getElementById("imageModal");
		modal.style.display = "none"; // Hide the modal
	}

	// Adding event listeners for modal close
	document.getElementById("closeModal").addEventListener("click", closeModal);
});
