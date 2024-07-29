// Destructuring Matter.js modules
const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

// Define canvas dimensions
const width = 800;
const height = 600;

// Array of colors for the shapes
const colors = ["red", "blue", "green", "yellow", "orange", "purple", "deeppink", "cyan", "lime", "magenta", "gold", "silver", "brown", "black", "white"];

// Create an engine
const engine = Engine.create();
const { world } = engine;

// Create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});

// Run the renderer
Render.run(render);

// Create and run the runner
Runner.run(Runner.create(), engine);

// Add mouse control
World.add(world, MouseConstraint.create(engine, {
  mouse: Mouse.create(render.canvas),
}));

// Create walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),    // Top wall
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),  // Bottom wall
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),    // Left wall
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true })   // Right wall
];
World.add(world, walls);

// Add random shapes to the world
for (let i = 0; i < 50; i++) {
  const randomX = Math.random() * width;
  const randomY = Math.random() * height;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  if (Math.random() > 0.5) {
    World.add(world, Bodies.rectangle(randomX, randomY, 50, 50, {
      restitution: 0.8,
      render: { fillStyle: randomColor }
    }));
  } else {
    World.add(world, Bodies.circle(randomX, randomY, 35, {
      restitution: 0.8,
      render: { fillStyle: randomColor }
    }));
  }
}
