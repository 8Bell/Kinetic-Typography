import { Text } from "./text.js";
import { Particle } from "./particle.js";
//import * as PIXI from './node_modules/pixi.js'

export class Visual {
    constructor() {
        this.text = new Text();

        this.texture = PIXI.Texture.from('particle.png');

        this.Particles = [];

        this.mouse = {
            x: 0,
            y: 0,
            radius: 100,
        }; 

        document.addEventListener('pointermove', this.onMove.bind(this), false);
    }
   
    show(stageWidth, stageHeight, stage) {
        if (this.container) {
            stage.removeChild(this.container);
        }

        this.pos = this.text.setText('B', 10, stageWidth, stageHeight);

        this.container = new PIXI.ParticleContainer(
            this.pos.length,
            {
                vertices: false,
                position: true,
                rotation: false,
                scale: false,
                uvs: false,
                tint: false,
            }
        );

        stage.addChild(this.container);
  
        this.particles = []; // 파티클 모음

        for (let i = 0; i < this.pos.length; i++) {
            const item = new Particle(this.pos[i], this.texture);
            this.container.addChild(item.sprite);
            this.particles.push(item);
        }    

    }

    animate() {
        for (let i = 0; i < 1; i++) { // 모든 파티클에 대해 적용
            const item = this.particles[i]; 
            const dx = this.mouse.x - item.x;  // dx는 마우스와 파티클 사이간 중심 사이의 x축 좌표 차이
            const dy = this.mouse.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy); //dist(distance) = 마우스와 파티클 사이의 직선 거리(피타고라스)
            const minDist = item.radius + this.mouse.radius; // 충돌거리 = 파티클의 반지름과 마우스 영역의 반지름을 더한 값
            
            //console.log('dx',dx)

            if (dist < minDist) { //직선거리가 반지름을 더한 값보다 작아졌을 때,
                const angle = Math.atan2(dy, dx); //데카르트좌표계 사이 두 점 사이의 절대각 (역탄젠트)
                const tx = item.x + Math.cos(angle) * minDist; // 충돌거리 * 각도 cos + 파티클 x 좌표
                const ty = item.y + Math.sin(angle) * minDist;
                const ax = tx - this.mouse.x;
                const ay = ty - this.mouse.y;
                item.vx -= ax;
                item.vy -= ay;

                console.log('충돌!')
            }
            item.draw();
            //console.log(item)
        }
    }

    onMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clienty;
        //console.log('mouse',this.mouse.x,this.mouse.y)
    }
}