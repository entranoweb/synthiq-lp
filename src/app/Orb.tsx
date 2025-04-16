"use client";
import React, { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (showOrb) {
      initViz();
      window.addEventListener("resize", onWindowResize);
      return () => {
        window.removeEventListener("resize", onWindowResize);
      };
    }
  }, [showOrb]);

  useEffect(() => {
    if (isSessionActive && ballRef.current) {
      updateBallMorph(ballRef.current, volumeLevel);
    } else if (
      !isSessionActive &&
      ballRef.current &&
      originalPositionsRef.current
    ) {
      resetBallMorph(ballRef.current, originalPositionsRef.current);
    }
  }, [volumeLevel, isSessionActive]);

  const initViz = () => {
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
  };

  const render = () => {
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
  };

  const onWindowResize = () => {
    if (!cameraRef.current || !rendererRef.current) return;

    const outElement = document.getElementById("out");
    if (outElement) {
      cameraRef.current.aspect =
        outElement.clientWidth / outElement.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(
        outElement.clientWidth,
        outElement.clientHeight
      );
    }
  };

  const updateBallMorph = (mesh: THREE.Mesh, volume: number) => {
    const geometry = mesh.geometry as THREE.BufferGeometry;
    const positionAttribute = geometry.getAttribute("position");

    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3(
        positionAttribute.getX(i),
        positionAttribute.getY(i),
        positionAttribute.getZ(i)
      );

      const offset = 10;
      const amp = 2.5;
      const time = window.performance.now();
      vertex.normalize();
      const rf = 0.00001;
      const distance =
        offset +
        volume * 4 +
        noise(
          vertex.x + time * rf * 7,
          vertex.y + time * rf * 8,
          vertex.z + time * rf * 9
        ) *
          amp *
          volume;
      vertex.multiplyScalar(distance);

      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  };

  const resetBallMorph = (
    mesh: THREE.Mesh,
    originalPositions: Float32Array
  ) => {
    const geometry = mesh.geometry as THREE.BufferGeometry;
    const positionAttribute = geometry.getAttribute("position");

    for (let i = 0; i < positionAttribute.count; i++) {
      positionAttribute.setXYZ(
        i,
        originalPositions[i * 3],
        originalPositions[i * 3 + 1],
        originalPositions[i * 3 + 2]
      );
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const webhookUrl = 'https://hook.eu1.make.com/1892mmu4vlryi85swaiu8y65owcgvwne';
    const payload = {
      name: userInfo.name,
      email: userInfo.email,
      contact: userInfo.contact,
      company: userInfo.company,
    };
  
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.text(); // Capture detailed error
        console.error('Webhook response error:', errorData);
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
  
      setShowOrb(true);
      console.log('Data sent successfully');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="orbs"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        padding: "0 10px",
      }}
    >
      {!showOrb ? (
        <div
          style={{
            textAlign: "center",
            color: "#fff",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "500",
              letterSpacing: "-0.025em",
              color: "#fff",
              textAlign: "center",
              transition: "color 0.3s ease",
              cursor: "pointer",
              marginBottom: "30px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ddd")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
          >
            Experience Our AI Voice Agent
          </h2>
          <form
            onSubmit={handleFormSubmit}
            style={{
              textAlign: "center",
              backgroundColor: "#000",
              padding: "20px 15px",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px rgba(22, 98, 212, 0.7)",
              transition: "box-shadow 0.3s ease",
              marginBottom: "30px",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "#ddd",
                marginBottom: "15px",
              }}
            >
              Enter Your Details
            </h2>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userInfo.name}
                onChange={handleInputChange}
                required
                style={{
                  padding: "10px", // Smaller padding
                  margin: "8px 0", // Adjusted spacing
                  width: "90%", // Full width for mobile
                  borderRadius: "5px",
                  backgroundColor: "#444",
                  border: "1px solid #555",
                  color: "#fff",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#555")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#444")
                }
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleInputChange}
                required
                style={{
                  padding: "12px",
                  margin: "10px",
                  width: "90%",
                  borderRadius: "5px",
                  backgroundColor: "#444",
                  border: "1px solid #555",
                  color: "#fff",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#555")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#444")
                }
              />
            </div>
            <div>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={userInfo.company}
                onChange={handleInputChange}
                required
                style={{
                  padding: "12px",
                  margin: "10px",
                  width: "90%",
                  borderRadius: "5px",
                  backgroundColor: "#444",
                  border: "1px solid #555",
                  color: "#fff",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#555")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#444")
                }
              />
            </div>
            <div>
              <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                value={userInfo.contact}
                onChange={handleInputChange}
                required
                style={{
                  padding: "12px",
                  margin: "10px",
                  width: "90%",
                  borderRadius: "5px",
                  backgroundColor: "#444",
                  border: "1px solid #555",
                  color: "#fff",
                  transition: "background-color 0.3s ease",
                  marginBottom: "30px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#555")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#444")
                }
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#1662D4",
                color: "#fff",
                cursor: "pointer",
                border: "none",
                fontSize: "1rem",
                width: "100%",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: 'center',
            textAlign: "center",
            width: "100%",
            // marginTop: '30px', // More space above the section
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "500",
              color: "#fff",
              letterSpacing: "-0.025em",
              marginTop: "100px",
              marginBottom: "5px", // Bring it closer to the orb
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ddd")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
          >
            Click the orb to start a conversation with the Voice Assistant
          </h2>
          <div
            id="out"
            className="hover:cursor-pointer"
            onClick={toggleCall}
            style={{
              height: "100%",
              width: "100%",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Orb;
