//
// 応用プログラミング 課題10 (three0802.js) G084002020 拓殖太郎
// $Id$
//
"use strict"; // 厳格モード

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {w:0.6, h:0.1, d:0.6,
     nRow:7, nCol:11, gapX:0.1, gapY:0.2, gapZ:0.4};

  // シーン作成
  const scene = new THREE.Scene();

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  {
    camera.position.set(0,2,15);
    camera.lookAt(0,0,0);
  }
  // 第2のカメラ

  // レンダラの設定
  /*
  const renderer = new THREE.WebGLRenderer({alpha:true});
  {
    renderer.setClearColor(0x204060);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.zIndex = 0;
    renderer.domElement.style.top = 0;
  }
  */
  // 第2のレンダラ

  // Css3Dレンダラ
  const cssRenderer = new THREE.CSS3DRenderer();
  {
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.zIndex = 1;
    cssRenderer.domElement.style.top = 0;
  }

  // 光源の設定
  { // 環境ライト
    const light = new THREE.AmbientLight();
    light.intensity=0.4;
    scene.add(light);
  }
  { // ポイントライト
    const light = new THREE.PointLight();
    light.position.set(0, 2, 0);
    scene.add(light);
  }

  // 3D物体
  // スクリーン
  /*
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(8.0, 4.5),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      opacity: 0.0,
      side: THREE.DoubleSide
    })
  )
  screen.position.set(0,0,0);
  scene.add(screen);
  */
  // 椅子

  // 座席の生成

  // Markerの生成

  // CSS3D表示のための設定
  // div要素の生成
  const div = document.createElement( 'div' );
  div.style.width = "640px";
  div.style.height = "360px";
  div.style.backgroundColor = '#000';
  // iframe要素の生成
  const iframe = document.createElement("iframe");
  iframe.style.width = "640px";
  iframe.style.height = "360px";
  iframe.style.border = "0px";
  iframe.src = "https://www.youtube.com/embed/?version=3"
      +"&mute=1&autoplay=1&controls=0"
      +"&loop=1&playlist=-9pMuSNlN6A,w23RIKTYF28";
  div.appendChild( iframe );
  // CSSオブジェクトの生成
  const cssObject = new THREE.CSS3DObject(div);
  cssObject.scale.x *= 8/640;
  cssObject.scale.y *= 8/640;
  //cssObject.position.copy(screen.position);
  //cssObject.rotation.copy(screen.rotation);
  // CSSシーンの生成
  const cssScene = new THREE.Scene();
  cssScene.add(cssObject);

  // レンダラーの配置
  document.getElementById("CSS3D-output").appendChild(cssRenderer.domElement);
//  cssRenderer.domElement.appendChild(renderer.domElement);

  // シート選択のための設定

  // Windowサイズの変更処理
  window.addEventListener("resize", ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
//    renderer.setSize( window.innerWidth, window.innerHeight );
    cssRenderer.setSize( window.innerWidth, window.innerHeight );
  }, false );

  // 描画処理
  function update(time) {
//    renderer.render(scene, camera);
    cssRenderer.render(cssScene, camera);
    requestAnimationFrame(update);
  }

  // 描画開始
  requestAnimationFrame(update);
}

document.onload = init();
