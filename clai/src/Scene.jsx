import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// import { OBJLoader } from 'three-stdlib';
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>
}

function Model({path, position}) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [obj, setObj] = useState(useLoader(OBJLoader, path));
  useFrame((state, delta) => (ref.current.rotation.x += delta));

  useEffect(() => {
    setObj(useLoader(OBJLoader, path));
  }, [path]);

  return (
    <primitive
      ref={ref}
      scale={clicked ? 2.5 : 1}
      onClick={(event) => click(!clicked)}
      object={obj}
      position={position}
    />
  );
}

function Scene({model}) {
  return (
    <div className="Scene">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={<Loader />}>
            <Model path={model} position={[0, 0, 0]} />
          </Suspense>
        </Canvas>
    </div>
  )
}

export default Scene