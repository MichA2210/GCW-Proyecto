import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js' //Estas cambian, las buscas en cdn.jsdelivr.net
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js';
import {OBJLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/MTLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000 );
const clock = new THREE.Clock();
const loader = new FBXLoader();
const textureLoader=new THREE.TextureLoader();

//variables modelos
var DianaGrande;
var DianaGancho;
var DianaPalito;
var DianaCuerda;
var Target;

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(1, 1, 1));
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



//////  Carga de OBJs /////////
function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
    var mtlLoader = new MTLLoader();
    mtlLoader.setPath(path);

    // lambda - es parecida a una función anónima
    mtlLoader.load(mtlFile, (materialCargado) => {
        // Este bloque se ejecuta solo cuando termina de cargar el MTL
        var objLoader = new OBJLoader();
        objLoader.setPath(path);
        objLoader.setMaterials(materialCargado);

        objLoader.load(objFile, (objCargado) =>{
            // Este bloque se ejecuta solo cuando termina de cargar el OBJ
            // objCargado.rotation;
            // scene.add(objCargado)
            onLoadCallback(objCargado);
        });

    });
    
}

//(modelo independiente)
loadOBJWithMTL('modelos/DianaGrande/','dianaGrande.obj','dianaGrande.mtl', (objetoCargado) => {
    objetoCargado.position.x = 0;
    objetoCargado.position.y = -30;
    objetoCargado.position.z = -100;
    objetoCargado.scale.multiplyScalar(0.5)
    objetoCargado.name='DianaGrande';
    DianaGrande=objetoCargado;
    scene.add(objetoCargado);

});

loadOBJWithMTL('modelos/DianaGancho/','dianaSolitaGancho.obj','dianaSolitaGancho.mtl', (objetoCargado) => {
    objetoCargado.position.x = -60;
    objetoCargado.position.y = 30;
    objetoCargado.position.z = -100;
    objetoCargado.name='DianaGancho';
    DianaGancho=objetoCargado;
    scene.add(objetoCargado);

});

loadOBJWithMTL('modelos/DianaPalito/','dianaSobrePalito.obj','dianaSobrePalito.mtl', (objetoCargado) => {
    objetoCargado.position.x = 10;
    objetoCargado.position.y = -5;
    objetoCargado.position.z = -20;
    objetoCargado.scale.multiplyScalar(0.09)
    objetoCargado.name='DianaPalito';
    DianaPalito=objetoCargado;
    scene.add(objetoCargado);

});

loadOBJWithMTL('modelos/DianaCuerda/','dianaSolitaCuerdita.obj','dianaSolitaCuerdita.mtl', (objetoCargado) => {
    objetoCargado.position.x = 0;
    objetoCargado.position.y = 30;
    objetoCargado.position.z = -100;
    objetoCargado.name='DianaCuerda';
    DianaCuerda=objetoCargado;
    scene.add(objetoCargado);

});

//////  Carga de FBXs ///////// (copias todo)
loader.load('modelos/character.fbx', (model)=>{                                  //con Alt + Shift agarras varias columnas
    model.scale.multiplyScalar(0.1);
    //model.scale.set(0.1,0.1,0.1);
    //model.scale.x = 0.5;
    //model.scale.y = 0.5;
    //model.scale.z = 0.5;
    //model.rotation.y=THREE.Math.degToRad(-180); 
    Target=model;
    model.name='Target';
    model.position.set(-20,-7,-50);
    //scene.add(model);
});


function onStartSkybox() {
    const ctLoader = new THREE.CubeTextureLoader();
    ctLoader.setPath( 'textures/sky/' );

    ctLoader.load( [
        'px.jpg', 'nx.jpg',
        'py.jpg', 'ny.jpg',
        'pz.jpg', 'nz.jpg'
    ], (cubeTexture) => {
        scene.background = cubeTexture;
    });
}

function onStartFloor(){
    const textureLoader = new THREE.TextureLoader();
    const textureRepeat = 10;
    textureLoader.load('textures/sand/albedo.jpg', (albedo)=> {
        albedo.wrapS = THREE.RepeatWrapping;
        albedo.wrapT = THREE.RepeatWrapping;
        albedo.repeat.multiplyScalar(textureRepeat);
        textureLoader.load('textures/sand/normal.jpg', (normal) => {
            normal.wrapS = THREE.RepeatWrapping;
            normal.wrapT = THREE.RepeatWrapping;
            normal.repeat.multiplyScalar(textureRepeat);
            const geometry = new THREE.PlaneGeometry( 1, 1 );
            const material = new THREE.MeshStandardMaterial( {
                map: albedo,
                normalMap: normal
            } );
            const plane = new THREE.Mesh( geometry, material );
            plane.scale.multiplyScalar(1000);
            plane.position.set(0,-25,-500);
            plane.rotation.x = THREE.Math.degToRad(-89);
            scene.add( plane );
        })
    });
    
}

function onStart(){
    //////  Luz Global /////////
    const light = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
    scene.add( light );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    onStartSkybox();
    onStartFloor();
    //camera.position.set(0,0,0);
    //camera.position.z = 0;
}

let facing = 'Front';
let rotationTimer = 3; //THREE.Math.randFloat (3, 5);
let frotnTimer = 3;
function rotateTarget(dt){
    
    if(facing == 'Front'){
        if(rotationTimer <= 0){
            // Rotar a Side
            facing = 'Side';
            frotnTimer = 3;
            DianaGrande.rotation.x = THREE.Math.degToRad(90);
            DianaPalito.rotation.x = THREE.Math.degToRad(-90);
            DianaCuerda.rotation.y = THREE.Math.degToRad(90);
            DianaGancho.rotation.y = THREE.Math.degToRad(-90);
        }
        else{
            rotationTimer -= dt;
        }
    }
    else{
        if (frotnTimer <= 0){
            // Rotar a Front
            rotationTimer = 3; //THREE.Math.randFloat (3, 5);
            facing = 'Front';
            DianaGrande.rotation.x = THREE.Math.degToRad(0);
            DianaPalito.rotation.x = THREE.Math.degToRad(0);
            DianaCuerda.rotation.y = THREE.Math.degToRad(0);
            DianaGancho.rotation.y = THREE.Math.degToRad(0);
        }
        else{
            frotnTimer -= dt;
        }
    }
    console.log(facing);
}


function onUpdate(dt) {
    //Función para el futuro
    rotateTarget(dt);
}

function render() {
    requestAnimationFrame(render);

    const dt = clock.getDelta();

    onUpdate(dt);

    renderer.render(scene, camera);
}

onStart();
render();

$(document).ready(function(){
    
});