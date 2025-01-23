document.addEventListener('DOMContentLoaded', function () {
	function preloadContent() {
		const components = [
			{ url: 'Components/header.html', id: 'header' },
			{ url: 'Components/footer.html', id: 'footer' }
		];
		components.forEach(component => {
			fetch(component.url)
				.then(response => response.text())
				.then(data => {
					document.getElementById(component.id).innerHTML = data;

					if (component.id === 'header') {
						attachHeaderEvents(); // Initialize header-specific functionality
						initializeLanguage(); // Initialize language only after header is loaded
					}
				});
		});
	}

	function initializeLanguage() {
		const savedLanguage = localStorage.getItem("language") || "en";

		loadLanguageScript(savedLanguage, (translations) => {
			updateContent(translations);
		});

		const languageSelector = document.getElementById("lang-sel");
		if (languageSelector) {
			languageSelector.addEventListener("change", (event) => {
				const selectedLanguage = event.target.value;
				localStorage.setItem("language", selectedLanguage);
				loadLanguageScript(selectedLanguage, (translations) => {
					updateContent(translations);
				});
			});
		}
	}
	function loadLanguageScript(language, callback) {
		const script = document.createElement("script");
		script.src = `locale/${language}.js`;
		script.onload = () => {
			callback(window.currentTranslations); // Use the loaded translations
		};
		document.body.appendChild(script);
	}
	function updateContent(translations) {
		document.querySelectorAll("[id]").forEach((element) => {
			const key = element.id;
			if (translations[key]) {
				element.innerHTML = translations[key]; // Use innerHTML for HTML content
			}
		});
	}

	function attachHeaderEvents() {
		const navbarToggler = document.getElementById('navbar-toggler');
		const navbarCollapse = document.getElementById('navbarNav');
		if (navbarToggler) {
			navbarToggler.addEventListener('click', function () {
				navbarCollapse.classList.toggle('show');
				navbarToggler.classList.toggle('change');
			});
		}

		const header = document.getElementById('header');
		let lastScrollY = window.scrollY; // Store the last scroll position
		let isScrollingDown = false;

		if (!header) {
				console.warn("Header not found!");
				return; // Exit if the header doesn't exist
		}
		// Ensure the CSS class "hidden" exists and does what it should
		if (!document.styleSheets[0].rules.some(rule => rule.selectorText === '.hidden')) {
				console.warn('CSS class `.hidden` is not defined.');
		}

		// Scroll effect: Hide header on scroll down, show on scroll up
		window.addEventListener('scroll', () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 100) { 
				// Scrolling down and scroll position is significant
				if (!isScrollingDown) {
					isScrollingDown = true;
					header.classList.add('hidden');
				}
			} else if (currentScrollY < lastScrollY || currentScrollY <= 100) { 
						// Scrolling up or near top of page
				isScrollingDown = false;
				header.classList.remove('hidden');
			}
			lastScrollY = currentScrollY; // Update last scroll position
		});
	}
	// Initialize the script
	preloadContent();

	// Page-specific functions
	function initializePageSpecificFunctions() {
		const currentPage = document.body.dataset.page;

		switch (currentPage) {
			case 'index':
				populateHomeProducts();
				populateCarousel('crsl-pro_gal', $arrProGal);
				populateCarousel('crsl-client', $arrClient);
				Awrd_com_row();

				break;

			case 'about':
				// Add About page-specific functionality here
				break;

			// Add more cases for other pages if needed
		}
	}

	// Home Page-specific: Populate products and carousels
	const $sec = document.getElementById("home-products");
	const $dir_path = "img/img-index/col_3_img-";
	const $data = [
		{ shop: 'Tooling & Die', file_name: 'tooling_die.avif', link: 'https://www.brother-autoparts.com/#/Tooling' },
		{ shop: 'Stamping', file_name: 'stamping.avif', link: 'https://www.brother-autoparts.com/#/Stamping&welding' },
		{ shop: 'Welding', file_name: 'welding.avif', link: 'https://www.brother-autoparts.com/#/Stamping&welding' },
		{ shop: 'Plating', file_name: 'plating.avif', link: 'https://www.brother-autoparts.com/#/PlatingProduct' },
	];

	function populateHomeProducts() {
		let $parent = '<div class="row">';
		$data.forEach(value => {
			$parent += `
			<div class="col-md-3 col-6 p-1px">
				<a class="fill_tile pstn_rel_dis_blck" href="${value.link}" title="${value.shop}" target="_blank">
					<img class="img-fluid" src="${$dir_path}${value.file_name}" alt="${value.shop}">
					<div>
						<h3>${value.shop}</h3>
					</div>
				</a>
			</div>
			`;
		});
		$parent += '</div>';
		$sec.innerHTML += $parent;
	}

	const path_Pro_gal = "img/img-index/img-crsl-pro_gal/";
	const $arrProGal = [
		{ title: 'Parts1 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts2 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts3 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts4 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts5 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts6 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts7 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts8 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts9 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts10 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts11 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
		{ title: 'Parts12 Catalytic Converter Bracket', file_name: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif`, link_add: `${ path_Pro_gal }s-Bracket Corner Sensor  E.avif` },
	];

	const path_Client = "img/img-index/img-crsl-client_gal/logo-";
	const $arrClient = [
		{ title: 'Mitsubishi Motors (Thailand) Co., Ltd.', file_name: `${ path_Client }MMTh.svg`, link_add: 'https://www.mitsubishi-motors.co.th/th?rd=true' },
		{ title: 'H-ONE Parts (Thailand) Co., Ltd.', file_name: `${ path_Client }H_one.svg`, link_add: 'https://www.h1-co.jp/eng/' },
		{ title: 'Hitachi Consumer Products (Thailand) Ltd.', file_name: `${ path_Client }Hitachi.svg`, link_add: 'https://www.hitachi-homeappliances.com/th-en/' },
		{ title: 'NHK Spring (Thailand) Co., Ltd.', file_name: `${ path_Client }Nhk.svg`, link_add: 'https://www.nhkspg.co.th/th/' },
		{ title: 'Copeland (Thailand) Ltd.', file_name: `${ path_Client }Emerson.png`, link_add: 'https://www.copeland.com/en-th/tools-resources/facilities/thailand' },
		{ title: 'Magna Automotive Technology (Thailand) Co., Ltd.', file_name: `${ path_Client }Magna.svg`, link_add: 'https://www.magna.com/' },
		{ title: 'Walker Exhaust (Thailand) Co., Ltd.', file_name: `${ path_Client }Walker.svg`, link_add: 'https://www.walkerexhaust.com/' },
		{ title: 'MAHLE Engine Components (Thailand) Co., Ltd.', file_name: `${ path_Client }Mahle.svg`, link_add: 'https://www.mahle.com/en/about-mahle/locations/1166.jsp' },
		{ title: 'Techno Associe (Thailand) Co., Ltd.', file_name: `${ path_Client }Techno_associe.png`, link_add: 'https://www.technoassocie.co.jp/en/company/network/thailand/' },
		{ title: 'Thai Kokoku Rubber Co., Ltd.', file_name: `${ path_Client }Kokoku.png`, link_add: 'https://www.kokoku-intech.com/en/' },
		{ title: 'Innova Rubber Co., Ltd.', file_name: `${ path_Client }Innova_rubber.png`, link_add: 'https://www.ircthailand.com/th/home' },
		{ title: 'Prospira (Thailand) Co., Ltd.', file_name: `${ path_Client }Prospira.svg`, link_add: 'https://prospira.com/' },
	];

	function populateCarousel(carouselId, data) {
		const wrapper = document.getElementById(`${carouselId}-wrapper`);
		const container = document.getElementById(carouselId);

		container.innerHTML = '';

		data.forEach(value => {
			const itemDiv = document.createElement('div');
			itemDiv.classList.add('crsl-item');

			const linkElement = document.createElement('a');
			linkElement.href = value.link_add;

			// Check carousel type and handle target behavior
			if (carouselId === 'crsl-pro_gal') {
				linkElement.removeAttribute('target');
				linkElement.addEventListener('click', (event) => {
					event.preventDefault();
					openModal(value.file_name);
				});
			} else {
				linkElement.target = "_blank";
			}

			const imgElement = document.createElement('img');
			imgElement.src = value.file_name;
			imgElement.alt = value.title;

			const captionDiv = document.createElement('div');
			captionDiv.classList.add('caption');
			captionDiv.textContent = value.title;

			linkElement.appendChild(imgElement);
			linkElement.appendChild(captionDiv);
			itemDiv.appendChild(linkElement);

			container.appendChild(itemDiv);
		});

		const prevButton = document.createElement('button');
		prevButton.classList.add('crsl-prev');
		prevButton.innerHTML = '&#10094;';
		prevButton.onclick = () => moveSlide(-1, carouselId);

		const nextButton = document.createElement('button');
		nextButton.classList.add('crsl-next');
		nextButton.innerHTML = '&#10095;';
		nextButton.onclick = () => moveSlide(1, carouselId);

		wrapper.appendChild(prevButton);
		wrapper.appendChild(nextButton);
	}
	// Initialize index for carousel movement
	let index1 = 0;

	function moveSlide(step, carouselId) {
		const slides = document.querySelectorAll(`#${carouselId} .crsl-item`);
		const totalSlides = slides.length;

		const slidesToShow = 4; // Show 4 items at a time

		// Calculate the new index
		index1 = (index1 + step + totalSlides) % totalSlides;

		// Adjust the container's transform property to show the correct slides
		const carouselContainer = document.querySelector(`#${carouselId}`);
		const slideWidth = 100 / slidesToShow; // 25% per slide
		carouselContainer.style.transform = `translateX(-${index1 * slideWidth}%)`; // Move the carousel
	}

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
	document.getElementById("closeModal").addEventListener("click", closeModal);
	
	function Awrd_com_row(){
		const $container = document.getElementById('awrd_com_row');
		const path_Client = "img/img-index/img-crsl-client_gal/logo-";
		const $arrAwrd_com = [
			{ title: 'Mitsubishi Motors (Thailand) Co., Ltd.', file_name: `${path_Client}MMTh.svg`, link_add: 'https://www.mitsubishi-motors.co.th/th?rd=true' },
			{ title: 'H-ONE Parts (Thailand) Co., Ltd.', file_name: `${path_Client}H_one.svg`, link_add: 'https://www.h1-co.jp/eng/' },
			{ title: 'Bridgestone Tire Manufacturing (Thailand) Co., Ltd.', file_name: `${path_Client}Bridgestone.svg`, link_add: 'https://www.bridgestone.co.th/en' },
		];

		$arrAwrd_com.forEach(client => {
			const $innerHTML = `
				<div class="home-awd_com py-2">
					<a href="${client.link_add}" target="_blank">
						<img class="" src="${client.file_name}" alt="${client.title}">
						<div class="caption">${client.title}</div>
					</a>
				</div>
			`;
			$container.innerHTML += $innerHTML;
		});
	}

	// Initialize the script
	preloadContent();
	initializeLanguage();
	initializePageSpecificFunctions();
});
