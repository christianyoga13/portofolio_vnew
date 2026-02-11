"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";

const BADGES = [
  { id: "frontend", label: "FRONTEND DEVELOPER", type: "pill", rotate: -15 },
  { id: "engineer", label: "SOFTWARE ENGINEER", type: "pill", rotate: 20 },
  { id: "backend", label: "BACKEND DEVELOPER", type: "pill", rotate: 10 },
  { id: "wordpress", label: "WORDPRESS DEVELOPER", type: "pill", rotate: -8 },
  { id: "nama", label: "Yoga", type: "pill-sm", rotate: 5 },
  { id: "asterisk", label: "✻", type: "circle", rotate: 0 },
  { id: "arrow", label: "↓", type: "circle", rotate: 0 },
];

export default function PhysicsBadges({ groundY, ceilingY = 0 }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const engineRef = useRef(null);
  const bodiesRef = useRef({});
  const [positions, setPositions] = useState({});
  const rafRef = useRef(null);

  const getBodySize = useCallback((badge) => {
    switch (badge.type) {
      case "pill":
        return { w: 280, h: 56 };
      case "pill-sm":
        return { w: 160, h: 50 };
      case "circle":
        return { w: 72, h: 72 };
      default:
        return { w: 200, h: 50 };
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const floor = groundY || height * 0.42;
    const ceiling = ceilingY || 0;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.6 },
    });
    engineRef.current = engine;

    const wallThickness = 60;
    const walls = [
      Matter.Bodies.rectangle(width / 2, floor + wallThickness / 2, width * 2, wallThickness, { isStatic: true }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, ceiling - wallThickness / 2, width * 2, wallThickness, { isStatic: true }),
    ];
    Matter.Composite.add(engine.world, walls);

    const areaHeight = floor - ceiling;
    const startPositions = [
      { x: width * 0.2, y: ceiling + areaHeight * 0.15 },
      { x: width * 0.6, y: ceiling + areaHeight * 0.1 },
      { x: width * 0.45, y: ceiling + areaHeight * 0.18 },
      { x: width * 0.35, y: ceiling + areaHeight * 0.25 },
      { x: width * 0.15, y: ceiling + areaHeight * 0.3 },
      { x: width * 0.8, y: ceiling + areaHeight * 0.05 },
      { x: width * 0.5, y: ceiling + areaHeight * 0.2 },
    ];

    BADGES.forEach((badge, i) => {
      const size = getBodySize(badge);
      const pos = startPositions[i];
      const chamfer =
        badge.type === "circle"
          ? { radius: size.w / 2 }
          : { radius: size.h / 2 };

      const body = Matter.Bodies.rectangle(pos.x, pos.y, size.w, size.h, {
        chamfer,
        restitution: 0.3,
        friction: 0.4,
        frictionAir: 0.015,
        angle: (badge.rotate * Math.PI) / 180,
        density: 0.002,
      });

      bodiesRef.current[badge.id] = body;
      Matter.Composite.add(engine.world, body);
    });

    const el = overlayRef.current;
    let dragConstraint = null;

    const getPointerPos = (e) => {
      const rect = el.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const findBodyAt = (point) => {
      const allBodies = Matter.Composite.allBodies(engine.world).filter(
        (b) => !b.isStatic
      );
      for (const body of allBodies) {
        if (Matter.Bounds.contains(body.bounds, point)) {
          if (Matter.Vertices.contains(body.vertices, point)) {
            return body;
          }
        }
      }
      return null;
    };

    const onPointerDown = (e) => {
      e.preventDefault();
      const pos = getPointerPos(e);
      const body = findBodyAt(pos);
      if (body) {
        dragConstraint = Matter.Constraint.create({
          pointA: pos,
          bodyB: body,
          pointB: {
            x: pos.x - body.position.x,
            y: pos.y - body.position.y,
          },
          stiffness: 0.8,
          damping: 0.1,
          length: 0,
        });
        Matter.Composite.add(engine.world, dragConstraint);
        el.style.cursor = "grabbing";
      }
    };

    const onPointerMove = (e) => {
      if (dragConstraint) {
        e.preventDefault();
        const pos = getPointerPos(e);
        dragConstraint.pointA = pos;
      }
    };

    const onPointerUp = () => {
      if (dragConstraint) {
        Matter.Composite.remove(engine.world, dragConstraint);
        dragConstraint = null;
        el.style.cursor = "grab";
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointerleave", onPointerUp);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Sync physics positions → React state
    const updatePositions = () => {
      const next = {};
      BADGES.forEach((badge) => {
        const body = bodiesRef.current[badge.id];
        if (body) {
          next[badge.id] = {
            x: body.position.x,
            y: body.position.y,
            angle: body.angle,
          };
        }
      });
      setPositions(next);
      rafRef.current = requestAnimationFrame(updatePositions);
    };
    rafRef.current = requestAnimationFrame(updatePositions);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointerleave", onPointerUp);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      cancelAnimationFrame(rafRef.current);
    };
  }, [getBodySize, groundY, ceilingY]);

  const renderBadge = (badge) => {
    const pos = positions[badge.id];
    if (!pos) return null;

    const size = getBodySize(badge);

    const style = {
      position: "absolute",
      left: pos.x - size.w / 2,
      top: pos.y - size.h / 2,
      transform: `rotate(${pos.angle}rad)`,
      pointerEvents: "none",
      zIndex: 20,
    };

    if (badge.type === "circle") {
      return (
        <div key={badge.id} style={style}>
          <div
            className="rounded-full bg-black dark:bg-white flex items-center justify-center transition-colors duration-300"
            style={{ width: size.w, height: size.h }}
          >
            {badge.id === "asterisk" ? (
              <span className="text-white dark:text-black text-3xl md:text-4xl font-bold">
                ✻
              </span>
            ) : (
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-white dark:stroke-black"
                strokeWidth="2.5"
              >
                <path d="M12 5V19M12 19L5 12M12 19L19 12" />
              </svg>
            )}
          </div>
        </div>
      );
    }

    const isPillSm = badge.type === "pill-sm";

    return (
      <div key={badge.id} style={style}>
        <div
          className={`border border-black/30 dark:border-white/60 rounded-full tracking-wider uppercase bg-white dark:bg-[#0a0a0a] text-black dark:text-white flex items-center justify-center whitespace-nowrap transition-colors duration-300 ${
            isPillSm
              ? "px-8 py-4 text-base md:text-lg"
              : "px-10 py-5 text-base md:text-lg"
          }`}
        >
          {badge.label}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="absolute inset-0">
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30"
        style={{ cursor: "grab", touchAction: "none" }}
      />
      {BADGES.map(renderBadge)}
    </div>
  );
}
