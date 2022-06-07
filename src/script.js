import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as fr from './frame.js'
import * as tl from './timeline.js'

const WINDOW_SIZE = {width: window.innerWidth, height: window.innerHeight}

function onResize(camera, renderer, functionToRun)
{
    // Update size
    WINDOW_SIZE.width = window.innerWidth
    WINDOW_SIZE.height = window.innerHeight

    // Update camera
    updateCamera(camera)

    // Update renderer
    renderer.setSize(WINDOW_SIZE.width, WINDOW_SIZE.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    functionToRun()
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

function update (scene, camera, renderer)
{
    renderer.render(scene, camera)
    window.requestAnimationFrame( ()=>{update(scene, camera, renderer)} )
}

function main()
{
    const canvas = document.querySelector('canvas.webgl')
    const scene = new THREE.Scene()
    const camera = makeCamera()
    const renderer = makeRenderer(canvas, scene, camera)
    const bttmLeftCorner = getCornerPosition(camera);
    const timeline = new tl.Timeline(100)
    const timelineData = timeline.drawFrames(bttmLeftCorner)
    const framesGroup = timelineData[0]

    scene.add(camera)
    scene.add(framesGroup)

    update(scene, camera, renderer)
    //window.addEventListener('resize', ()=>{onResize(camera, renderer, testFunction)})
}

main()
