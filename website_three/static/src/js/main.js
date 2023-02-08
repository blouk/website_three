odoo.define('openerp_website.o_website_labodoo_page', function (require) {
	'use strict';
	const publicWidget = require('web.public.widget');

	publicWidget.registry.ThreeJSView = publicWidget.Widget.extend({
		selector: '#c',
		init: function () {
			this.container = {};
			this.camera = {};
			this.scene = {};
			this.renderer = {};
			this.controls = {};
			this.mouseX = 0;
			this.mouseY = 0;


			return this._super.apply(this, arguments);
		},

		render: function () {


			this.renderer.render(this.scene, this.camera);
		},

		animate: function () {
			requestAnimationFrame(this.animate.bind(this));
			this.controls.update();
			this.render();
		},

		

		onWindowResize: function () {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
		},

		collada_load: function (collada) {
			this.scene.add(collada.scene);
		},

		start: function () {
			this.container = this.el;
            this.scene = new THREE.Scene();
			this.scene.background = new THREE.Color(0xaaaaaa);

			
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 2500);
			
			
            this.camera.position.set( 8, 10, 8 );
            this.camera.lookAt( 0, 3, 0 );
		

			const light = new THREE.DirectionalLight(0xffffff);
			light.position.set(0, 0, 1);
			this.scene.add(light);

			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.container.appendChild(this.renderer.domElement);

            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			this.controls.listenToKeyEvents(window);
            this.controls.target.set( 0, 0, 0 );
			this.controls.minDistance = 1;
			this.controls.maxDistance = 20;

			window.addEventListener('resize', this.onWindowResize.bind(this));
			this.animate();

			const loader = new ColladaLoader();
			loader.load('/website_three/static/src/3d/monkey.dae', this.collada_load.bind(this));
			return this._super.apply(this, arguments);
		},
	});
});
