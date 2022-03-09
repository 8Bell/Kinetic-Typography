import {INPUT_TEXT} from "./app.js"

export class Text{
    
    constructor(){
        this.canvas = document.createElement('canvas');
        // this.canvas.style.position = 'absolute';
        // this.canvas.style.left = '0';
        // this.canvas.style.top = '0';
        // document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }

    setText(str, density, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight; 

        const myText = str;
        const fontWidth = 700;
        const length = INPUT_TEXT.length
        let fontSize = ''
        if(length == 1){ fontSize = 400}
        else if(length == 2){fontSize = 200}
        else if(length == 3){fontSize = 150}
        else if(length == 4){fontSize = 100}
        else if(length >= 5){fontSize = 80}

        const fontName = 'Hind';

        this.ctx.clearRect(0, 0, stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
        this.ctx.textBaseline = `middle`;
        const fontPos = this.ctx.measureText(myText);
        this.ctx.fillText(
            myText,
            (stageWidth - fontPos.width) / 2,
            fontPos.actualBoundingBoxAscent +
            fontPos.actualBoundingBoxDescent +
            ((stageHeight - fontSize) / 2)
        );

        return this.dotPos(density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight){
        const imageData = this.ctx.getImageData(
            0, 0,
            stageWidth, stageHeight
        ).data;

        const particles = []; //파티클 집합
        let i = 0;
        let width = 0;
        let pixel;

        for (let height = 0; height < stageHeight ; height += density) { 
            ++i;
            const slide = (i % 1) == 0; // 사이사이에 배열하기
            width = 0;
            if (slide == 1) {
                width += 6;
            }

            for (width; width < stageWidth; width += density) {
                pixel = imageData[((width + (height * stageWidth)) * 4) - 1];
                if (pixel != 0 &&
                    width > 0 &&
                    width < stageWidth &&
                    height > 0 &&
                    height < stageHeight) {
                    particles.push({
                        x: width,
                        y: height,
                    });
                }
            }
        }
        return particles;
    }
}