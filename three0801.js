//
// 応用プログラミング 課題10 (three0801.js) G084002020 拓殖太郎
// $Id$
//
"use strict"; // 厳格モード

function init() {
  // カメラ位置のパラメータ
  const controls = {
    x: 0,
    y: 0,
    z: 500
  };

  // シーン作成
  const scene = new THREE.Scene();

  // カメラ作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth / window.innerHeight, 1, 5000);
  cameraUpdate();

  // カメラ位置の更新
  function cameraUpdate() {
    camera.position.set(controls.x, controls.y, controls.z);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  // GUIコントローラの設定
  const gui = new dat.GUI();
  {
    gui.add(controls, "x", -1000, 1000, 50).onChange(cameraUpdate);
    gui.add(controls, "y", -1000, 1000, 50).onChange(cameraUpdate);
    gui.add(controls, "z", -1000, 1000, 50).onChange(cameraUpdate);
  }

  // レンダラ設定
  const cssRenderer = new THREE.CSS3DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("WebGL-output").appendChild(cssRenderer.domElement);

  // div要素を作る
  const div = document.createElement( 'div' );
  div.style.width = "640px";
  div.style.height = "360px";
  div.style.backgroundColor = '#000';
  // iframe要素を作る
  const iframe = document.createElement("iframe");
  iframe.style.width = "640px";
  iframe.style.height = "360px";
  iframe.style.border = "0px";
  iframe.src="https://feng.takushoku-u.ac.jp/course/cs/";
  div.appendChild( iframe );

  // CSS3Dオブジェクトを作って，シーンに追加
  const object = new THREE.CSS3DObject( div );
  object.position.set( 0, 0, 0 );
  scene.add(object);

  // Windowのサイズを変更したときの処理
  window.addEventListener("resize", ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    cssRenderer.setSize( window.innerWidth, window.innerHeight);
  }, false );

  // アニメーション
  function update() {

    cssRenderer.render(scene, camera);
    requestAnimationFrame(update);
  }
  update();
}

document.onload = init();
