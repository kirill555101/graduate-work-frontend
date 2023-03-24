export default class Drawer {
  constructor(ctx, positionX = 400) {
    this.ctx = ctx;
    this.positionX = positionX;
    this.positionY = 50;
    this.ctx.font = '14px Arial';
    this.centersArray = [];
  }

  drawEllipse(text) {
    // if (!firstElement) {
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(this.positionX, this.positionY - 145);
    //   this.ctx.lineTo(this.positionX, this.positionY - 25);
    //   this.ctx.stroke();
    //   this.ctx.closePath();
    // }

    this.ctx.beginPath();
    this.ctx.moveTo(this.positionX - 50, this.positionY - 25);
    this.ctx.lineTo(this.positionX + 50, this.positionY - 25);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.ellipse(this.positionX + 50, this.positionY, 25, 25, -Math.PI / 2, 0, Math.PI);
    this.ctx.ellipse(this.positionX - 50, this.positionY, 25, 25, Math.PI / 2, 0, Math.PI);

    // this.ctx.ellipse(this.positionX, this.positionY, 75, 25, 0, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fillText(text, this.positionX - 30, this.positionY + 5);

    const { positionX, positionY } = this;
    this.centersArray.push({ positionX, positionY });

    this.positionY += 120;
  }

  drawRectangle(text) {
    // this.ctx.beginPath();
    // this.ctx.moveTo(this.positionX, this.positionY - 95);
    // this.ctx.lineTo(this.positionX, this.positionY - 50);
    // this.ctx.stroke();
    // this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.moveTo(this.positionX - 75, this.positionY - 25); // Left top
    this.ctx.lineTo(this.positionX - 75, this.positionY + 25); // Left bottom
    this.ctx.lineTo(this.positionX + 75, this.positionY + 25); // Right bottom
    this.ctx.lineTo(this.positionX + 75, this.positionY - 25); // Right top
    this.ctx.lineTo(this.positionX - 75, this.positionY - 25); // Left top
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fillText(text, this.positionX - 30, this.positionY + 5);

    const { positionX, positionY } = this;
    this.centersArray.push({ positionX, positionY });

    this.positionY += 120;
  }

  drawRectangleWithLines(text) {
    console.log(text);
  }

  drawParallelogram(text) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.positionX - 50, this.positionY - 25); // Left top
    this.ctx.lineTo(this.positionX - 75, this.positionY + 25); // Left bottom
    this.ctx.lineTo(this.positionX + 50, this.positionY + 25); // Right bottom
    this.ctx.lineTo(this.positionX + 75, this.positionY - 25); // Right top
    this.ctx.lineTo(this.positionX - 50, this.positionY - 25); // Left top
    this.ctx.stroke();
    this.ctx.closePath();

    const { positionX, positionY } = this;
    this.centersArray.push({ positionX, positionY });

    this.ctx.fillText(`Вывод ${text}`, this.positionX - 30, this.positionY + 5);

    this.positionY += 120;
  }

  drawRhombus(text, type) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.positionX, this.positionY - 25); // Top
    this.ctx.lineTo(this.positionX - 75, this.positionY); // Left
    this.ctx.lineTo(this.positionX, this.positionY + 25); // Bottom
    this.ctx.lineTo(this.positionX + 75, this.positionY); // Right
    this.ctx.lineTo(this.positionX, this.positionY - 25); // Back to Top
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fillText(text, this.positionX - 20, this.positionY + 5);

    const { positionX, positionY } = this;
    const position = type == 'condition' ? 'left' : 'bottom';
    this.centersArray.push({ positionX, positionY, position, type });

    if (type === 'condition') {
      this.ctx.fillText('Да', positionX - 60, positionY + 30);
      this.ctx.fillText('Нет', positionX + 40, positionY + 30);
    }

    this.positionY += 120;
  }

  moveLeft() {
    this.positionX -= 80;
  }

  moveRight() {
    this.positionX += 80;
  }

  moveUp() {
    this.positionY -= 120;
  }

  moveDown() {
    this.positionY += 120;
  }

  drawLines() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.centersArray[0].positionX, this.centersArray[0].positionY + 25);

    let currentCenter = null;
    this.centersArray.forEach(({ positionX, positionY, position, addLine, addLineLeft }, index) => {
      if (index === 0) {
        return;
      }

      if (addLine !== false) {
        if (addLineLeft === true) {
          // this.ctx.quadraticCurveTo(0, 1000, positionX - 75, positionY);
          // this.ctx.arc(positionX, positionY, 100, 3 * Math.PI / 4, );
          this.ctx.lineTo(currentCenter.positionX, currentCenter.positionY + 50);
          this.ctx.lineTo(positionX - 100, currentCenter.positionY + 50);
          this.ctx.lineTo(positionX - 100, positionY - 40);
          this.ctx.lineTo(positionX - 75 + 75, positionY - 40);

          this.ctx.lineTo(positionX - 85 + 75, positionY - 40 - 5);
          this.ctx.moveTo(positionX - 75 + 75, positionY - 40);
          this.ctx.lineTo(positionX - 85 + 75, positionY - 40 + 5);
          this.ctx.moveTo(positionX - 75 + 75, positionY - 40);

          this.ctx.moveTo(positionX + 75, positionY);
          this.ctx.lineTo(positionX + 75 + 120 + 5, positionY);

          return;
        } else {
          this.ctx.lineTo(positionX, positionY - 25);
        }
      }
      currentCenter = { positionX, positionY };
      switch (position) {
        case 'left':
          this.ctx.moveTo(positionX - 75, positionY);
          break;
        case 'right':
          this.ctx.moveTo(positionX + 75, positionY);
          break;
        default:
          this.ctx.moveTo(positionX, positionY + 25);
          break;
      }
    });

    this.ctx.stroke();
    this.ctx.closePath();
  }

  addElsePosition(count) {
    const conditionCenter = this.centersArray[this.centersArray.length - 1 - count];
    const { positionX, positionY } = conditionCenter;
    this.centersArray.push({ positionX, positionY, position: 'right', addLine: false });
    this.moveRight();
  }

  addCycleLine() {
    let index = this.centersArray.length - 1;
    while (index > 0) {
      const center = this.centersArray[index];
      if (center.type === 'cycle' && center.used !== true) {
        this.centersArray[index] = { used: true, ...center };
        break;
      }
      --index;
      this.positionY -= 60;
    }
    this.positionX += 120;

    const cycleCenter = this.centersArray[index];
    console.log(cycleCenter);
    const { positionX, positionY } = cycleCenter;
    this.centersArray.push({ positionX, positionY, position: 'right', addLineLeft: true });

    this.ctx.fillText('Да', positionX + 5, positionY + 45);
    this.ctx.fillText('Нет', positionX + 80, positionY + 20);
  }

  clear() {
    this.ctx.clearRect(0, 0, 10000, 10000);

    this.positionX = 400;
    this.positionY = 50;
    this.ctx.font = '14px Arial';
    this.centersArray = [];
  }
}
