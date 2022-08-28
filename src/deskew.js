import * as tf from '@tensorflow/tfjs';


const normalization_factor = 4; // or 8?
const sobel_x_kernel = tf.tensor2d([[1, 0, -1], [2, 0, -2], [1, 0, -1]]).div(normalization_factor);
const sobel_y_kernel = tf.transpose(sobel_x_kernel)
const maxfilter = tf.layers.maxPool1d({ poolSize: 3, strides: 1, padding: 'same', trainable: false });

function sobel(gray) {
    const edge_x = tf.conv2d(gray, sobel_x_kernel.reshape([3, 3, 1, 1]), 1, 1);
    const edge_y = tf.conv2d(gray, sobel_y_kernel.reshape([3, 3, 1, 1]), 1, 1);
    const edges = tf.square(edge_x).add(tf.square(edge_y)).sqrt();
    return edges
}

function deg2rad(degree) {
    return degree * Math.PI / 180
}

function compute_score(edges, delta = 0.02) {
    const proj = edges.mean(2); // n h w c -> n h c
    const maxes = maxfilter.apply(proj);
    const mins = maxfilter.apply(proj.mul(-1)).mul(-1); // effectively a minPool
    const spikes = maxes.sub(mins).greater(delta);
    const score = spikes.sum();
    return score
}

export default function deskew(image, search_range = 90) {
    const half_range = Math.floor(search_range / 2);
    const thumb = tf.image.resizeBilinear(image, [192, 192]);
    const gray = thumb.mean(2, true).expandDims().div(255);
    const edges = sobel(gray);    

    let max_score = Number.NEGATIVE_INFINITY;
    let argmax = 0;
    for (let angle = -half_range; angle <= half_range; angle++) {
        tf.engine().startScope(); // prevent memory leak
        let rotated_edges = tf.image.rotateWithOffset(edges, deg2rad(angle));
        let score = compute_score(rotated_edges);
        score = score.dataSync()[0]; // synced IO might cause some overhead 
        if (score >= max_score) {
            max_score = score;
            argmax = angle;
        }
        tf.engine().endScope();
    }
    // const corrected = tf.image.rotateWithOffset(image.div(255).expandDims(), deg2rad(argmax));
    // return corrected
    return argmax
}
