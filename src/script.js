import * as THREE from "three";
import GUI from "lil-gui";
import {
  OrbitControls,
  RectAreaLightHelper,
} from "three/examples/jsm/Addons.js";

const gui = new GUI();
const canvas = document.querySelector(".webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height);
camera.position.x = -1.2;
camera.position.y = 1.8;
camera.position.z = 3;

scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// DIRECTIONAL LIGHT - START
const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1,
  0x0000ff
);
scene.add(directionalLightHelper);

directionalLight.position.x = 0;
directionalLight.position.y = 2;
directionalLight.position.z = 2;

directionalLight.rotation.x = 1;
directionalLight.rotation.y = 0;
directionalLight.rotation.z = 0;

const directionalLightFolder = gui.addFolder("DirectionLight");
directionalLightHelper.visible = false;

directionalLightFolder.add(directionalLight.position, "x");
directionalLightFolder.add(directionalLight.position, "y");
directionalLightFolder.add(directionalLight.position, "z");

directionalLightFolder.add(directionalLight.rotation, "x").name("Rotation x");
directionalLightFolder.add(directionalLight.rotation, "y").name("Rotation y");
directionalLightFolder.add(directionalLight.rotation, "z").name("Rotation z");

directionalLightFolder.add(directionalLight, "intensity");
directionalLightFolder.add(directionalLightHelper, "visible").name("Helper");
directionalLightFolder.add(directionalLight, "visible").name("Light");

// DIRECTIONAL LIGHT - START

// HEMISHPHERE LIGHT - START
const hemisphereLight = new THREE.HemisphereLight(0x8dd8ff, 0x71c0bb, 1);
// scene.add(hemisphereLight);
// HEMISHPHERE LIGHT - END

// POINT LIGHT - START
const pointLight = new THREE.PointLight(0x71c0bb);
scene.add(pointLight, 2);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2, 0xff0000);
scene.add(pointLightHelper);

pointLight.position.x = 0;
pointLight.position.y = 0.9;
pointLight.position.z = 1;

pointLightHelper.visible = false;

const pointLightFolder = gui.addFolder("PointLight");
pointLightFolder.add(pointLight.position, "x").step(0.1);
pointLightFolder.add(pointLight.position, "y").step(0.1);
pointLightFolder.add(pointLight.position, "z").step(0.1);
pointLightFolder.add(pointLight, "distance").step(0.1);
pointLightFolder.add(pointLight, "intensity").step(0.1);
pointLightFolder.add(pointLight, "decay").step(0.1);
pointLightFolder.add(pointLightHelper, "visible").name("Helper");
pointLightFolder.add(pointLight, "visible").name("Light");

// POINT LIGHT - START

// RECTAREALIGHT - START
const rectareaLight = new THREE.RectAreaLight(0x0000ff, 2, 1.5, 1.5);
scene.add(rectareaLight);

const rectareaLigthHelper = new RectAreaLightHelper(rectareaLight);
scene.add(rectareaLigthHelper);

rectareaLight.position.y = 0.8;
rectareaLight.position.z = -1.7;
rectareaLight.rotation.y = 3.2;

const rectareaLightFolder = gui.addFolder("RectareaLight");

rectareaLigthHelper.visible = false;

rectareaLightFolder.add(rectareaLight.position, "x").step(0.1);
rectareaLightFolder.add(rectareaLight.position, "y").step(0.1);
rectareaLightFolder.add(rectareaLight.position, "z").step(0.1);
rectareaLightFolder
  .add(rectareaLight.rotation, "x")
  .step(0.1)
  .name("Rotation x");
rectareaLightFolder
  .add(rectareaLight.rotation, "y")
  .step(0.1)
  .name("Rotation y");
rectareaLightFolder
  .add(rectareaLight.rotation, "z")
  .step(0.1)
  .name("Rotation z");
rectareaLightFolder.add(rectareaLight, "intensity").step(0.1);
rectareaLightFolder.add(rectareaLigthHelper, "visible").name("Helper");
rectareaLightFolder.add(rectareaLight, "visible").name("Light");

// RECTAREALIGHT - END

// SPOTLIGHT - START
const spotLight = new THREE.SpotLight(0xffa500, 1);
scene.add(spotLight);

spotLight.position.y = 3;
spotLight.distance = 3.5;
spotLight.decay = -1.5;
spotLight.angle = 0.43;
spotLight.intensity = 2;

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
scene.add(spotLight.target);

const spotLightFolder = gui.addFolder("SpotLight");
spotLightFolder.close();

spotLightHelper.visible = false;

spotLightFolder.add(spotLight.position, "x").name("Light Pos X");
spotLightFolder.add(spotLight.position, "y").name("Light Pos Y"); // Y-axis control
spotLightFolder.add(spotLight.position, "z").name("Light Pos Z");

spotLightFolder.add(spotLight.target.position, "x").step(0.1);
spotLightFolder.add(spotLight.target.position, "y").step(0.1);
spotLightFolder.add(spotLight.target.position, "z").step(0.1);

spotLightFolder.add(spotLight, "intensity");
spotLightFolder.add(spotLight, "distance").step(0.5);
spotLightFolder.add(spotLight, "penumbra").step(0.1);
spotLightFolder.add(spotLight, "decay").step(0.1);
spotLightFolder
  .add(spotLight, "angle", 0, Math.PI / 2)
  .step(0.01)
  .name("Angle");

spotLightFolder.add(spotLightHelper, "visible").name("Helper");
spotLightFolder.add(spotLight, "visible").name("Light");

// SPOTLIGHT - END

directionalLightFolder.close();
pointLightFolder.close();
rectareaLightFolder.close();

const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
material.side = THREE.DoubleSide;

// Plane - START
const planeGeometry = new THREE.PlaneGeometry(4, 4);
const plane = new THREE.Mesh(planeGeometry, material);

plane.rotation.x = -1.55;
plane.rotation.y = 0;
plane.rotation.z = -0.66;

gui.add(plane.rotation, "x").step(0.01);
gui.add(plane.rotation, "y").step(0.01);
gui.add(plane.rotation, "z").step(0.01);

scene.add(plane);
// Plane - END

// BOX - START
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const box = new THREE.Mesh(boxGeometry, material);

box.position.y = 0.6;
scene.add(box);
// BOX - END

// SPHERE - START
const sphereGeometry = new THREE.SphereGeometry(0.5);
const sphere = new THREE.Mesh(sphereGeometry, material);

sphere.position.x = -1.5;
sphere.position.y = 0.6;
scene.add(sphere);
// SPHERE - END

// torus - START
const torusGeometry = new THREE.TorusGeometry(0.4, 0.25);
const torus = new THREE.Mesh(torusGeometry, material);

torus.position.x = 1.5;
torus.position.y = 0.7;
scene.add(torus);
// SPHERE - END

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
  spotLightHelper.update();
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}

animate();
