import * as fr from './frame.js'
import * as THREE from 'three'

const FRAME_PADDING = 0.005

export class Timeline
{
    constructor(frameNum)
    {
        this.frameNum = frameNum
        this.groupLength = fr.FRAME_UI_SIZE.width*this.frameNum
        this.group;
        this.groupPosition;
    }

    drawFrames(cornerPosition)
    {
        frames = []
        let position = [cornerPosition.x+fr.FRAME_UI_SIZE.width/2,
                        cornerPosition.y-fr.FRAME_UI_SIZE.height/2]

        this.group = new THREE.Group()

        for (let i=0; i<this.frameNum; i++)
        {

            const frame = new fr.Frame()
            const mesh = frame.draw(position)

            position[0]+=(fr.FRAME_UI_SIZE.width+FRAME_PADDING)

            frames.push(frame)
            this.group.add(mesh)
        }
        this.groupPosition = cornerPosition
        return [this.group, frames]
    }

    drawPlay()
    {

    }

    drawRecord()
    {
    }

}