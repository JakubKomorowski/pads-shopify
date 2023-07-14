import React, {useState, useEffect} from 'react';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const FrontPad = ({color, name}) => {
  const [model, setModel] = useState();
  const firstWord = name?.split(' ')[0];
  useEffect(() => {
    new GLTFLoader().load(
      `/assets/${firstWord ? firstWord : 'split'}/${
        color ? color : 'green'
      }.gltf`,
      setModel,
    );
  }, [color]);

  return (
    <mesh rotation={[0, -0.0, 0]} position={[-0.0, -0.1, 0.0]} receiveShadow>
      {model ? <primitive object={model.scene} /> : null}
    </mesh>
  );
};

export default FrontPad;
