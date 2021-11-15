import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements AfterViewInit {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private mixer!: THREE.AnimationMixer;

  private stats!: Stats;

  private container!: HTMLElement | null;

  @Input() path!: string;
  @Input() type!: string;
  @Input() scale!: number;
  private clock!: THREE.Clock;

  private controls!: OrbitControls;

  ngAfterViewInit(): void {
    this.init();
    this.animate();
  }

  init() {

    this.container = document.getElementById( 'container' );
    if (this.container === null || this.container === undefined) {
      return;
    }
    this.camera = new THREE.PerspectiveCamera( 25, this.container.offsetWidth /  this.container.offsetHeight, 1, 1000 );
    this.camera.position.set( 15, 10, - 15 );

    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();

    // collada

    if (this.type.includes('.dae')) {
      this.colladaLoad();
    } else if (this.type.includes('.obj')) {
      this.objLoad();
    } else if (this.type.includes('.mtl')) {
      this.mtlLoad();
    } else if (this.type.includes('.fbx')) {
      this.fbxLoad();
    } else if (this.type.includes('.glb')) {
      this.glbLoad();
    }
    //

    // const gridHelper = new THREE.GridHelper( 10, 20, 0x888888, 0x444444 );
    // this.scene.add( gridHelper );

    //

    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
    this.scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    this.scene.add( this.camera );
    this.camera.add( pointLight );

    //

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio(  this.container.offsetWidth / this.container.offsetHeight );
    this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight );
    // @ts-ignore
    this.container.appendChild( this.renderer.domElement );

    //

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.screenSpacePanning = true;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 40;
    this.controls.target.set( 0, 2, 0 );
    this.controls.update();

    // @ts-ignore
    // this.stats = new Stats();
    //@ts-ignore
    // this.container.appendChild( this.stats.dom );

    //

    const self = this;
    function onWindowResize() {

      if (self.container === null && self.container === undefined) {
        return;
      }

      // @ts-ignore
      self.camera.aspect = self.container.offsetWidth / self.container.offsetHeight;
      self.camera.updateProjectionMatrix();

      // @ts-ignore
      self.renderer.setSize( self.container.offsetWidth, self.container.offsetHeight );

    }

    window.addEventListener( 'resize', onWindowResize );

  }

  animate() {

    requestAnimationFrame( this.animate.bind(this) );

    this.render();
    // this.stats.update();

  }

  render() {

    const delta = this.clock.getDelta();

    if ( this.mixer !== undefined ) {

      this.mixer.update( delta );

    }

    this.renderer.render( this.scene, this.camera );

  }

  glbLoad(): void {
    const glbLoad = new GLTFLoader();

    glbLoad.load(
      'assets/' + this.path + '.glb',
      (object) => {


        this.mixer = new THREE.AnimationMixer( object.scene );

        if (object.animations.length > 0) {
          const action = this.mixer.clipAction( object.animations[ 0 ] );
          action.play();
        }

        object.scene.traverse(( child: any ) => {
          //@ts-ignore
          if ( child.isMesh ) {

            child.castShadow = true;
            child.receiveShadow = true;

          }

        } );
          if (this.scale) {
            object.scene.scale.set(this.scale, this.scale, this.scale)
          } else {
            object.scene.scale.set(.1, .1, .1)
          }
          this.scene.add(object.scene)
      },
      (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
          console.log(error)
      }
  )
  }

  fbxLoad(): void {
    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        'assets/' + this.path + '.fbx',
        (object) => {


          this.mixer = new THREE.AnimationMixer( object );

          if (object.animations.length > 0) {
            const action = this.mixer.clipAction( object.animations[ 0 ] );
            action.play();
          }

					object.traverse(( child ) => {
            //@ts-ignore
						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;

						}

					} );
            if (this.scale) {
              object.scale.set(this.scale, this.scale, this.scale)
            } else {
              object.scale.set(.1, .1, .1)
            }
            this.scene.add(object)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
  }

  objLoad(): void {
    const objLoader = new OBJLoader();
    objLoader.load('/assets/' + this.path + this.type, (object) => {
      object.traverse(( child ) => {
        //@ts-ignore
        if ( child.isMesh ) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      } );
        if (this.scale) {

          object.scale.set(this.scale, this.scale, this.scale)
        } else {
          object.scale.set(.01, .01, .01)
          let OBJBoundingBox = new THREE.Box3().setFromObject(object);
          // @ts-ignore
          OBJBoundingBox.center(object.position);
          object.position.multiplyScalar(-1);
          object.position.x = object.position.x;
          object.position.y = object.position.y;
          object.position.z = object.position.z;
        }
        this.scene.add(object)
    });
  }

  mtlLoad(): void {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/assets/' + this.path + '.mtl', (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      if (mtl.materials && mtl.materials['Material'] && mtl.materials['Material'].side) {
        mtl.materials['Material'].side = THREE.DoubleSide;
      }
      objLoader.setMaterials(mtl);
      objLoader.load('/assets/' + this.path + this.type, (root) => {
        this.scene.add(root);
      });
    });
  }

  colladaLoad(): void {
    const loaderDae = new ColladaLoader();
    loaderDae.load( '/assets/' + this.path + this.type, ( collada ) => {

      const avatar = collada.scene;
      const animations = avatar.animations;

      avatar.traverse(( node ) => {
        // @ts-ignore
        if ( node.isSkinnedMesh ) {

          node.frustumCulled = false;

        }

      } );

      this.mixer = new THREE.AnimationMixer( avatar );
      if (animations.length > 0) {
        this.mixer.clipAction( animations[ 0 ] ).play();
      }

      this.scene.add( avatar );

    } );
  }

}
