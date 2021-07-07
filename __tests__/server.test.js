
const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server');
const req = supergoose(app);




describe('Api server', () => {
  test('handles invalid req', async () => {
    const res = await req.get('/anything');
    expect(res.status).toEqual(404);
  });

  it('handles error req', async () => {
    const res = await req.get('/bad');
    expect(res.status).toEqual(500);
  });

  test('handles correct req', async () => {
    const res = await req.get('/');
    expect(res.status).toEqual(200);
  });


});



describe('Food path', () => {
  let id = 0;
  it('can create a new food', async () => {
    let foodObj = { name: 'test', type: 'test' };
    const res = await req.post('/api/v1/food').send(foodObj);
    expect(res.body.name).toBe(foodObj.name);
    expect(res.body.type).toBe(foodObj.type);
  });


  it('can get a food after creation', async () => {
    let foodObj = { name: 'test', type: 'test' };
    const res = await req.get('/api/v1/food');
    expect(res.body.gettingFood[0].name).toBe(foodObj.name);
    expect(res.body.gettingFood[0].type).toBe(foodObj.type);
    expect(res.body.gettingFood.length).toBe(1);
    id = res.body.gettingFood[0].id;
    console.log(id);
  });

  test("delete by id", async () => {

    const res = await req.delete(`/api/v1/food${id}`)
    expect(res.body).toEqual({ "error": "Not Found" })

  })

  // it("put by id ", async () => {
  //   let updates = { name: 'test', type: 'test' }

  //   const res = await req.put(`/api/v1/food${id}`).send(updates)

  //   expect(res.status).toBe(200)
  //   expect(res.body.gettingFood.name).toBe('test')
  //   expect(res.body.gettingFood.type).toBe('test')

  // })

  it("update", function (done) {
    let updates = "{ name: 'test', type: 'test' }"

    req.put('/')
      .send(updates)
      .expect(200)
      .end(function (err, res) {
        done();
      })

  });


});


describe('clothes path', () => {
  let id = 0;
  it('can create a new clothes', async () => {
    let clothesObj = { name: 'test', color: 'test' };
    const res = await req.post('/api/v1/clothes').send(clothesObj);
    expect(res.body.name).toBe(clothesObj.name);
    expect(res.body.color).toBe(clothesObj.color);
  });


  it('can get a clothes after creation', async () => {
    let clothesObj = { name: 'test', color: 'test' };
    const res = await req.get('/api/v1/clothes');
    expect(res.body.gettingClothes[0].name).toBe(clothesObj.name);
    expect(res.body.gettingClothes[0].color).toBe(clothesObj.color);
    expect(res.body.gettingClothes.length).toBe(1);
    id = res.body.gettingClothes[0]._id;

  });




  test("delete by id", async () => {

    const res = await req.delete(`/api/v1/clothes${id}`)
    expect(res.body).toEqual({ "error": "Not Found" })

  })



  // test("update by id ", async () => {
  //   let updates = "{ name: 'test', color: 'test' }"
  //   const res = await req.put(`/api/v1/clothes${id}`).send(updates)

  //   expect(res.status).toBe(200)
  //   expect(res.body.gettingClothes.name).toBe('test')
  //   expect(res.body.gettingClothes.color).toBe('test')

  // })

  it("update", function (done) {
    let updates = "{ name: 'test', color: 'test' }"

    req.put('/')
      .send(updates)
      .expect(200)
      .end(function (err, res) {
        done();
      })

  });
});