import * as THREE from 'three'

export const FRAME_UI_SIZE = {width:0.05, height:0.15}
export const FRAME_UI_COLOR_DEFAULT = 0xb3b7b7

export class Frame
{
    constructor(frameNum)
    {
        this.frameNum = frameNum;
        this.objectPos = new THREE.Vector3(0,0,0)
    }

    draw(position)
    {
        // Create mesh object at the specified corner position
        const geometry = new THREE.PlaneGeometry(FRAME_UI_SIZE.width, FRAME_UI_SIZE.height, 1)
        const material = new THREE.MeshBasicMaterial({ color: FRAME_UI_COLOR_DEFAULT })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.rotation.x=Math.PI
        mesh.position.set(...position)
        return mesh
    }

    onHover()
    {
        console.log("hover")
    }

    onSelect()
    {
        console.log("select")
    }

    onSetKeyframe()
    {
        console.log("set keyframe")
    }

}