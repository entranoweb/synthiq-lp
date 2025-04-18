"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import useVapi from "@/components/vapi";

const Orb: React.FC = () => {
  const { volumeLevel, isSessionActive, toggleCall } = useVapi();
  const [showOrb, setShowOrb] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    contact: "",
    company: "",
  });

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const ballRef = useRef<THREE.Mesh | null>(null);
  const originalPositionsRef = useRef<any | null>(null);
  const noise = createNoise3D();

  const render = useCallback(() => {
    if (
      !groupRef.current ||
      !ballRef.current ||
      !cameraRef.current ||
      !rendererRef.current ||
      !sceneRef.current
    ) {
      return;
    }

    groupRef.current.rotation.y += 0.005;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    requestAnimationFrame(render);
  }, []);

  const onWindowResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);

    const outElement = document.getElementById("out");
    if (outElement && rendererRef.current) {
      rendererRef.current.setSize(
        outElement.clientWidth,
        outElement.clientHeight
      );
    }
  }, []);

  const updateBallMorph = useCallback((ball: THREE.Mesh, volume: number) => {
    if (!ball.geometry.attributes.position) return;

    const positionAttribute = ball.geometry.attributes.position;
    const geometry = ball.geometry;
    const positions = positionAttribute.array;
    const originalPositions = originalPositionsRef.current;

    if (!originalPositions) return;

    const time = Date.now() * 0.0005;
    const intensity = volume * 2;

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      const z = originalPositions[i + 2];

      const xOffset = x * 0.1;
      const yOffset = y * 0.1;
      const zOffset = z * 0.1;

      const noiseValue =
        noise(xOffset + time, yOffset + time, zOffset + time) * intensity;

      positions[i] = x + x * noiseValue;
      positions[i + 1] = y + y * noiseValue;
      positions[i + 2] = z + z * noiseValue;
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  }, [noise]);

  const resetBallMorph = useCallback((ball: THREE.Mesh, originalPositions: any) => {
    if (!ball.geometry.attributes.position || !originalPositions) return;

    const positionAttribute = ball.geometry.attributes.position;
    const positions = positionAttribute.array;

    for (let i = 0; i < positions.length; i++) {
      positions[i] = originalPositions[i];
    }

    positionAttribute.needsUpdate = true;
    ball.geometry.computeVertexNormals();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setShowOrb(true);
    },
    []
  );

  const initViz = useCallback(() => {
    const scene = new THREE.Scene();
    const group = new THREE.Group();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.5,
      100
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);

    scene.add(camera);
    sceneRef.current = scene;
    groupRef.current = group;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const icosahedronGeometry = new THREE.IcosahedronGeometry(10, 8);
    const lambertMaterial = new THREE.MeshLambertMaterial({
      color: 0x1662d4,
      wireframe: true,
    });

    const ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    ball.position.set(0, 0, 0);
    ballRef.current = ball;

    originalPositionsRef.current =
      ball.geometry.attributes.position.array.slice();

    group.add(ball);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    spotLight.lookAt(ball.position);
    spotLight.castShadow = true;
    scene.add(spotLight);

    scene.add(group);

    const outElement = document.getElementById("out");
    if (outElement) {
      outElement.innerHTML = "";
      outElement.appendChild(renderer.domElement);
      renderer.setSize(outElement.clientWidth, outElement.clientHeight);
    }

    render();
  }, [render]);

  useEffect(() => {
    if (showOrb) {
      initViz();
      window.addEventListener("resize", onWindowResize);
    }
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [showOrb, initViz, onWindowResize]);

  useEffect(() => {
    if (
      isSessionActive &&
      ballRef.current &&
      originalPositionsRef.current &&
      volumeLevel > 0
    ) {
      updateBallMorph(ballRef.current, volumeLevel);
    } else if (
      !isSessionActive &&
      ballRef.current &&
      originalPositionsRef.current
    ) {
      resetBallMorph(ballRef.current, originalPositionsRef.current);
    }
  }, [volumeLevel, isSessionActive, updateBallMorph, resetBallMorph]);

  return (
    <div className="relative w-full h-full">
      {!showOrb ? (
        <div className="flex flex-col items-center justify-center h-full">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Start Your Journey
            </h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={userInfo.contact}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="company"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={userInfo.company}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full h-full">
          <div id="out" className="w-full h-full"></div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <button
              onClick={toggleCall}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                isSessionActive
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {isSessionActive ? "End Call" : "Start Call"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orb;
