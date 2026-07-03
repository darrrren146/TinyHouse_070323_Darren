//let color_palette = ["#7BE4FF", "#FBFC4C", "#95D651", "#A5A636", "#45802A"]
// let basePalette = ["#f3f3f3", "#ededed"];
let color_palette;
let basePalette;
let padding = 300;

function setup() {
  createCanvas(2000, 1400); // 畫布大小：width, height

  let color_rand = random();
  if (color_rand < 0.4) {
    color_palette = ["#bee7ea", "#8dd1ff", "#5d93d1"];
    basePalette = ["#1B5AA7"];
  } else if (color_rand < 0.7) {
    color_palette = ["#8dd1ff", "#416cc0", "#89AAC1", "#c5592b"];
    basePalette = ["#5d93d1"];
  } else {
    color_palette = ["#f26827", "#f2b980", "#ffab52", "#d84c10"];
    basePalette = ["#b75703"];
  }

  background(random(basePalette)); // 背景顏色
  colorMode(HSB);

  // // 呼叫自己建立的函式
  // RJ_rect(700, 400, 10, 40,20, 20, 15);

  //     // 使用迴圈重複繪製
  // for (let i = 0; i < 100; i++)
  //   {let x = random(-padding, width);
  //     let y = random(-padding, height);
  //     let xCount = int(random(5, 30));
  //     let yCount = int(random(20, 100));
  //     let R = random(1, 15);
  //     let xSpan = R + random(5, 10);
  //     let ySpan = R + random(3);
  //     RJ_rect(x, y, xCount, yCount, xSpan, ySpan, R);
  // }

  //     // 設定矩形大小、間隔

  let ysum = 0;
  let xsum = 0;
  let yCount = random([10, 30, 60]);

  for (let j = 0; j < 80; j++) {
    let xCount = random(10) * 10;

    let x = xsum;
    let y = ysum;
    let R = 3;
    let xSpan = R * 2;
    let ySpan = R * 2;

    RJ_rect(x, y, xCount, yCount, xSpan, ySpan, R);

    xsum += xCount * xSpan;
    if (xsum > width) {
      ysum += yCount * ySpan;
      yCount = random([10, 30, 60]);
      xsum = 0;
    }
  }

  // 只畫一次
  noLoop();
}

function draw() {}

// _x: 起始x座標, _y: 起始y座標, _xCount: x方向點點排數, _yCount: y方向點點排數, _xSpan: x方向間距, _ySpan: y方向間距, _R: 點點大小
function RJ_rect(_x, _y, _xCount, _yCount, _xSpan, _ySpan, _R) {
  let mainClr = random(color_palette); // 隨機選一個顏色
  let fade_scale = random(0.2, 1); // 括號沒有數字代表0-1

  let mainhue = hue(mainClr); // 取得顏色的色相
  let mainSat = saturation(mainClr); // 取得顏色的飽和度
  let mainBri = brightness(mainClr); // 取得顏色的明度

  let lightClr = color(mainhue, mainSat - 20, mainBri - 40); // 顏色加亮
  let waveScl = random();

  let noiseStep = 0.002; // 波型取樣距離，小->波型變化小；大->波型變化大
  let sharpness = 0.1; // 銳利取樣範圍，大->比較不銳利；銳利畫取樣範圍，小-> 邊緣銳利
  let noiseRnd = random();

  // 繪製點點矩陣
  for (let i = 0; i < _xCount; i++) {
    let px = i * _xSpan + _x; // 計算 x 座標
    for (let j = 0; j < _yCount; j++) {
      let py = j * _ySpan + _y; // 計算 y 座標

      let fade_rate = j / _yCount; // 0/-1
      fade_rate = map(fade_rate, 0, 1, 0, fade_scale);

      if (random() > fade_rate) {
        push(); // 儲存畫布目前狀態
        translate(px, py); // 移動畫布原點

        // if (noiseRnd < 0.2) {
        //   let off = noise(px * noiseStep, py * noiseStep);

        //   let offStroke = constrain(
        //     map(off, 0.5 - sharpness, 0.5 + sharpness, 0, 1) * _R * 2,
        //     0,
        //     _R * 2,
        //   );

        //   stroke("#c7ff56e9");

        //   noFill();
        //   strokeWeight(5);
        //   circle(0, 0, offStroke);
        // }

        if (waveScl < 0.8) {
          fill(abs(sin(px / 10)) < 0.3 ? lightClr : mainClr); // 畫出亮色線條
        } else {
          fill(abs(sin(py / 10)) < 0.3 ? lightClr : mainClr); // 畫出亮色
        }

        // fill(mainClr); // 填色
        noStroke(); // 不要外框線
        let r = _R * random(1, 2.5);
        circle(0, 0, r); //
        pop(); // 回復至畫布先前狀態
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
