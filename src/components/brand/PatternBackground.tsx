"use client";

import { useEffect, useRef } from "react";
import styles from "./PatternBackground.module.css";

/**
 * 3D Interactive Geometric Pattern Canvas (Pattern.js style)
 * Renders an animated interactive particle & polyhedron network with depth,
 * connecting lines, and mouse-parallax responsiveness.
 */
export function PatternBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || 600;
    };
    window.addEventListener("resize", onResize);

    // 3D Nodes
    interface Node3D {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
    }

    const COLORS = ["#818cf8", "#c084fc", "#38bdf8", "#ec4899"] as const;
    const count = Math.min(Math.floor((width * height) / 18000), 55);
    const nodes: Node3D[] = Array.from({ length: Math.max(count, 32) }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * 600 + 100,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      vz: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2.2 + 1.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#818cf8",
    }));

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.35;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.35;
    };
    window.addEventListener("mousemove", onMouseMove);

    const fov = 450;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow for 3D camera effect
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Project & update nodes
      const projected = nodes.map((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Boundaries
        const spanX = width * 0.65;
        const spanY = height * 0.65;
        if (node.x < -spanX) node.x = spanX;
        if (node.x > spanX) node.x = -spanX;
        if (node.y < -spanY) node.y = spanY;
        if (node.y > spanY) node.y = -spanY;
        if (node.z < 60) node.z = 700;
        if (node.z > 700) node.z = 60;

        // 3D perspective projection
        const scale = fov / (fov + node.z);
        const px = (node.x - mouseX) * scale + width / 2;
        const py = (node.y - mouseY) * scale + height / 2;
        const radius = Math.max(0.6, node.size * scale);
        const alpha = Math.min(1, Math.max(0.12, (1 - node.z / 750) * 0.85));

        return { px, py, radius, alpha, color: node.color, z: node.z };
      });

      // Draw 3D connecting web
      const maxDist = 130;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (!p1) continue;
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (!p2) continue;
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.22 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(165, 180, 252, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw projected points with soft radial glow
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Ambient subtle glow ring for larger 3D nodes
        if (p.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.25;
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
