// Three.js WebGL Background Scene

class ThreeJSScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createParticles();
        this.createLights();
        this.addEventListeners();
        this.animate();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x050505, 10, 20);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        const container = document.getElementById('webgl-container');
        if (container) {
            container.appendChild(this.renderer.domElement);
        }
    }

    createParticles() {
        const particlesCount = 2000;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Positions
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;

            // Colors
            colors[i] = Math.random() * 0.5 + 0.5;     // R
            colors[i + 1] = Math.random() * 0.3 + 0.7; // G
            colors[i + 2] = Math.random() * 0.5 + 0.5; // B
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00f5d4, 0.5);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x9b5de5, 0.5, 100);
        pointLight.position.set(-5, -5, -5);
        this.scene.add(pointLight);
    }

    addEventListeners() {
        // Mouse move event
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Window resize event
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll event for parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * -0.5;
            this.particles.position.y = parallax * 0.01;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.x += 0.0005;
            this.particles.rotation.y += 0.001;

            // Mouse interaction
            this.particles.rotation.x += this.mouseY * 0.0001;
            this.particles.rotation.y += this.mouseX * 0.0001;

            // Pulsating effect
            const time = Date.now() * 0.001;
            this.particles.scale.setScalar(1 + Math.sin(time) * 0.1);
        }

        this.renderer.render(this.scene, this.camera);
    }

    // Method to update particle colors based on theme
    updateThemeColors(isLightMode) {
        if (this.particles) {
            const colors = this.particles.geometry.attributes.color.array;
            
            for (let i = 0; i < colors.length; i += 3) {
                if (isLightMode) {
                    // Light mode colors (blues and purples)
                    colors[i] = Math.random() * 0.3 + 0.2;     // R
                    colors[i + 1] = Math.random() * 0.4 + 0.3; // G
                    colors[i + 2] = Math.random() * 0.8 + 0.5; // B
                } else {
                    // Dark mode colors (cyans and magentas)
                    colors[i] = Math.random() * 0.5 + 0.5;     // R
                    colors[i + 1] = Math.random() * 0.3 + 0.7; // G
                    colors[i + 2] = Math.random() * 0.5 + 0.5; // B
                }
            }
            
            this.particles.geometry.attributes.color.needsUpdate = true;
        }
    }

    // Method to add interactive particles on click
    addClickParticles(x, y) {
        const particleCount = 50;
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = x;
            positions[i + 1] = y;
            positions[i + 2] = 0;

            velocities[i] = (Math.random() - 0.5) * 0.02;
            velocities[i + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i + 2] = (Math.random() - 0.5) * 0.02;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00f5d4,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);

        // Animate particles
        const animateParticles = () => {
            const positions = particles.geometry.attributes.position.array;
            let allParticlesGone = true;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Fade out
                material.opacity -= 0.01;

                if (material.opacity > 0) {
                    allParticlesGone = false;
                }
            }

            particles.geometry.attributes.position.needsUpdate = true;

            if (!allParticlesGone && material.opacity > 0) {
                requestAnimationFrame(animateParticles);
            } else {
                this.scene.remove(particles);
            }
        };

        animateParticles();
    }

    // Cleanup method
    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mousemove', this.handleMouseMove);
    }
}

// Initialize Three.js scene
let threeScene = null;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('webgl-container')) {
        threeScene = new ThreeJSScene();
        
        // Add click effect
        document.addEventListener('click', (event) => {
            if (threeScene) {
                const x = (event.clientX / window.innerWidth) * 2 - 1;
                const y = -(event.clientY / window.innerHeight) * 2 + 1;
                threeScene.addClickParticles(x, y);
            }
        });
    }
});

// Export for theme switching
window.updateThreeJSTheme = (isLightMode) => {
    if (threeScene) {
        threeScene.updateThemeColors(isLightMode);
    }
};