const request = require('supertest');
const express = require('express');
const routes = require('../src/routes');

// ─── App de prueba (sin servidor activo) ────────────────────────────────────
const app = express();
app.use(express.json());
app.use('/api', routes);

// ============================================================================
// POST /api/add
// ============================================================================
describe('POST /api/add', () => {
  it('suma dos números positivos', async () => {
    const res = await request(app).post('/api/add').send({ a: 5, b: 3 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(8);
  });

  it('suma un número positivo y uno negativo', async () => {
    const res = await request(app).post('/api/add').send({ a: 10, b: -4 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(6);
  });

  it('suma dos números negativos', async () => {
    const res = await request(app).post('/api/add').send({ a: -7, b: -3 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(-10);
  });

  it('suma con cero (identidad)', async () => {
    const res = await request(app).post('/api/add').send({ a: 42, b: 0 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(42);
  });

  it('suma números decimales', async () => {
    const res = await request(app).post('/api/add').send({ a: 1.5, b: 2.3 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBeCloseTo(3.8);
  });

  it('suma números grandes', async () => {
    const res = await request(app)
      .post('/api/add')
      .send({ a: 1000000, b: 2000000 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(3000000);
  });
});

// ============================================================================
// POST /api/subtract
// ============================================================================
describe('POST /api/subtract', () => {
  it('resta dos números positivos', async () => {
    const res = await request(app).post('/api/subtract').send({ a: 5, b: 3 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(2);
  });

  it('resta que da resultado negativo', async () => {
    const res = await request(app).post('/api/subtract').send({ a: 3, b: 5 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(-2);
  });

  it('resta de un número consigo mismo (da cero)', async () => {
    const res = await request(app).post('/api/subtract').send({ a: 7, b: 7 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(0);
  });

  it('resta con números negativos', async () => {
    const res = await request(app).post('/api/subtract').send({ a: -5, b: -3 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(-2);
  });

  it('resta números decimales', async () => {
    const res = await request(app).post('/api/subtract').send({ a: 5.5, b: 2.2 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBeCloseTo(3.3);
  });
});

// ============================================================================
// POST /api/multiply
// ============================================================================
describe('POST /api/multiply', () => {
  it('multiplica dos números positivos', async () => {
    const res = await request(app).post('/api/multiply').send({ a: 5, b: 3 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(15);
  });

  it('multiplicación por cero da cero', async () => {
    const res = await request(app).post('/api/multiply').send({ a: 99, b: 0 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(0);
  });

  it('multiplicación por uno (identidad)', async () => {
    const res = await request(app).post('/api/multiply').send({ a: 42, b: 1 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(42);
  });

  it('multiplicación de dos negativos da positivo', async () => {
    const res = await request(app).post('/api/multiply').send({ a: -4, b: -3 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(12);
  });

  it('multiplicación de positivo y negativo da negativo', async () => {
    const res = await request(app).post('/api/multiply').send({ a: 6, b: -2 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(-12);
  });

  it('multiplica números decimales', async () => {
    const res = await request(app).post('/api/multiply').send({ a: 2.5, b: 4 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBeCloseTo(10);
  });
});

// ============================================================================
// POST /api/divide
// ============================================================================
describe('POST /api/divide', () => {
  it('divide dos números positivos exactos', async () => {
    const res = await request(app).post('/api/divide').send({ a: 6, b: 3 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(2);
  });

  it('divide con resultado decimal', async () => {
    const res = await request(app).post('/api/divide').send({ a: 7, b: 2 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBeCloseTo(3.5);
  });

  it('divide un número negativo entre positivo', async () => {
    const res = await request(app).post('/api/divide').send({ a: -10, b: 2 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(-5);
  });

  it('divide dos negativos da positivo', async () => {
    const res = await request(app).post('/api/divide').send({ a: -8, b: -4 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(2);
  });

  it('divide cero entre cualquier número da cero', async () => {
    const res = await request(app).post('/api/divide').send({ a: 0, b: 5 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(0);
  });

  it('retorna 400 al dividir por cero', async () => {
    const res = await request(app).post('/api/divide').send({ a: 6, b: 0 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Cannot divide by zero');
  });

  it('retorna 400 al dividir cero entre cero', async () => {
    const res = await request(app).post('/api/divide').send({ a: 0, b: 0 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Cannot divide by zero');
  });
});

// ============================================================================
// POST /api/pow
// ============================================================================
describe('POST /api/pow', () => {
  it('calcula la potencia de dos números positivos', async () => {
    const res = await request(app).post('/api/pow').send({ a: 2, b: 10 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(1024);
  });

  it('cualquier número elevado a 0 es 1', async () => {
    const res = await request(app).post('/api/pow').send({ a: 99, b: 0 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(1);
  });

  it('cualquier número elevado a 1 es él mismo', async () => {
    const res = await request(app).post('/api/pow').send({ a: 7, b: 1 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(7);
  });

  it('potencia con exponente negativo da fracción', async () => {
    const res = await request(app).post('/api/pow').send({ a: 2, b: -2 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBeCloseTo(0.25);
  });

  it('potencia con base negativa y exponente par da positivo', async () => {
    const res = await request(app).post('/api/pow').send({ a: -3, b: 2 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(9);
  });

  it('potencia con base negativa y exponente impar da negativo', async () => {
    const res = await request(app).post('/api/pow').send({ a: -2, b: 3 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(-8);
  });

  it('cero elevado a cualquier potencia positiva es cero', async () => {
    const res = await request(app).post('/api/pow').send({ a: 0, b: 5 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(0);
  });

  it('potencia con exponente decimal (raíz cuadrada de 4)', async () => {
    const res = await request(app).post('/api/pow').send({ a: 4, b: 0.5 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBeCloseTo(2);
  });
});

// ============================================================================
// Rutas no existentes
// ============================================================================
describe('Rutas no definidas', () => {
  it('retorna 404 para una ruta inexistente', async () => {
    const res = await request(app).post('/api/modulo').send({ a: 10, b: 3 });
    expect(res.status).toBe(404);
  });

  it('retorna 404 para método GET en un endpoint POST', async () => {
    const res = await request(app).get('/api/add');
    expect(res.status).toBe(404);
  });
});