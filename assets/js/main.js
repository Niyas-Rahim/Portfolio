(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		// $('.scrolly').scrolly({
			// speed: 1000,
			// offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					// if (breakpoints.active('<=large')
					// &&	!breakpoints.active('<=small')
					// &&	$sidebar.length > 0)
						// return $sidebar.height();

				// return 0;

			// }
		// });

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});
	  // Type_animation.
			  document.addEventListener("DOMContentLoaded", function () {
			      new Typed("#typed", {
			        strings: ["I'm Niyas Rahim"],
			        typeSpeed: 60,
			        backSpeed: 40,
			        backDelay: 1200,    // wait before deleting
			        loop: true,         // 🔁 loops forever
			        showCursor: true,
			        cursorChar: '|',
			      });
			    });
				document.addEventListener("DOMContentLoaded", function () {
			      new Typed("#type", {
			        strings: ["Graphic Designer", "Web Designer"],
			        typeSpeed: 60,
			        backSpeed: 40,
			        backDelay: 1200,    // wait before deleting
			        loop: true,         // 🔁 loops forever
			        showCursor: true,
			        cursorChar: '|',
			      });
			    });
				
				
				
})(jQuery);

		// Overlay 
				// $(document).ready(function() {
					  // $('.moving').snakeify(); // or $('.gallery-area .mover.moving').snakeify();
				// });
			    $(".moving").snakeify({
				 speed: 200
			    });
				
				
		// Smooth Floating with JavaScript 

				const img1 = document.getElementById("floatingImg1");
				const img2 = document.getElementById("floatingImg2");
				const img3 = document.getElementById("floatingImg3");

				function randomFloat(min, max) {
				  return Math.random() * (max - min) + min;
				}

				function floatImage(img) {
				  const x = randomFloat(-30, 30);
				  const y = randomFloat(-30, 30);
				  const rotate = randomFloat(-5, 5);

				  img.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
				}
				setInterval(() => {
				  floatImage(img1);
				  floatImage(img2);
				  floatImage(img3);
				}, 3000);

				floatImage(img1);
				floatImage(img2);
				floatImage(img3);
				
				
				
		/* 3D Particle Background */
 
				const scene = new THREE.Scene();
					const camera = new THREE.PerspectiveCamera(
					  75,
					  window.innerWidth / window.innerHeight,
					  0.1,
					  1000
					);
					const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
					renderer.setSize(window.innerWidth, window.innerHeight);
					document.getElementById("bg").appendChild(renderer.domElement);

					// Add fog for depth
					scene.fog = new THREE.Fog(0x1e0044, 1, 100);

					// Gradient Texture
					function createGradientTexture() {
					  const size = 256;
					  const canvas = document.createElement("canvas");
					  canvas.width = size;
					  canvas.height = size;
					  const ctx = canvas.getContext("2d");

					  const gradient = ctx.createLinearGradient(0, 0, size, size);
					  gradient.addColorStop(0, "#E9DEFF"); 
					  gradient.addColorStop(1, "#F5F0FF"); 

					  ctx.fillStyle = gradient;
					  ctx.fillRect(0, 0, size, size);

					  return new THREE.CanvasTexture(canvas);
					}

					const gradientTexture = createGradientTexture();

					// Particle geometry
					const particleCount = 3000;
					const positions = [];

					for (let i = 0; i < particleCount; i++) {
					  positions.push((Math.random() - 0.5) * 100);
					  positions.push((Math.random() - 0.5) * 100);
					  positions.push((Math.random() - 0.5) * 100);
					}

					const geometry = new THREE.BufferGeometry();
					geometry.setAttribute(
					  "position",
					  new THREE.Float32BufferAttribute(positions, 3)
					);

					// Particle material with gradient
					const material = new THREE.PointsMaterial({
					  size: 1.2,
					  map: gradientTexture,
					  transparent: true,
					  depthWrite: false,
					  blending: THREE.AdditiveBlending
					});

					const points = new THREE.Points(geometry, material);
					scene.add(points);

					// Camera position
					camera.position.z = 10;

					// Animate
					function animate() {
					  requestAnimationFrame(animate);
					  points.rotation.y += 0.001;
					  points.rotation.x += 0.0005;
					  renderer.render(scene, camera);
					}

					animate();

					// Responsive
					window.addEventListener("resize", () => {
					  camera.aspect = window.innerWidth / window.innerHeight;
					  camera.updateProjectionMatrix();
					  renderer.setSize(window.innerWidth, window.innerHeight);
					});



