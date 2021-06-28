'use strict';
const server= require('../src/server');
const supertest = require('supertest');
const request = supertest(server.server);

describe('API Server',()=>{
  test('bad route',async()=>{
    const res=  await request.get('/hello world');
    expect(res.status).toEqual(404);
  });
  test('bad method',async()=>{
    const res= await request.delete('/person?name=Batool');
    expect(res.status).toEqual(404);
  });
  test('no name in the query string',async()=>{
    const res= await request.get('/person');
    expect(res.status).toEqual(500);
  });
  test('good',async()=>{
    const res= await request.get('/person?name=Batool');
    expect(res.status).toEqual(200);
  });
  test('given an name in the query string, the output object is correct',async()=>{
    const res = await request.get('/person?name=Batool');
    expect(res.body).toEqual({ name: 'Batool' });
  });
});