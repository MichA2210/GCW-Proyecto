import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js' //Estas cambian, las buscas en cdn.jsdelivr.net
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js';
import {OBJLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/MTLLoader.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000 );
const clock = new THREE.Clock();
const loader = new FBXLoader();
const textureLoader=new THREE.TextureLoader();

//material
const Material = new THREE.MeshPhongMaterial({ 
    color: "blue",         
    wireframe: true
});
const spheregeometry = new THREE.SphereGeometry(0.5, 16, 16);


//variables modelos
var DianaGrande = {
    modelo: null, 
    reload: 7, 
    facing: true, 
    collision: null, 
    collisionBB: null
};
var DianaGancho = {
    modelo: null, 
    reload: 5, 
    facing: true, 
    collision: null, 
    collisionBB: null
};
var DianaPalito = {
    modelo: null, 
    reload: 3, 
    facing: true, 
    collision: null, 
    collisionBB: null
};
var DianaCuerda = {
    modelo: null, 
    reload: 2, 
    facing: true, 
    collision: null, 
    collisionBB: null
};
var Player1 = {
    modelo:null, 
    balas: 10,
    bullet: null
};
var Player2 = {
    modelo:null, 
    balas: 10,
    bullet: null
};
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

loadOBJWithMTL('../modelos/DianaCuerda/','dianaSolitaCuerdita.obj','dianaSolitaCuerdita.mtl', (objetoCargado) => {
    objetoCargado.position.x = 0;
    objetoCargado.position.y = 90;
    objetoCargado.position.z = -100;
    objetoCargado.name='DianaCuerda';
    DianaCuerda['modelo']=objetoCargado;
    scene.add(objetoCargado);

    DianaCuerda['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaCuerda['collision'].position.x= 0;
    DianaCuerda['collision'].position.y= 90;
    DianaCuerda['collision'].position.z= -100;
    DianaCuerda['collision'].scale.x = 15;
    DianaCuerda['collision'].scale.y = 15;

    DianaCuerda['collisionBB'] = new THREE.Sphere(DianaCuerda['collision'].position, 7.5);


    scene.add(objetoCargado);
});
loadOBJWithMTL('../modelos/DianaCuerda/','dianaSolitaCuerdita.obj','dianaSolitaCuerdita.mtl', (objetoCargado) => {
    objetoCargado.position.x = 30;
    objetoCargado.position.y = 90;
    objetoCargado.position.z = -100;
    objetoCargado.name='DianaCuerda';
    DianaCuerda['modelo']=objetoCargado;
    scene.add(objetoCargado);

    DianaCuerda['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaCuerda['collision'].position.x= 30;
    DianaCuerda['collision'].position.y= 90;
    DianaCuerda['collision'].position.z= -100;
    DianaCuerda['collision'].scale.x = 15;
    DianaCuerda['collision'].scale.y = 15;

    DianaCuerda['collisionBB'] = new THREE.Sphere(DianaCuerda['collision'].position, 7.5);


    scene.add(objetoCargado);
});
loadOBJWithMTL('../modelos/DianaCuerda/','dianaSolitaCuerdita.obj','dianaSolitaCuerdita.mtl', (objetoCargado) => {
    objetoCargado.position.x = -30;
    objetoCargado.position.y = 90;
    objetoCargado.position.z = -100;
    objetoCargado.name='DianaCuerda';
    DianaCuerda['modelo']=objetoCargado;
    scene.add(objetoCargado);

    DianaCuerda['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaCuerda['collision'].position.x= -30;
    DianaCuerda['collision'].position.y= 90;
    DianaCuerda['collision'].position.z= -100;
    DianaCuerda['collision'].scale.x = 15;
    DianaCuerda['collision'].scale.y = 15;

    DianaCuerda['collisionBB'] = new THREE.Sphere(DianaCuerda['collision'].position, 7.5);


    scene.add(objetoCargado);
});
loadOBJWithMTL('../modelos/DianaCuerda/','dianaSolitaCuerdita.obj','dianaGold.mtl', (objetoCargado) => {
    objetoCargado.position.x = 60;
    objetoCargado.position.y = 90;
    objetoCargado.position.z = -100;
    objetoCargado.name='DianaCuerda';
    DianaCuerda['modelo']=objetoCargado;
    scene.add(objetoCargado);

    DianaCuerda['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaCuerda['collision'].position.x= 60;
    DianaCuerda['collision'].position.y= 90;
    DianaCuerda['collision'].position.z= -100;
    DianaCuerda['collision'].scale.x = 15;
    DianaCuerda['collision'].scale.y = 15;

    DianaCuerda['collisionBB'] = new THREE.Sphere(DianaCuerda['collision'].position, 7.5);


    scene.add(objetoCargado);
});
loadOBJWithMTL('../modelos/DianaCuerda/','dianaSolitaCuerdita.obj','dianaBad.mtl', (objetoCargado) => {
    objetoCargado.position.x = -60;
    objetoCargado.position.y = 90;
    objetoCargado.position.z = -100;
    objetoCargado.name='DianaCuerda';
    DianaCuerda['modelo']=objetoCargado;
    scene.add(objetoCargado);

    DianaCuerda['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaCuerda['collision'].position.x= -60;
    DianaCuerda['collision'].position.y= 90;
    DianaCuerda['collision'].position.z= -100;
    DianaCuerda['collision'].scale.x = 15;
    DianaCuerda['collision'].scale.y = 15;

    DianaCuerda['collisionBB'] = new THREE.Sphere(DianaCuerda['collision'].position, 7.5);


    scene.add(objetoCargado);
});

loadOBJWithMTL('../modelos/DianaPalito/','dianaSobrePalito.obj','dianaSobrePalito.mtl', (objetoCargado) => {
    objetoCargado.position.x = -12;
    objetoCargado.position.y = -10;
    objetoCargado.position.z = -100;
    objetoCargado.scale.multiplyScalar(1)
    objetoCargado.name='DianaPalito';
    DianaPalito['modelo']=objetoCargado;



    DianaPalito['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaPalito['collision'].position.x= -12;
    DianaPalito['collision'].position.y= -10;
    DianaPalito['collision'].position.z= -100;
    DianaPalito['collision'].scale.x = 1.5;
    DianaPalito['collision'].scale.y = 1.5;

    DianaPalito['collisionBB'] = new THREE.Sphere(DianaPalito['collision'].position, .75);



    scene.add(objetoCargado);
});
loadOBJWithMTL('../modelos/DianaPalito/','dianaSobrePalito.obj','dianaSobrePalito.mtl', (objetoCargado) => {
    objetoCargado.position.x = -42;
    objetoCargado.position.y = -10;
    objetoCargado.position.z = -100;
    objetoCargado.scale.multiplyScalar(1)
    objetoCargado.name='DianaPalito';
    DianaPalito['modelo']=objetoCargado;



    DianaPalito['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaPalito['collision'].position.x= -42;
    DianaPalito['collision'].position.y= -10;
    DianaPalito['collision'].position.z= -100;
    DianaPalito['collision'].scale.x = 1.5;
    DianaPalito['collision'].scale.y = 1.5;

    DianaPalito['collisionBB'] = new THREE.Sphere(DianaPalito['collision'].position, .75);



    scene.add(objetoCargado);
});
loadOBJWithMTL('../modelos/DianaPalito/','dianaSobrePalito.obj','dianaSobrePalito.mtl', (objetoCargado) => {
    objetoCargado.position.x = -72;
    objetoCargado.position.y = -10;
    objetoCargado.position.z = -100;
    objetoCargado.scale.multiplyScalar(1)
    objetoCargado.name='DianaPalito';
    DianaPalito['modelo']=objetoCargado;



    DianaPalito['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaPalito['collision'].position.x= -72;
    DianaPalito['collision'].position.y= -10;
    DianaPalito['collision'].position.z= -100;
    DianaPalito['collision'].scale.x = 1.5;
    DianaPalito['collision'].scale.y = 1.5;

    DianaPalito['collisionBB'] = new THREE.Sphere(DianaPalito['collision'].position, .75);



    scene.add(objetoCargado);
});
loadOBJWithMTL('../modelos/DianaPalito/','dianaSobrePalito.obj','dianaSobrePalito.mtl', (objetoCargado) => {
    objetoCargado.position.x = 18;
    objetoCargado.position.y = -10;
    objetoCargado.position.z = -100;
    objetoCargado.scale.multiplyScalar(1)
    objetoCargado.name='DianaPalito';
    DianaPalito['modelo']=objetoCargado;



    DianaPalito['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaPalito['collision'].position.x= 18;
    DianaPalito['collision'].position.y= -10;
    DianaPalito['collision'].position.z= -100;
    DianaPalito['collision'].scale.x = 1.5;
    DianaPalito['collision'].scale.y = 1.5;

    DianaPalito['collisionBB'] = new THREE.Sphere(DianaPalito['collision'].position, .75);



    scene.add(objetoCargado);
});
loadOBJWithMTL('../modelos/DianaPalito/','dianaSobrePalito.obj','dianaSobrePalito.mtl', (objetoCargado) => {
    objetoCargado.position.x = 48;
    objetoCargado.position.y = -10;
    objetoCargado.position.z = -100;
    objetoCargado.scale.multiplyScalar(1)
    objetoCargado.name='DianaPalito';
    DianaPalito['modelo']=objetoCargado;



    DianaPalito['collision'] = new THREE.Mesh(spheregeometry, Material);
    DianaPalito['collision'].position.x= 48;
    DianaPalito['collision'].position.y= -10;
    DianaPalito['collision'].position.z= -100;
    DianaPalito['collision'].scale.x = 1.5;
    DianaPalito['collision'].scale.y = 1.5;

    DianaPalito['collisionBB'] = new THREE.Sphere(DianaPalito['collision'].position, .75);



    scene.add(objetoCargado);
});

/*
DianaGancho['collision'] = new THREE.Mesh(spheregeometry, Material);

DianaPalito['collision'] = new THREE.Mesh(spheregeometry, Material);

DianaCuerda['collision'] = new THREE.Mesh(spheregeometry, Material);


scene.add(DianaGrande['collision'], DianaGancho['collision'], DianaPalito['collision'], DianaCuerda['collision']);
*/


//////  Carga de FBXs ///////// (copias todo)
loader.load('../modelos/character.fbx', (model)=>{                                  //con Alt + Shift agarras varias columnas
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
    /*const ctLoader = new THREE.CubeTextureLoader();
    ctLoader.setPath( 'techo/' );

    ctLoader.load( [
        'fondo3.jpg', 'fondo3.jpg',
        'fondo3.jpg', 'fondo3.jpg',
        'fondo3.jpg', 'fondo3.jpg'
    ], (cubeTexture) => {
        scene.background = cubeTexture;
    }); */

    const textureLoader = new THREE.TextureLoader();
    const textureRepeat = 1;
    textureLoader.load('techo/fondo3.jpg', (albedo)=> {
        albedo.wrapS = THREE.RepeatWrapping;
        albedo.wrapT = THREE.RepeatWrapping;
        albedo.repeat.multiplyScalar(textureRepeat);
        textureLoader.load('techo/fondo3.jpg', (normal) => {
            normal.wrapS = THREE.RepeatWrapping;
            normal.wrapT = THREE.RepeatWrapping;
            normal.repeat.multiplyScalar(textureRepeat);
            const geometry = new THREE.PlaneGeometry( 2.5, 1.25 );
            const material = new THREE.MeshStandardMaterial( {
                map: albedo,
                normalMap: normal
            } );
            const plane = new THREE.Mesh( geometry, material );
            plane.scale.multiplyScalar(500);
            plane.position.set(0,95,-700); //0,-25,-500
            plane.rotation.x = THREE.Math.degToRad(0);
            scene.add( plane );
        })
    });

    /*const textureLoader2 = new THREE.TextureLoader();
    const textureRepeat2 = 1;
    textureLoader.load('techo/fondo3.jpg', (albedo)=> {
        albedo.wrapS = THREE.RepeatWrapping;
        albedo.wrapT = THREE.RepeatWrapping;
        albedo.repeat.multiplyScalar(textureRepeat);
        textureLoader.load('techo/fondo3.jpg', (normal) => {
            normal.wrapS = THREE.RepeatWrapping;
            normal.wrapT = THREE.RepeatWrapping;
            normal.repeat.multiplyScalar(textureRepeat);
            const geometry = new THREE.PlaneGeometry( 1, 1 );
            const material = new THREE.MeshStandardMaterial( {
                map: albedo,
                normalMap: normal
            } );
            const plane = new THREE.Mesh( geometry, material );
            plane.scale.multiplyScalar(500);
            plane.position.set(500,100,-700); //0,-25,-500
            plane.rotation.x = THREE.Math.degToRad(0);
            scene.add( plane );
        })
    });

    const textureLoader3 = new THREE.TextureLoader();
    const textureRepeat3 = 1;
    textureLoader.load('techo/fondo3.jpg', (albedo)=> {
        albedo.wrapS = THREE.RepeatWrapping;
        albedo.wrapT = THREE.RepeatWrapping;
        albedo.repeat.multiplyScalar(textureRepeat);
        textureLoader.load('techo/fondo3.jpg', (normal) => {
            normal.wrapS = THREE.RepeatWrapping;
            normal.wrapT = THREE.RepeatWrapping;
            normal.repeat.multiplyScalar(textureRepeat);
            const geometry = new THREE.PlaneGeometry( 1, 1 );
            const material = new THREE.MeshStandardMaterial( {
                map: albedo,
                normalMap: normal
            } );
            const plane = new THREE.Mesh( geometry, material );
            plane.scale.multiplyScalar(500);
            plane.position.set(-500,100,-700); //0,-25,-500
            plane.rotation.x = THREE.Math.degToRad(0);
            scene.add( plane );
        })
    });*/
}

function onStartFloor(){

    const textureLoader = new THREE.TextureLoader();
    const textureRepeat = 10;
    textureLoader.load('techo/Dark-Grey-Concrete.jpg', (albedo)=> {
        albedo.wrapS = THREE.RepeatWrapping;
        albedo.wrapT = THREE.RepeatWrapping;
        albedo.repeat.multiplyScalar(textureRepeat);
        textureLoader.load('techo/Dark-Grey-Concrete.jpg', (normal) => {
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
    onStartPlayer1();
    onStartPlayer2();
    camera.position.set(0,60,0);
    //camera.position.z = 0;
}

//Emilio - crear player, collisiones
function onStartPlayer1(){
    const cube1Geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube1Material = new THREE.MeshPhongMaterial({ color: "aqua" });
    const cube1 = new THREE.Mesh(cube1Geometry, cube1Material);
    cube1.position.x = 10;
    cube1.position.y = 30;
    cube1.position.z =-80;
    Player1['modelo'] = cube1
    scene.add(cube1);
}
function onStartPlayer2(){
    const cube1Geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube1Material = new THREE.MeshPhongMaterial({ color: "crimson" });
    const cube1 = new THREE.Mesh(cube1Geometry, cube1Material);
    cube1.position.x = -10;
    cube1.position.y = 30;
    cube1.position.z =-80;
    Player2['modelo'] = cube1
    scene.add(cube1);
}
function UpdateCollisions(bulletBB){
    //Create collision spheres
console.log(bulletBB);
console.log(DianaGrande['collisionBB']);

if (bulletBB.intersectsSphere(DianaGrande['collisionBB'])) {
    DianaGrande['facing'] = false;
} 
if (bulletBB.intersectsSphere(DianaPalito['collisionBB'])) {
    DianaPalito['facing'] = false;
} 
if (bulletBB.intersectsSphere(DianaCuerda['collisionBB'])) {
    DianaCuerda['facing'] = false;
} 
if (bulletBB.intersectsSphere(DianaGancho['collisionBB'])) {
    DianaGancho['facing'] = false;
} 

}

function onMovement(dt){
    document.onkeydown = function (e) {
        //console.log(e);
        //console.log(Player1['modelo'].position);
        if (e.keyCode === 37) {
            Player1['modelo'].position.x -= 22*dt;
        }
        if (e.keyCode === 39) {
            Player1['modelo'].position.x += 22*dt;
        }
        if (e.keyCode === 38) {
            Player1['modelo'].position.y += 22*dt;
        }
        if (e.keyCode === 40) {
            Player1['modelo'].position.y -= 22*dt;
        }
        if (e.keyCode === 13) {
            onShootPlayer1();
        }
        if (e.keyCode === 65) {
            Player2['modelo'].position.x -= 22*dt;
        }
        if (e.keyCode === 68) {
            Player2['modelo'].position.x += 22*dt;
        }
        if (e.keyCode === 87) {
            Player2['modelo'].position.y += 22*dt;
        }
        if (e.keyCode === 83) {
            Player2['modelo'].position.y -= 22*dt;
        }
        if (e.keyCode === 69) {
            onShootPlayer2();
        }
      };
}

function onShootPlayer1(){
    //console.log(Player1['modelo'].position);
    const BULLETgeometry = new THREE.SphereGeometry(2, 16, 16);

    var bullet = new THREE.Mesh(BULLETgeometry, Material);
    bullet.position.set(
        Player1['modelo'].position.x,
        Player1['modelo'].position.y,
        -99
    );

        bullet.alive = true;
        setTimeout(function(){
            bullet.alive = false;
            //scene.remove(bullet);
        }, 1000);


        var bulletBB = new THREE.Sphere(bullet.position, .5);
        UpdateCollisions(bulletBB);

    //scene.add(bullet);

    //console.log(DianaGrande['modelo'].position);
    //console.log(DianaGancho['modelo'].position);
    //console.log(DianaPalito['modelo'].position);
    //console.log(DianaCuerda['modelo'].position);

}
function onShootPlayer2(){
    //console.log(Player1['modelo'].position);
    const BULLETgeometry = new THREE.SphereGeometry(2, 16, 16);

    var bullet = new THREE.Mesh(BULLETgeometry, Material);
    bullet.position.set(
        Player2['modelo'].position.x,
        Player2['modelo'].position.y,
        -99
    );

        bullet.alive = true;
        setTimeout(function(){
            bullet.alive = false;
            //scene.remove(bullet);
        }, 1000);


        var bulletBB = new THREE.Sphere(bullet.position, .5);
        UpdateCollisions(bulletBB);

    //scene.add(bullet);

    //console.log(DianaGrande['modelo'].position);
    //console.log(DianaGancho['modelo'].position);
    //console.log(DianaPalito['modelo'].position);
    //console.log(DianaCuerda['modelo'].position);

}
/*
let rotationTimer1 = 3; //THREE.Math.randFloat (3, 5);
let rotationTimer2 = 3;
let rotationTimer3 = 3;
let rotationTimer4 = 3;
let frotnTimer = 3;
*/
function rotateTarget(dt){
    //DianaGrande
    /*
    if(DianaGrande['facing']){
        if(rotationTimer2 <= 0){//shot bool
            // Rotar a Side
            DianaGrande['reload'] = 7;
            DianaGrande['facing'] = !DianaGrande['facing'];
            DianaGrande['modelo'].rotation.x = THREE.Math.degToRad(90);
            
        }
        else{
            //rotationTimer -= dt;
        }
    }else{
        if ( DianaGrande['reload'] <= 0){
            // Rotar a Front
            rotationTimer2 = 3; //THREE.Math.randFloat (3, 5);
            DianaGrande['facing'] = !DianaGrande['facing'];
            DianaGrande['modelo'].rotation.x = THREE.Math.degToRad(0);
        }
        else{
            DianaGrande['reload'] -= dt;
        }
    }  
    
    */
   if(!DianaGrande['facing']){
       if (DianaGrande['reload'] < 0){
            DianaGrande['facing'] = true;
            DianaGrande['reload'] = 7;
            DianaGrande['modelo'].rotation.x = THREE.Math.degToRad(0);
        }else{       
            DianaGrande['modelo'].rotation.x = THREE.Math.degToRad(90);
            DianaGrande['reload'] -= dt;
        }
    }
    if(!DianaPalito['facing']){
        if (DianaPalito['reload'] < 0){
             DianaPalito['facing'] = true;
             DianaPalito['reload'] = 5;
             DianaPalito['modelo'].rotation.x = THREE.Math.degToRad(0);
         }else{       
             DianaPalito['modelo'].rotation.x = THREE.Math.degToRad(90);
             DianaPalito['reload'] -= dt;
         }
     }
     if(!DianaCuerda['facing']){
        if (DianaCuerda['reload'] < 0){
             DianaCuerda['facing'] = true;
             DianaCuerda['reload'] = 3;
             DianaCuerda['modelo'].rotation.x = THREE.Math.degToRad(0);
         }else{       
             DianaCuerda['modelo'].rotation.x = THREE.Math.degToRad(90);
             DianaCuerda['reload'] -= dt;
         }
     }
     if(!DianaGancho['facing']){
        if (DianaGancho['reload'] < 0){
             DianaGancho['facing'] = true;
             DianaGancho['reload'] = 2;
             DianaGancho['modelo'].rotation.x = THREE.Math.degToRad(0);
         }else{       
             DianaGancho['modelo'].rotation.x = THREE.Math.degToRad(90);
             DianaGancho['reload'] -= dt;
         }
     }
    /*
    rotationTimer1 -= dt;
    rotationTimer2 -= dt;
    rotationTimer3 -= dt;
    rotationTimer4 -= dt;
    */
}


function onUpdate(dt) {
    //Función para el futuro
    rotateTarget(dt);
    onMovement(dt);
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