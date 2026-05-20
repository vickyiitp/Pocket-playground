
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 16 16" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.44c-3.117 0-3.486.01-4.71.066-2.83.13-4.145 1.43-4.275 4.275-.056 1.224-.066 1.593-.066 4.71s.01 3.486.066 4.71c.13 2.845 1.445 4.145 4.275 4.275 1.224.056 1.593.066 4.71.066s3.486-.01 4.71-.066c2.83-.13 4.145 1.43 4.275-4.275.056-1.224.066-1.593.066-4.71s-.01-3.486-.066-4.71c-.13-2.845-1.445-4.145-4.275-4.275C15.486 3.613 15.117 3.603 12 3.603zm0 5.48c-1.944 0-3.51 1.566-3.51 3.51s1.566 3.51 3.51 3.51 3.51-1.566 3.51-3.51-1.566-3.51-3.51-3.51zm0 5.52c-1.116 0-2.02- .904-2.02-2.02s.904-2.02 2.02-2.02 2.02.904 2.02 2.02-.904 2.02-2.02 2.02zm4.61-6.57c0 .565-.458 1.023-1.023 1.023s-1.023-.458-1.023-1.023.458-1.023 1.023-1.023 1.023.458 1.023 1.023z"/>
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75ZM11.46 13.825h1.54L5.43 2.175H3.745l7.715 11.65Z"/>
    </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const SOCIALS = [
    { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/vickyiitp' },
    { name: 'Instagram', icon: InstagramIcon, url: 'https://instagram.com/vickyiitp' },
    { name: 'X', icon: XIcon, url: 'https://x.com/vickyiitp' },
    { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://linkedin.com/in/vickyiitp' },
];

interface LandingPageProps {
  onEnter: () => void;
}


export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    // This function adds a smooth fade-out animation before calling the onEnter prop.
    gsap.to(uiRef.current, {
        duration: 0.7,
        opacity: 0,
        y: -30,
        ease: 'power2.in',
        onComplete: onEnter
    });
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    mountRef.current.style.opacity = '1';

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // --- Texture Loading ---
    const textureLoader = new THREE.TextureLoader();
    const earthDayMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const earthNormalMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');
    const earthSpecularMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
    const cloudsMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_2048.png');
    const rockTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg');
    const crackEmissiveMap = textureLoader.load('https://i.imgur.com/g83AT5j.png'); // A pre-made crack texture

    // --- Earth ---
    const earthGroup = new THREE.Group();
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthDayMap,
        normalMap: earthNormalMap,
        specularMap: earthSpecularMap,
        shininess: 20
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earth);

    // --- Clouds ---
    const cloudGeometry = new THREE.SphereGeometry(5.1, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({ map: cloudsMap, transparent: true, opacity: 0.6 });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earthGroup.add(clouds);

    // --- Atmospheric Glow ---
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            'c': { value: 0.7 },
            'p': { value: 4.0 },
            glowColor: { value: new THREE.Color(0x90c3d4) },
            viewVector: { value: camera.position }
        },
        vertexShader: `
            uniform vec3 viewVector;
            uniform float c;
            uniform float p;
            varying float intensity;
            void main() {
                vec3 vNormal = normalize( normalMatrix * normal );
                vec3 vNormel = normalize( normalMatrix * viewVector );
                intensity = pow( c - dot(vNormal, vNormel), p );
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            varying float intensity;
            void main() {
                vec3 glow = glowColor * intensity;
                gl_FragColor = vec4( glow, 1.0 );
            }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    const glow = new THREE.Mesh(new THREE.SphereGeometry(5.4, 64, 64), glowMaterial);
    earthGroup.add(glow);
    scene.add(earthGroup);
    
     // --- Post-Impact Earth Material ---
    const destroyedEarthMaterial = new THREE.MeshPhongMaterial({
        map: earthDayMap,
        normalMap: earthNormalMap,
        specularMap: earthSpecularMap,
        shininess: 20,
        emissiveMap: crackEmissiveMap,
        emissive: new THREE.Color(0xff6600),
        emissiveIntensity: 0
    });

    // --- Starfield ---
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // --- Meteorites ---
    const meteorGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const meteorMaterial = new THREE.MeshPhongMaterial({ map: rockTexture });
    const meteorites: THREE.Object3D[] = [];
    for (let i = 0; i < 5; i++) {
        const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
        const pivot = new THREE.Object3D();
        pivot.add(meteor);
        const angle = Math.random() * Math.PI * 2;
        const dist = 8 + Math.random() * 4;
        meteor.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 4, Math.sin(angle) * dist);
        pivot.rotation.x = Math.random() * Math.PI;
        pivot.rotation.y = Math.random() * Math.PI;
        scene.add(pivot);
        meteorites.push(pivot);
    }
    
    // --- Destroyer Meteor ---
    const destroyerMeteor = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshStandardMaterial({
        color: 0xff4500,
        emissive: 0xff6347,
        metalness: 0.5,
        roughness: 0.5,
    }));
    destroyerMeteor.position.set(40, 20, -50);
    scene.add(destroyerMeteor);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        earth.rotation.y += 0.05 * delta;
        clouds.rotation.y += 0.08 * delta;
        stars.rotation.y += 0.01 * delta;
        meteorites.forEach((m, i) => {
            m.rotation.y += (0.1 + i * 0.05) * delta;
        });
        (glow.material as THREE.ShaderMaterial).uniforms.viewVector.value = new THREE.Vector3().subVectors(camera.position, glow.position);
        renderer.render(scene, camera);
    };
    animate();

    // --- GSAP Timeline ---
    const tl = gsap.timeline({
        onComplete: () => {
            if (uiRef.current) {
                uiRef.current.style.pointerEvents = 'auto';

                // Select elements for the new entrance animation
                const h1 = uiRef.current.querySelector('h1');
                const p1 = uiRef.current.querySelector('header p');
                const mainSection = uiRef.current.querySelector('main section');
                const button = uiRef.current.querySelector('main button');
                const footerSocials = uiRef.current.querySelectorAll('footer a');
                const footerText = uiRef.current.querySelector('footer p');

                // Set initial states for the animation (off-screen, invisible)
                gsap.set(uiRef.current, { opacity: 1, y: 0 }); // Make container visible
                gsap.set([h1, p1, mainSection, button, footerSocials, footerText], { autoAlpha: 0 });
                gsap.set(h1, { y: -30 });
                gsap.set(p1, { y: -20 });
                gsap.set(mainSection, { y: 20, scale: 0.95 });
                gsap.set(button, { scale: 0.5 });
                gsap.set(footerSocials, { y: 20 });
                gsap.set(footerText, { y: 20 });

                // Create the UI entrance timeline
                const uiTl = gsap.timeline({ delay: 0.5 }); // Add a small delay for effect
                uiTl.to(h1, { duration: 1, y: 0, autoAlpha: 1, ease: 'power3.out' })
                    .to(p1, { duration: 0.8, y: 0, autoAlpha: 1, ease: 'power3.out' }, "-=0.7")
                    .to(mainSection, { duration: 1, y: 0, scale: 1, autoAlpha: 1, ease: 'power3.out' }, "-=0.6")
                    .to(button, { duration: 1.5, scale: 1, autoAlpha: 1, ease: 'elastic.out(1, 0.5)' }, "-=0.5")
                    .to(footerSocials, { duration: 0.5, y: 0, autoAlpha: 1, stagger: 0.1, ease: 'power2.out' }, "-=1")
                    .to(footerText, { duration: 0.5, y: 0, autoAlpha: 1, ease: 'power2.out' }, "-=0.3");
            }
        }
    });

    tl.to(camera.position, { duration: 3, z: 30, ease: 'power1.inOut' })
    .to(destroyerMeteor.position, { duration: 4, x: 0, y: 0, z: 7, ease: 'power2.in' }, '-=2.5')
    .to(camera.position, { duration: 4, x: -4, y: 2, z: 10, ease: 'power2.inOut', onUpdate: () => camera.lookAt(earth.position) }, "-=4")
    .to(destroyerMeteor.scale, { duration: 4, x: 3, y: 3, z: 3, ease: 'power2.in' }, "-=4")
    .add(() => { // Impact
        scene.remove(destroyerMeteor);
        earth.material = destroyedEarthMaterial;
        gsap.to(pointLight, { duration: 0.2, intensity: 10, yoyo: true, repeat: 1 });
        const shockwaveGeo = new THREE.RingGeometry(0.1, 0.2, 64);
        const shockwaveMat = new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide, transparent: true });
        const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
        shockwave.position.copy(destroyerMeteor.position.normalize().multiplyScalar(5));
        shockwave.lookAt(new THREE.Vector3(0,0,0));
        scene.add(shockwave);
        gsap.to(shockwave.scale, { duration: 1, x: 50, y: 50, z: 50 });
        gsap.to(shockwave.material, { duration: 1, opacity: 0, onComplete: () => scene.remove(shockwave) });
    }, ">")
    .to(destroyedEarthMaterial, { duration: 3, emissiveIntensity: 2.5, ease: 'power2.out' }, ">")
    .to(camera.position, { duration: 3, x: 0, y: 0, z: 8, ease: 'power2.inOut', onUpdate: () => camera.lookAt(earth.position) }, "<")
    .to(textRef.current, { duration: 2, opacity: 1, ease: 'power2.out' }, ">-1.5")
    .add(() => { // Fragmentation
        const fragments: THREE.Mesh[] = [];
        const numFragments = 15;
        for (let i = 0; i < numFragments; i++) {
            const fragSize = 0.2 + Math.random() * 0.8;
            const fragGeo = new THREE.BoxGeometry(fragSize, fragSize, fragSize);
            const fragMat = new THREE.MeshPhongMaterial({ map: rockTexture, emissive: 0x441100, emissiveIntensity: 0.5 });
            const fragment = new THREE.Mesh(fragGeo, fragMat);
            fragment.position.set( (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2 );
            scene.add(fragment);
            fragments.push(fragment);
            gsap.to(fragment.position, {
                duration: 5 + Math.random() * 5,
                x: fragment.position.x * 10,
                y: fragment.position.y * 10,
                z: fragment.position.z * 10,
                ease: 'power1.out'
            });
            gsap.to(fragment.rotation, {
                duration: 10 + Math.random() * 10,
                x: Math.random() * Math.PI * 4,
                y: Math.random() * Math.PI * 4,
                ease: 'none',
                repeat: -1
            });
        }
    }, ">-1")
    .to(earthGroup.scale, { duration: 3, x: 1.1, y: 1.1, z: 1.1, ease: 'power1.inOut' }, "<")
    .to(destroyedEarthMaterial, { duration: 3, opacity: 0, transparent: true }, ">-1")
    .to(clouds.material, { duration: 2, opacity: 0 }, "<")
    .to(camera.position, { duration: 5, z: 50, ease: 'power2.out' }, ">")
    .to(textRef.current, { duration: 2, opacity: 0, ease: 'power2.in' }, "<")
    .to(mountRef.current, { duration: 1, opacity: 0, onComplete: () => { if(mountRef.current) mountRef.current.style.display = 'none'; } }, ">-0.5");


    // --- Resize Handler ---
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // --- Cleanup ---
    return () => {
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        scene.traverse(object => {
            if (object instanceof THREE.Mesh) {
                object.geometry?.dispose();
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material?.dispose();
                }
            }
        });
        renderer.dispose();
    };
  }, []);
  
  return (
    <div className="relative h-full w-full">
      <div id="landing-canvas" ref={mountRef}></div>
      <div 
        ref={textRef} 
        className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-3xl font-bold z-20 pointer-events-none opacity-0 drop-shadow-[0_0_10px_rgba(255,100,0,0.8)]"
      >
        When the hope fades, destruction begins.
      </div>
      <div ref={uiRef} className="relative h-full flex flex-col items-center p-6 text-center overflow-y-auto z-10 opacity-0 pointer-events-none transition-opacity duration-1000">
           <div className="flex flex-col items-center justify-between h-full w-full">
                <header className="w-full max-w-5xl mx-auto mt-12">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
                    <span className="bg-gradient-to-r from-slate-200 via-violet-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        END THE SCROLL
                    </span>
                    </h1>
                    <p className="text-slate-400 mt-4 text-lg md:text-xl drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">
                    Shatter the mindless feed with meteoric micro-experiences.
                    </p>
                </header>

                <main className="w-full max-w-3xl mx-auto my-8 flex-grow flex flex-col justify-center">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-100 mb-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">Reclaim Your Mind.</h2>
                        <p className="text-slate-300 leading-relaxed max-w-xl mx-auto">
                            This isn't another infinite scroll. It's a playground of fire, water, and earth—elemental experiences designed to spark creativity, challenge your focus, or grant a moment of calm. Break free from the algorithm.
                        </p>
                    </section>
                    
                    <div>
                        <button
                            onClick={handleEnter}
                            className="mt-12 px-10 py-4 bg-slate-50 text-slate-900 font-bold rounded-full text-lg hover:scale-105 active:scale-100 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3),_0_0_40px_rgba(192,132,252,0.2)]"
                            style={{ animation: 'pulse 2.5s infinite' }}
                        >
                            Enter the Playground
                        </button>
                    </div>
                </main>

                <footer className="w-full max-w-5xl mx-auto mb-4">
                    <div className="flex justify-center items-center space-x-4">
                        {SOCIALS.map(social => (
                            <a 
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit Vicky's ${social.name}`}
                                className="text-slate-500 hover:text-slate-200 transition-colors"
                            >
                                <social.icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                    <a 
                        href="https://Vickyiitp.tech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-600 hover:text-slate-400 mt-4 font-semibold tracking-wider transition-colors inline-block"
                    >
                        Devil Labs <span className="text-slate-500">by</span> vickyiitp
                    </a>
                </footer>
           </div>
        </div>
    </div>
  );
};
