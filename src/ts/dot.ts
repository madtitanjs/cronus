export module Dot {

    export function createDot(fill: string) {
        let dot = document.createElementNS('http://www.w3.org/2000/svg','svg');
        dot.setAttribute('height', '5px');
        dot.setAttribute('width', '5px');
        dot.style.margin = '0 0.1rem';
        let crcle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        crcle.setAttributeNS(null, 'cy', '2.5');
        crcle.setAttributeNS(null, 'cx', '2.5');
        crcle.setAttributeNS(null, 'r', '2.5');
        crcle.setAttributeNS(null, 'fill', fill);
        dot.appendChild(crcle);
        return dot;
    }
}