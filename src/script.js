import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const WINDOW_SIZE = {width: window.innerWidth, height: window.innerHeight}
const FRAME_UI_SIZE = {width:0.05, height:0.15}
const FRAME_UI_COLOR_DEFAULT = 0xb3b7b7


function onResize(camera, renderer, mesh)
{
    // Update size
    WINDOW_SIZE.width = window.innerWidth
    WINDOW_SIZE.height = window.innerHeight

    // Update camera
    updateCamera(camera)

    // Update renderer
    renderer.setSize(WINDOW_SIZE.width, WINDOW_SIZE.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    moveUIFrame(mesh, camera)
}

function updateCamera(camera)
{
    const aspectRatio = WINDOW_SIZE.width/WINDOW_SIZE.height
    camera.aspect = aspectRatio
    camera.left = -aspectRatio
    camera.right = aspectRatio
    camera.updateProjectionMatrix()
}

function makeRenderer(canvas, scene, camera)
{
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(WINDOW_SIZE.width, WINDOW_SIZE.height)
    renderer.render(scene, camera)
    return renderer
}

function update (scene, camera, renderer)
{
    renderer.render(scene, camera)
    window.requestAnimationFrame( ()=>{update(scene, camera, renderer)} )
}

function makeUiFrame()
{
    const geometry = new THREE.PlaneGeometry(FRAME_UI_SIZE.width, FRAME_UI_SIZE.height, 1)
    const material = new THREE.MeshBasicMaterial({ color: FRAME_UI_COLOR_DEFAULT })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x=Math.PI
    return mesh
}

function makeCamera()
{
    let aspectRatio = WINDOW_SIZE.width / WINDOW_SIZE.height
    const camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, -1, 1, 0.1, 100)
    camera.position.z = 3
    return camera
}

function getCornerPosition(camera)
{
    const bttmLeftCorner = new THREE.Vector3(-1,-1,1).unproject(camera);
    return bttmLeftCorner
}

function moveWithPivotOffset(mesh, bttmLeftPosition)
{
    console.log(mesh.width)
    mesh.position.set(bttmLeftPosition.x+FRAME_UI_SIZE.width/2,bttmLeftPosition.y-FRAME_UI_SIZE.height/2)
}

function moveUIFrame(uiFrame, camera)
{
    const bttmLeftCorner = getCornerPosition(camera);
    moveWithPivotOffset(uiFrame, bttmLeftCorner);
}

function main()
{
    const canvas = document.querySelector('canvas.webgl')
    const scene = new THREE.Scene()
    const camera = makeCamera()
    scene.add(camera)
    const renderer = makeRenderer(canvas, scene, camera)
    const uiFrame = makeUiFrame()
    scene.add(uiFrame)
    moveUIFrame(uiFrame, camera)
    update(scene, camera, renderer)
    window.addEventListener('resize', ()=>{onResize(camera, renderer, uiFrame)})
}

main()
