import * as THREE from "../node_modules/three/build/three.module.js";

// CREATE CANVAS && RENDERER //
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGL1Renderer({ canvas });

// CREATE CAMERA AND SET POSITION //
const fov = 40;
const aspect = 1;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120;

// CREATE SCENE //
const scene = new THREE.Scene();

// CREATE LIGHT //
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 20);
scene.add(light); // add light to scene

renderer.setClearColor("white");

// CREATE CUBE //
const createCube = (x, y) => {
  const texture = new THREE.TextureLoader().load(
    "./Metal_Mesh_003_basecolor.jpg"
  );
  const material = new THREE.MeshPhongMaterial({ map: texture });
  const geometry = new THREE.BoxGeometry(8, 8, 8);
  const box = new THREE.Mesh(geometry, material);
  box.position.x = x;
  box.position.y = y;
  scene.add(box);
  modeles.push(box);
  return box;
};

//CREATE DECA //
const deca = (x, y) => {
  const material = new THREE.MeshPhongMaterial({ color: "red" });
  const radius = 5;
  const detail = 0;
  const geometry = new THREE.DodecahedronBufferGeometry(radius, detail);
  const deca = new THREE.Mesh(geometry, material);
  deca.position.x = x;
  deca.position.y = y;
  scene.add(deca);
  modeles.push(deca);
  return deca;
};

// RENDERING //
const renderScene = () => {

  requestAnimationFrame(renderScene);

  modeles.forEach((modele) => {
    modele.rotation.x += 0.01;
    modele.rotation.y += 0.01;
  });

  const vec = new THREE.Vector2( 0, 1 );
  const width = renderer.getSize(vec).x;
  const height = renderer.getSize(vec).y;
  const pixelRatio = window.devicePixelRatio;
  const needResize =
    canvas.clientHeight * pixelRatio !== height ||
    canvas.clientWidth * pixelRatio !== width;
  if (needResize) {
    renderer.setSize(
      canvas.clientWidth * pixelRatio,
      canvas.clientHeight * pixelRatio,
      false
    );
  }

  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
};

const modeles = [];
const cube = createCube(0, 0);
const decaH = deca(10, 20);

renderScene();
