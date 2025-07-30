// File: src/components/Intro3D.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

function Intro3D({ onFinish }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add a spinning cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Animate text
    gsap.to('.intro-text', {
      opacity: 1,
      y: 0,
      duration: 1.5,
    });

    const clickHandler = () => {
      gsap.to('.intro-container', {
        opacity: 0,
        duration: 1,
        onComplete: onFinish,
      });
    };

    canvas.addEventListener('click', clickHandler);

    return () => {
      canvas.removeEventListener('click', clickHandler);
      renderer.dispose();
    };
  }, [onFinish]);

  return (
    <div className="intro-container fixed inset-0 z-50 bg-[#0f172a] flex flex-col items-center justify-center text-white">
      <canvas ref={canvasRef} className="absolute w-full h-full" />
      <div className="intro-text opacity-0 translate-y-12 transition-all text-center relative z-10">
        <h1 className="text-4xl font-bold">SecureQuery AI</h1>
        <p className="text-blue-300">Click anywhere to enter</p>
      </div>
    </div>
  );
}

export default Intro3D;
