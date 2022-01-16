let c = document.getElementById("animationCanvas");
let ctx = c.getContext("2d");

/**
 * Image loading demo
 */

// let myImg = document.createElement("img"); // new Image();
// myImg.onload = () => {
//     ctx.drawImage(myImg, 0, 0, 500, 500);
// }

// myImg.src = "/loading-external-images-starter/images/idle.png";

/**
 * Image loading using callback
 */

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let frames = {
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
};

let imagePath = (action, frameNumber) => {
  return `images/${action}/${frameNumber}.png`;
};

let loadImages = (callback) => {
  let images = {
    backward: [],
    block: [],
    forward: [],
    idle: [],
    punch: [],
    kick: [],
  };
  let imagesToLoad = 0; // frames.idle.length + frames.kick.length + frames.punch.length;

  ["backward", "block", "forward", "idle", "kick", "punch"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imagesToLoad += animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = imagePath(animation, frameNumber);

        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad -= 1;

          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let bgimg = document.createElement("img");
bgimg.onload = () => callback(img);
bgimg.src = "/images/background.jpg";

let animate = (ctx, images, animation, callback, framerate = 15) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(bgimg, 0, 0, c.width, c.height);
      ctx.drawImage(image, 0, 0, c.width, c.height);
    }, (index * 1000) / framerate);
  });

  setTimeout(callback, (images[animation].length * 1000) / framerate);
};

// loadImage(imagePath(1), (img)=>{
//     ctx.drawImage(img, 0, 0, 500, 500);
// });

loadImages((images) => {
    let queuedAnimations = [];

    let aux = () => {
        let selectedAnimation;
        if(queuedAnimations.length === 0){
            selectedAnimation = "idle";
        }else{
            selectedAnimation = queuedAnimations.shift();
        }
        animate(ctx, images, selectedAnimation, aux);
    };
    aux();

    document.getElementById("kick").onclick = () => {
        queuedAnimations.push("kick");
    };

    document.getElementById("punch").onclick = () => {
        queuedAnimations.push("punch");
    };

    document.getElementById("block").onclick = () => {
        queuedAnimations.push("block");
    };

    document.getElementById("forward").onclick = () => {
        queuedAnimations.push("forward");
    };

    document.getElementById("backward").onclick = () => {
        queuedAnimations.push("backward");
    };

    document.addEventListener("keyup", (event) => {
        const key = event.key;

        if(key === "ArrowLeft"){
            queuedAnimations.push("backward");
        }

        if(key === "ArrowRight"){
            queuedAnimations.push("forward");
        }

        if(key === "ArrowDown"){
            queuedAnimations.push("block");
        }

        if(key === "ArrowUp"){
            queuedAnimations.push("punch");
        }

        if(key === " "){
            queuedAnimations.push("kick");
        }
    });
});
