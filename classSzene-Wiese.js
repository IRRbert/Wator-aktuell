class classSzene {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xeeeeee, 1, 900);

    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight,
      0.1,
      20000
    );
    let otto = 100 * 1.3;
    this.camera.position.set(otto, otto, otto / 2);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambientLight);

    this.light1 = new THREE.PointLight(0xffffff, 1, 2000);
    this.light1.position.set(150, 500, 160);
    this.light1.castShadow = true;
    this.light1.shadow.mapSize.width = 1024;
    this.light1.shadow.mapSize.height = 1024;
    this.light1.shadow.radius = 4;
    this.light1.shadow.bias = -0.001;
    this.scene.add(this.light1);

    this.light2 = new THREE.PointLight(0xffffff, 0.3, 2000);
    this.light2.position.set(-150, -100, 50);
    this.scene.add(this.light2);

    this.textureLoader = new THREE.TextureLoader();
    this.groundTexture = this.textureLoader.load(
      'https://threejs.org/examples/textures/terrain/grasslight-big.jpg'
    );
    this.groundTexture.wrapS = this.groundTexture.wrapT = THREE.RepeatWrapping;
    this.groundTexture.repeat.set(100, 100);

    this.groundMaterial = new THREE.MeshStandardMaterial({
      map: this.groundTexture,
      transparent: true, // Enable transparency
      opacity: 1
    });
    this.groundMaterial.side = THREE.DoubleSide;

    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(3000, 3000),
      this.groundMaterial
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    this.skyTexture = this.textureLoader.load(
      'texture/w11973-small.jpg'
    );
    this.skyMaterial = new THREE.MeshBasicMaterial({
      map: this.skyTexture,
      side: THREE.BackSide,
    });
    this.skySphere = new THREE.Mesh(
      new THREE.SphereGeometry(10000, 32, 32),
      this.skyMaterial
    );
    this.scene.add(this.skySphere);

    this.helperBoxGeometry = new THREE.BoxGeometry(100, 100, 100);
    this.helperBoxMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    this.helperBox = new THREE.Mesh(
      this.helperBoxGeometry,
      this.helperBoxMaterial
    );
    this.helperBox.position.set(0, 51, 0);
    this.scene.add(this.helperBox);

    this.updateObjects = [];

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  registerUpdateObject(obj) {
    if (typeof obj.update === 'function') {
      this.updateObjects.push(obj);
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    
    // Update ground visibility based on camera position
    if (this.camera.position.y < 0) {
      this.groundMaterial.opacity = 0.6; // Make ground invisible when camera is below
    } else {
      this.groundMaterial.opacity = 1; // Make ground visible when camera is above
    }
    
    this.renderer.render(this.scene, this.camera);

    // Update registered objects
    this.updateObjects.forEach((obj) => obj.update());
  }
}