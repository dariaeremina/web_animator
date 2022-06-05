import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Object
 */
//const geometry = new THREE.BoxGeometry()
const geometry = new THREE.PlaneGeometry(0.05,0.15)
const material = new THREE.MeshBasicMaterial({ color: 0xb3b7b7 })
const mesh = new THREE.Mesh(geometry, material)
mesh.doubleSided = true;
scene.add(mesh)

console.log(sizes.width)


/**
 * Camera
 */
// Base camera
let aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, -1, 1, 0.1, 100)
//const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = -1
camera.lookAt(new THREE.Vector3())
scene.add(camera)

// Mesh position
const top_left_corner = new THREE.Vector3( 1, 1, -1).unproject( camera );
const bttm_left_corner = new THREE.Vector3(top_left_corner.x, -top_left_corner.y, top_left_corner.z);
mesh.position.set(bttm_left_corner.x-0.05/2,bttm_left_corner.y-0.15/2)

//const controls = new OrbitControls(camera, canvas)

window.addEventListener('resize', ()=>
{
    // Update size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera
    aspectRatio = sizes.width / sizes.height
    camera.aspect = aspectRatio
    //camera.setViewOffset(-aspectRatio, aspectRatio, -1, 1, 0.1, 100)
    camera.left = -aspectRatio
    camera.right = aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
})

const clock = new THREE.Clock()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

