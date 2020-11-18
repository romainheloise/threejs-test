import * as THREE from "../node_modules/three/build/three.module.js";

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGL1Renderer({ canvas });

const fov = 75;
const aspect = 1;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();

const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 20);
scene.add(light);
renderer.setClearColor("white");

const animate = () => {
  requestAnimationFrame(animate);

  cubes.forEach((cube, index) => {
    cube.rotation.x += 0.01 + index / 60;
    cube.rotation.y += 0.01 + index / 60;
  });

  const width = renderer.getSize().x;
  const height = renderer.getSize().y;
  const needResize =
    canvas.clientHeight !== height || canvas.clientWidth !== width;
  if (needResize) {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  }

  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
};

const addSquare = (x) => {
  const texture = new THREE.TextureLoader().load(
    "./Metal_Mesh_003_basecolor.jpg"
  );
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ map: texture });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
  torus.position.x = x;
  return torus;
};



const cubes = [];
for (let index = 0; index < 3; index++) {
  const random = Math.floor(Math.random() * 3);
  cubes.push(addSquare(random));
}
cubes.forEach((cube, index) => {
  cube.position.y = index - 2 + 1;
  cube.position.z = index;
});

animate();
addHeart();
