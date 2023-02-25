const SVGNS = "http://www.w3.org/2000/svg";

export function createSVG(width: number, height: number): SVGSVGElement {
    let svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("width", width.toString());
    svg.setAttribute("height", height.toString());
    return svg;
}

export function addPath(
    svg: SVGSVGElement,
    d: string,
    style: { color: string; width: number } = { color: "black", width: 1 }
): SVGPathElement {
    let path = document.createElementNS(SVGNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "transparent");
    path.setAttribute("stroke", style.color);
    path.setAttribute("stroke-width", style.width.toString());
    svg.appendChild(path);
    return path;
}

export function smoothCurve(dx: number, dy: number): string {
    return dx >= dy ? `c ${dx * 0.4} ${0} ${dx * (1 - 0.4)} ${dy} ${dx} ${dy}` : `c ${0} ${dy * 0.4} ${dx} ${dy * (1 - 0.4)} ${dx} ${dy}`;
}
