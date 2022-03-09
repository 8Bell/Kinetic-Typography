import {Visual1} from './visual1.js'
import {Visual2} from './visual2.js';;

class App1 {
    constructor() {
        this.setWebgl();

        WebFont.load({
            google: {
                families: ['Hind:700']
            },
            fontactive: () => {

                this.visual = new Visual1();

                window.addEventListener('resize', this.resize.bind(this), false);
                this.resize();

                requestAnimationFrame(this.animate.bind(this));
            }
        });
    }

    setWebgl() {
        this.renderer = new PIXI.Renderer({

            width: document.body.clientWidth,
            height: document.body.clientHeight,
            antialias: true,
            transparent: false,
            resolution: (window.devicePixelRatio > 1) ? 2 : 1,
            autoDensity: true,
            powerPerference: "high-performance",
            backgroundColor: 0x000000,

        });
        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();

        const blurFfilter = new PIXI.filters.BlurFilter();
        blurFfilter.blur = 5;
        blurFfilter.autoFit = true;

        const fragSource = `
          precision mediump float;
          varying vec2 vTextureCoord;
          uniform sampler2D uSampler;
          uniform float threshold;
          uniform float mr;
          uniform float mg;
          uniform float mb;
          void main(void) {
              vec4 color = texture2D(uSampler, vTextureCoord);
              vec3 mcolor = vec3(mr, mg, mb);
              if (color.a > threshold) {
                  gl_FragColor = vec4(mcolor, 1.0); 
              } else {
                  gl_FragColor = vec4(vec3(0.0), 0.0);
              }
            }
        `;

        const uniformsData = {
            threshold : 0.5,
            mr: 255.0 / 255.0,
            mg: 255.0 / 255.0,
            mb: 255.0 / 255.0,
        };

        const thresholdFilter = new PIXI.Filter(null, fragSource, uniformsData);
        this.stage.filters = [blurFfilter, thresholdFilter];
        this.stage.filterArea = this.renderer.screen;

    }  

    resize() {
        this.stageWidth = document.body.clientWidth;  
        this.stagrHeight = document.body.clientHeight;

        this.renderer.resize(this.stageWidth, this.stagrHeight);

        this.visual.show(this.stageWidth, this.stagrHeight, this.stage);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

        this.visual.animate(this.ctx, t);

        this.renderer.render(this.stage);

    }
}
class App2 {
    constructor() {
        this.setWebgl();
        
        WebFont.load({
            google: {
                families: ['Hind:700']
            },
            fontactive: () => {
                this.visual = new Visual2();

                window.addEventListener('resize', this.resize.bind(this), false);
                this.resize();
                
                requestAnimationFrame(this.animate.bind(this));
            }
        });
    }

    setWebgl() {

        this.renderer = new PIXI.Renderer({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            antialias: true,
            transparent: false,
            resolution: (window.devicePixelRatio > 1) ? 2 : 1,
            autoDensity: true,
            powerPreference: "high-performance",
            backgroundColor: 0xdddddd,
        });
        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();

        
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.renderer.resize(this.stageWidth, this.stageHeight);

        this.visual.show(this.stageWidth, this.stageHeight, this.stage);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

         this.visual.animate()

        this.renderer.render(this.stage);
    }
}


export let INPUT_TEXT = ''

window.onload = () => {
    new App1();
    new App2();

    let TEXT = prompt('3글자 이하 텍스트를 입력하세요', 'HI!')
    INPUT_TEXT = TEXT == null ? `HI!` : TEXT
}
