import { useEffect, useRef } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

function App() {
  const ref = useRef(null);
  const gui = new GUI();

  const eventObj = {
    FullScreen: function () {
      document.body.requestFullscreen();
    },
    ExitFullSCreen: function () {
      document.exitFullscreen();
    },
  };
  gui.add(eventObj, "FullScreen").name("全屏");
  gui.add(eventObj, "ExitFullSCreen").name("退出全屏");
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1, //近平面
      1000 //远平面
    );
    const renderer = new THREE.WebGLRenderer();
    camera.position.z = 6;
    camera.position.y = 2;

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const Pmaterial = new THREE.MeshBasicMaterial({ color: "blue" });
    //create cube
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(3, 2, 2);
    //cteate parent cube
    const parentCube = new THREE.Mesh(geometry, Pmaterial);
    parentCube.add(cube);
    scene.add(parentCube);

    //crate grid
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //add track
    const controls = new OrbitControls(camera, renderer.domElement);

    //带阻尼
    controls.enableDamping = true;

    //设置阻尼系数
    controls.dampingFactor = 0.01;

    //添加世界坐标辅助器
    const axeHelper = new THREE.AxesHelper(5);
    scene.add(axeHelper);

    // animate the cube
    function animate() {
      requestAnimationFrame(animate);
      parentCube.rotation.x += 0.01;
      cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  // document.addEventListener("resize", () => {
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   //重置相机宽高比
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   //更新相机投影矩阵
  //   camera.updateProjectionMatrix();
  // });
  return <div ref={ref}></div>;
}

export default App;
