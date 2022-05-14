import '/src/css/main.css'
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const objLoader = new OBJLoader();
objLoader.setPath('/assets/')

//Scrollbar at the top before page loads
window.onbeforeunload = function () {
   window.scrollTo(0, 0);
}

// Size Vars
const sizes = {
   width: window.innerWidth,
   height: window.innerHeight
}
// Scene
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 1000);

//Set initial position
camera.position.x = 0;
camera.position.y = 9;
camera.position.z = 30;
camera.rotation.x -= 0.5;

// camera helper
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

//Objects
const geo_torus = new THREE.TorusGeometry(.3, .0025, 18, 40);
const geo_sphere = new THREE.SphereGeometry(50, 20, 20);

//Materials
const mat_torus = new THREE.MeshBasicMaterial({ color: 0xdbdbdb });

const mat_plane = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, reflectivity: 1.0, vertexColors: true, shininess: 10, flatShading: true });

const mat_outersphere = new THREE.MeshBasicMaterial({
   color: 0xffffff,
   wireframe: true
});

const mat_sphere = new THREE.MeshBasicMaterial({ color: 0xfafcf2 });

const mat_tree = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x080808, reflectivity: 1.0, vertexColors: true, shininess: 10, metalness: .0, roughness: .5 });

const mat_rocks = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x080808, reflectivity: 1.0, vertexColors: true, shininess: 10, metalness: .0, roughness: .5 });

const mat_column = new THREE.MeshPhysicalMaterial({ color: 0x000, side: THREE.DoubleSide, emissive: 0x000, shininess: 30, flatShading: true, metalness: .0, roughness: .5 });

const mat_wire = new THREE.MeshBasicMaterial({
   color: 0x000,
   wireframe: true
});
const mat_statue = new THREE.MeshPhongMaterial({ color: 0xffffff, reflectivity: 1.0, vertexColors: false, shininess: 100, flatShading: false });

/**
 * Mesh Objects
 */
//Mercury
objLoader.load('/mercury_lowpoly.obj',
   function (statue) {
      statue.traverse(function (child) {
         if (child instanceof THREE.Mesh) {
            child.material = mat_statue;
         }
      });
      statue.rotation.x = 0.03;
      statue.rotation.z = -0.02;
      statue.rotation.y = 10;
      statue.position.x = -.75;
      statue.position.y = 5.75;
      statue.position.z = 27;
      scene.add(statue);
   }
);

//Spinner 1
const octo = new THREE.Mesh(
   new THREE.OctahedronGeometry(.25, 0),
   new THREE.MeshPhysicalMaterial({
      color: 0xffffff, emissive: 0x00efa3, shininess: 10, flatShading: false, metalness: .28, roughness: .2
   }));
const torus = new THREE.Mesh(geo_torus, mat_torus);
const torus2 = new THREE.Mesh(geo_torus, mat_torus);
torus2.rotation.x = 180;

const spinner = new THREE.Group();
spinner.add(octo);
spinner.add(torus);
spinner.add(torus2);
scene.add(spinner);

spinner.position.x = -2;
spinner.position.y = 8;
spinner.position.z = 28.5;

//Spinner 2
const octo2 = new THREE.Mesh(
   new THREE.OctahedronGeometry(.25, 0),
   new THREE.MeshPhysicalMaterial({
      color: 0xffffff, emissive: 0x00efa3, shininess: 10, flatShading: false, metalness: .28, roughness: .2
   }));
const torus3 = new THREE.Mesh(geo_torus, mat_torus);
const torus4 = new THREE.Mesh(geo_torus, mat_torus);
torus2.rotation.x = 180;

const spinner2 = new THREE.Group();
spinner2.add(octo2);
spinner2.add(torus3);
spinner2.add(torus4);
scene.add(spinner2);

spinner2.position.x = -20.7;
spinner2.position.y = 14;
spinner2.position.z = 5;

//Camera Positions
const cam_pos = new THREE.Mesh(
   new THREE.BoxGeometry(.1, .1, .1),
   new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
cam_pos.position.x = camera.position.x;
cam_pos.position.y = camera.position.y;
cam_pos.position.z = camera.position.z;
cam_pos.visible = false;
scene.add(cam_pos);

const cam_pos2 = new THREE.Mesh(
   new THREE.BoxGeometry(.1, .1, .1),
   new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
cam_pos2.position.x = -1.4;
cam_pos2.position.y = 10;
cam_pos2.position.z = 50;
cam_pos2.visible = false;
scene.add(cam_pos2);

const cam_pos3 = new THREE.Mesh(
   new THREE.BoxGeometry(.1, .1, .1),
   new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
cam_pos3.position.x = -20;
cam_pos3.position.y = 15;
cam_pos3.position.z = 10;
cam_pos3.visible = false;
scene.add(cam_pos3);

const cam_pos4 = new THREE.Mesh(
   new THREE.BoxGeometry(.1, .1, .1),
   new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
cam_pos4.position.x = 0;
cam_pos4.position.y = 80;
cam_pos4.position.z = 200;
cam_pos4.visible = false;
scene.add(cam_pos4);

const cam_pos5 = new THREE.Mesh(
   new THREE.BoxGeometry(.1, .1, .1),
   new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
cam_pos5.position.x = 0;
cam_pos5.position.y = 7.6;
cam_pos5.position.z = -39;
cam_pos5.visible = false;
scene.add(cam_pos5);
/**
 * Lighting/Helpers
 */
const pointLight = new THREE.PointLight(0xfafcf2, 8);
const statueLight = new THREE.SpotLight(0x63e590, 4.7, 1.5, 1, 8);
const statue2Light = new THREE.PointLight(0x63e590, 1, 10.5);
const dirLight = new THREE.DirectionalLight(0xffffff, .4);
pointLight.position.set(0, 13, -44);
statueLight.position.set(-1.6, 8.5, 29);
statue2Light.position.set(-20.7, 14, 5);
dirLight.position.y = 7;
dirLight.rotation.y = 10;
scene.add(pointLight, dirLight, statueLight, statue2Light);

// const lightHelper = new THREE.PointLightHelper(statue2Light);
// scene.add(lightHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

/**
 * Background
 */
// const spaceTexture = new THREE.TextureLoader().load('img/spacebg.jpg');
// scene.background = spaceTexture;

/**
 * Event Listeners
 */
window.addEventListener("scroll", function (e) {
   const t = document.body.getBoundingClientRect().top;

   if (this.oldScroll > this.scrollY) { //Scrolling up
      camera.position.z -= t * -0.001;
   }
   else if (this.oldScroll < this.scrollY) { //Scrolling down
      camera.position.z += t * -0.001;
   }

   //Move Objects based on current Scene
   if (currentScene == 0) {
      if (this.oldScroll > this.scrollY) { //Scrolling up
         torus.rotation.x += 0.07;
         torus.rotation.y += 0.07;
         torus.rotation.z += 0.07;
         torus2.rotation.x -= 0.07;
         torus2.rotation.y -= 0.07;
         torus2.rotation.z -= 0.07;
      }
      else if (this.oldScroll < this.scrollY) { //Scrolling down
         torus.rotation.x -= 0.07;
         torus.rotation.y -= 0.07;
         torus.rotation.z -= 0.07;
         torus2.rotation.x += 0.07;
         torus2.rotation.y += 0.07;
         torus2.rotation.z += 0.07;
      }
   }
   if (currentScene == 2) {
      if (this.oldScroll > this.scrollY) { //Scrolling up
         torus3.rotation.x += 0.07;
         torus3.rotation.y += 0.07;
         torus3.rotation.z += 0.07;
         torus4.rotation.x -= 0.07;
         torus4.rotation.y -= 0.07;
         torus4.rotation.z -= 0.07;
      }
      else if (this.oldScroll < this.scrollY) { //Scrolling down
         torus3.rotation.x -= 0.07;
         torus3.rotation.y -= 0.07;
         torus3.rotation.z -= 0.07;
         torus4.rotation.x += 0.07;
         torus4.rotation.y += 0.07;
         torus4.rotation.z += 0.07;
      }
   }

   this.oldScroll = this.scrollY;
}, false);

window.addEventListener('resize', () => {
   // Update sizes
   sizes.width = window.innerWidth
   sizes.height = window.innerHeight

   // Update camera
   camera.aspect = sizes.width / sizes.height
   camera.updateProjectionMatrix()

   // Update renderer
   renderer.setSize(sizes.width, sizes.height)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

const canvas_bg = document.getElementById("bg");
canvas_bg.addEventListener('mouseover', () => {
   // hovering_icons = false;
   social_icons.classList.add("d-none");
   home_btn.classList.remove("home-bg-hover");
})
/**
 * Functions
 */
function navigatePages(pageIndex) {
   checkScrollHeight();

   // if (galleryOpen) {
   //    closeModal();
   // }
}

function checkScrollHeight() {
   window.scrollTo(0, 0);
   const t = document.body.getBoundingClientRect().top;
   if (t != 0) {
      window.scrollTo(0, 0);
   }
}

function addStar() {
   const geometry = new THREE.SphereGeometry(0.25, 10, 10);
   const material = new THREE.MeshBasicMaterial({ color: 0xc0f5cb });
   const star = new THREE.Mesh(geometry, material);

   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

   star.position.set(x, y, z);
   scene.add(star);
}

/**
 * Update Loop
 */
const clock = new THREE.Clock();
var camPos = new THREE.Vector3(0, 9, 30);
var scene0_pos = new THREE.Vector3(0, 0, 0);
scene0_pos = cam_pos.position;
var scene1_pos = new THREE.Vector3(0, 0, 0);
scene1_pos = cam_pos2.position;
var scene2_pos = new THREE.Vector3(0, 0, 0);
scene2_pos = cam_pos3.position;
var scene3_pos = new THREE.Vector3(0, 0, 0);
scene3_pos = cam_pos4.position;
var scene4_pos = new THREE.Vector3(0, 0, 0);
scene4_pos = cam_pos5.position;

var currentScene = 0;
const tick = () => {
   const elapsedTime = clock.getElapsedTime();

   // Update Orbital Controls
   // controls.update()

   // Interpolate camPos toward targetPos
   if (currentScene == 0) {
      camPos.lerp(scene0_pos, 0.025);
   }
   if (currentScene == 1) {
      camPos.lerp(scene1_pos, 0.025);
   }
   if (currentScene == 2) {
      camPos.lerp(scene2_pos, 0.025);
   }
   if (currentScene == 3) {
      camPos.lerp(scene3_pos, 0.05);
   }
   if (currentScene == 4) {
      camPos.lerp(scene4_pos, 0.05);
   }
   // Apply new camPos to your camera
   camera.position.copy(camPos);

   // Update objects
   torus.rotation.x += 0.007;
   torus.rotation.y += 0.007;
   torus.rotation.z += 0.007;
   torus2.rotation.x -= 0.007;
   torus2.rotation.y -= 0.007;
   torus2.rotation.z -= 0.007;
   torus3.rotation.x += 0.007;
   torus3.rotation.y += 0.007;
   torus3.rotation.z += 0.007;
   torus4.rotation.x -= 0.007;
   torus4.rotation.y -= 0.007;
   torus4.rotation.z -= 0.007;
   octo.rotation.y += .01;

   // Render
   renderer.render(scene, camera);

   // Call tick again on the next frame
   window.requestAnimationFrame(tick);
}

checkScrollHeight();
navigatePages(0);
Array(600).fill().forEach(addStar);
// document.body.onscroll = moveCamera;
tick();