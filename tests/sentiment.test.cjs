const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, overrides = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports, require, process: { env: {} }, AbortSignal, ...overrides });
  return exports;
}
const sentiment = load('src/app/lib/sentiment.ts');
function route(env, fetch) {
  return load('src/app/api/sentiment/route.ts', {
    process: { env }, fetch,
    require: (id) => id === '@/app/lib/sentiment' ? sentiment : require(id),
  }).POST;
}
const request = (text) => new Request('http://localhost/api/sentiment', { method: 'POST', body: JSON.stringify({ text }) });
test('accepts categories but rejects empty, ambiguous and unrelated answers', () => {
  assert.equal(sentiment.parseCategory('"FRUSTRAÇÃO".'), 'frustração');
  for (const text of ['', 'não tenho certeza', 'alegria ou tristeza', 'desamor']) assert.equal(sentiment.parseCategory(text), null);
});
test('invalid input, missing key and paid models never call provider', async () => {
  const fetch = () => { throw new Error('unexpected provider request'); };
  for (const text of ['', 'ab', 'x'.repeat(1001)]) assert.equal((await route({}, fetch)(request(text))).status, 400);
  assert.equal((await route({}, fetch)(request('feedback'))).status, 503);
  assert.equal((await route({ OPENROUTER_API_KEY: 'test', OPENROUTER_MODEL: 'paid/model' }, fetch)(request('feedback'))).status, 503);
});
test('sends server credentials and free model, returns only validated category', async () => {
  const post = route({ OPENROUTER_API_KEY: 'test-secret' }, async (url, options) => {
    assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions');
    assert.equal(options.headers.Authorization, 'Bearer test-secret');
    const body = JSON.parse(options.body);
    assert.equal(body.model, 'liquid/lfm-2.5-2.6b:free');
    assert.equal(body.messages[1].content, 'Muito bom');
    return Response.json({ choices: [{ message: { content: 'alegria' } }] });
  });
  const response = await post(request('  Muito bom  '));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { category: 'alegria' });
});
test('handles provider errors without leaking internals or fabricating a category', async () => {
  for (const [response, status] of [[new Response('secret provider detail', {status:401}),503], [new Response('',{status:429}),429], [Response.json({choices:[{message:{content:'unknown'}}]}),502]]) {
    const result = await route({OPENROUTER_API_KEY:'test'}, async () => response)(request('feedback'));
    assert.equal(result.status,status);
    assert.doesNotMatch(await result.text(), /secret|category/);
  }
  const result = await route({OPENROUTER_API_KEY:'test'}, async () => {throw new Error('timeout');})(request('feedback'));
  assert.equal(result.status,503);
});
