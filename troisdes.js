import * as THREE from "../node_modules/three/build/three.module.js";

// CREATE CANVAS && RENDERER //
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGL1Renderer({
  canvas,
  antialias: true,
});

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
const createCube = (x, y, z) => {
  const texture = new THREE.TextureLoader().load(
    "./Metal_Mesh_003_basecolor.jpg"
  );
  const material = new THREE.MeshPhongMaterial({ color: "blue" });
  const geometry = new THREE.BoxGeometry(8, 8, 8);
  const box = new THREE.Mesh(geometry, material);
  box.position.x = x;
  box.position.y = y;
  box.position.z = z;
  scene.add(box);
  modeles.push(box);
  return box;
};

//CREATE DECA //
const deca = (x, y, z) => {
  const material = new THREE.MeshToonMaterial({ color: "orange" });
  const radius = 5;
  const detail = 0;
  const geometry = new THREE.DodecahedronBufferGeometry(radius, detail);
  const deca = new THREE.Mesh(geometry, material);
  deca.position.x = x;
  deca.position.y = y;
  deca.position.z = z;
  scene.add(deca);
  modeles.push(deca);
  return deca;
};

// CREATE TEXT //

const textRota = (x, y, z) => {
  const loader = new THREE.FontLoader();
  loader.load("./Pacifico_Regular.json", (font) => {
    const text = "Romain Heloise";
    const geometry = new THREE.TextBufferGeometry(text, {
      font: font,
      size: 5,
      height: 5,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 0.3,
      bevelSegments: 5,
    });
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation(x, y, z) );
    const material = new THREE.MeshToonMaterial({ color: "red" });
    const textRen = new THREE.Mesh(geometry, material);
    textRen.position.x = x;
    textRen.position.y = y;
    textRen.position.z = z;
    textRen.rotation.x += 0.2;
    blaze.push(textRen);
    scene.add(textRen);
  });
};

// RENDERING //
const renderScene = () => {
  requestAnimationFrame(renderScene);

  modeles.forEach((modele) => {
    modele.rotation.x += 0.01;
    modele.rotation.y += 0.01;
  });

  blaze.forEach((x) => {
    x.rotation.y = (mouseCoord[0] - window.innerWidth / 2 ) / (window.innerWidth*4);
    x.rotation.x = (mouseCoord[1] - window.innerHeight/ 2 ) / (window.innerHeight*4);
  });

  const vec = new THREE.Vector2(0, 1);
  const width = renderer.getSize(vec).x;
  const height = renderer.getSize(vec).y;
  const pixelRatio = window.devicePixelRatio;
  const needResize =
    canvas.clientHeight * pixelRatio !== height ||
    canvas.clientWidth * pixelRatio !== width;
  if (needResize) {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  }

  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
};

const modeles = [];
const blaze = [];
textRota(-15, 10, 3);
const cube = createCube(-10, 8,-15);
const decaH = deca(20, 20, 25);
const mouseCoord = [0, 0];

window.addEventListener("mousemove", (e) => {
  mouseCoord[0] = e.clientX;
  mouseCoord[1] = e.clientY;
});

renderScene();
