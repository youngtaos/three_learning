import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6
camera.position.y = 2



const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 'red' });

//create cube
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 2, 0)
scene.add(cube);

//crate grid 
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//add track 
const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', function () {
    console.log("change")
})
// animate the cube
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update()
    renderer.render(scene, camera);
}
animate();