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
  const [isMobile, setIsMobile] = useState(false);

  // Track mobile state changes to trigger re-mount when crossing breakpoint
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getBodySize = useCallback((badge) => {
    // Responsive sizing based on viewport width
    const scale = isMobile ? 0.55 : 1; // Scale down to 55% on mobile
    
    switch (badge.type) {
      case "pill":
        return { w: 280 * scale, h: 56 * scale };
      case "pill-sm":
        return { w: 160 * scale, h: 50 * scale };
      case "circle":
        return { w: 72 * scale, h: 72 * scale };
      default:
        return { w: 200 * scale, h: 50 * scale };
    }
  }, [isMobile]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const floor = groundY || height * 0.42;
    const ceiling = ceilingY || 0;
    const floorMargin = 15; // Extra margin to prevent escaping

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.6 },
    });
    engineRef.current = engine;

    const wallThickness = 150;
    const walls = [
      Matter.Bodies.rectangle(width / 2, floor + wallThickness / 2, width * 2, wallThickness, { 
        isStatic: true, 
        slop: 0,
        friction: 1,
        restitution: 0
      }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 3, { 
        isStatic: true,
        slop: 0 
      }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 3, { 
        isStatic: true,
        slop: 0 
      }),
      Matter.Bodies.rectangle(width / 2, ceiling - wallThickness / 2, width * 2, wallThickness, { 
        isStatic: true,
        slop: 0 
      }),
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
        slop: 0,
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
          stiffness: 0.5,
          damping: 0.2,
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

    // Constrain bodies to stay within boundaries - BEFORE physics update
    Matter.Events.on(engine, 'beforeUpdate', () => {
      BADGES.forEach((badge) => {
        const body = bodiesRef.current[badge.id];
        if (body) {
          const size = getBodySize(badge);
          const halfH = size.h / 2;
          const halfW = size.w / 2;
          
          // Constrain to boundaries with margin
          if (body.position.y + halfH > floor - floorMargin) {
            Matter.Body.setPosition(body, { 
              x: body.position.x, 
              y: floor - floorMargin - halfH 
            });
            Matter.Body.setVelocity(body, { x: body.velocity.x * 0.5, y: 0 });
          }
          if (body.position.y - halfH < ceiling) {
            Matter.Body.setPosition(body, { 
              x: body.position.x, 
              y: ceiling + halfH 
            });
            Matter.Body.setVelocity(body, { x: body.velocity.x * 0.5, y: 0 });
          }
          if (body.position.x - halfW < 0) {
            Matter.Body.setPosition(body, { 
              x: halfW, 
              y: body.position.y 
            });
            Matter.Body.setVelocity(body, { x: 0, y: body.velocity.y * 0.5 });
          }
          if (body.position.x + halfW > width) {
            Matter.Body.setPosition(body, { 
              x: width - halfW, 
              y: body.position.y 
            });
            Matter.Body.setVelocity(body, { x: 0, y: body.velocity.y * 0.5 });
          }
        }
      });
    });

    // Additional constraint AFTER physics update to prevent any escape
    Matter.Events.on(engine, 'afterUpdate', () => {
      BADGES.forEach((badge) => {
        const body = bodiesRef.current[badge.id];
        if (body) {
          const size = getBodySize(badge);
          const halfH = size.h / 2;
          const halfW = size.w / 2;
          
          // Force constrain - no exceptions
          let needsCorrection = false;
          let newX = body.position.x;
          let newY = body.position.y;

          if (body.position.y + halfH > floor - floorMargin) {
            newY = floor - floorMargin - halfH;
            needsCorrection = true;
          }
          if (body.position.y - halfH < ceiling) {
            newY = ceiling + halfH;
            needsCorrection = true;
          }
          if (body.position.x - halfW < 0) {
            newX = halfW;
            needsCorrection = true;
          }
          if (body.position.x + halfW > width) {
            newX = width - halfW;
            needsCorrection = true;
          }

          if (needsCorrection) {
            Matter.Body.setPosition(body, { x: newX, y: newY });
            Matter.Body.setVelocity(body, { x: 0, y: 0 });
          }
        }
      });
    });

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
  }, [getBodySize, groundY, ceilingY, isMobile]);

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
              <span className="text-white dark:text-black text-xl md:text-3xl lg:text-4xl font-bold">
                ✻
              </span>
            ) : (
              <svg
                width={size.w * 0.47}
                height={size.h * 0.47}
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
              ? "px-4 py-2 text-xs md:px-8 md:py-4 md:text-base lg:text-lg"
              : "px-5 py-2.5 text-xs md:px-10 md:py-5 md:text-base lg:text-lg"
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
