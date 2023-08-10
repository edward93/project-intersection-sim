import * as THREE from "three";
import { useEffect, useRef } from "react";
import styles from "./styles/app.module.scss";

const App = () => {
  //#region framework related
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // main renderer
  const renderer = useRef<THREE.WebGLRenderer>();
  // main camera
  const cameraRef = useRef<THREE.Camera>(new THREE.Camera());

  // set up renderer
  useEffect(() => {
    // init renderer
    if (canvasRef.current) {
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      renderer.current = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef?.current ?? undefined });
      renderer.current.setSize(width, height);

      cameraRef.current = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
      cameraRef.current.position.z = 1;
      // cameraRef.current.position.y = 50;
      // cameraRef.current = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -10, 1000);
      // cameraRef.current = new THREE.OrthographicCamera(-10, 10, 7.5, -7.5, -10, 10);
      // cameraRef.current.left = width / -2;
      // cameraRef.current.right = width / 2;
      // cameraRef.current.top = height / 2;
      // cameraRef.current.bottom = height / -2;
      // cameraRef.current.near = 1;
      // cameraRef.current.far = 1000;

      renderer.current.setAnimationLoop(animation);
    }
  }, []);
  //#endregion

  /**
   * Main animation loop
   * @param time - frame time
   */
  const animation = (time: number) => {
    // rotate the mesh
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer?.current?.render(scene, cameraRef.current);
  };

  const scene = new THREE.Scene();

  // small object
  const geometry = new THREE.BoxGeometry(.2, .2, .2);
  const material = new THREE.MeshNormalMaterial();

  // plane helper
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 3);
  const helper = new THREE.PlaneHelper(plane, 2, 0xffff00);
  helper.position.x = 0;
  helper.position.y = 0;
  helper.position.z = 0;
  scene.add(helper);

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return (
    <div className={styles.appContainer}>
      <div className={styles.screen}>
        <div className={styles.appHeader}>Header</div>
        <div className={styles.appMainArea}>
          <canvas ref={canvasRef} />
        </div>
      </div>

      <div className={styles.appFooter}>Footer</div>
    </div>
  );
};

export default App;
