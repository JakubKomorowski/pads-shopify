import FrontPad from '~/components/FrontPad';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  ReactThreeFiber,
} from '@react-three/fiber';
import {useRef} from 'react';

extend({OrbitControls});
CameraControls.install({THREE});
extend({CameraControls});

const Control = () => {
  const orbitRef = useRef();
  const {camera, gl} = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      enableZoom={false}
      autoRotate={false}
      autoRotateSpeed={0.1}
      enableDamping={true}
      ref={orbitRef}
      enablePan={false}
    />
  );
};

const _index = () => {
  return (
    <section className=" flex justify-center items-center flex-grow container mx-auto h-[calc(100vh-65px)]">
      <div className="w-2/6 min-w-[500px]">
        <div className="text-5xl font-bold font-mukta mb-10 leading-tight">
          Build with comfort and <br /> customizability in mind
        </div>
        <button className="bg-main px-14 py-4 rounded-full text-2xl font-bold text-white transition-all duration-200 hover:bg-dark">
          Shop now
        </button>
      </div>

      <div className=" w-4/6 h-full cursor-grab	">
        <Canvas
          orthographic
          camera={{
            position: [0, 0, 0.25],
            left: -2,
            right: 2,
            top: 2,
            bottom: -2,
            zoom: 2500,
          }}
        >
          <ambientLight intensity={0.8} />
          <spotLight
            position={[-5, 0, 5]}
            intensity={1}
            castShadow
            angle={Math.PI}
          />
          <spotLight position={[5, 0, 0]} penumbra={1} castShadow />

          <Control />
          <FrontPad />
        </Canvas>
      </div>
    </section>
  );
};

export default _index;
