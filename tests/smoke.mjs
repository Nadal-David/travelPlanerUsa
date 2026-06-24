import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

class MockClassList {
  values = new Set();
  add(...names) { names.forEach((name) => this.values.add(name)); }
  remove(...names) { names.forEach((name) => this.values.delete(name)); }
  contains(name) { return this.values.has(name); }
  toggle(name, force) {
    const enabled = force ?? !this.values.has(name);
    enabled ? this.values.add(name) : this.values.delete(name);
    return enabled;
  }
}

class MockElement {
  classList = new MockClassList();
  dataset = {};
  innerHTML = '';
  textContent = '';
  addEventListener() {}
  querySelectorAll() { return []; }
  setAttribute() {}
  scrollIntoView() {}
  closest() { return null; }
}

const elements = new Map();
const getElement = (selector) => {
  if (!elements.has(selector)) elements.set(selector, new MockElement());
  return elements.get(selector);
};
const storage = new Map();
const loadHandlers = [];
const context = {
  console,
  setTimeout,
  clearTimeout,
  requestAnimationFrame: (callback) => callback(),
  document: {
    querySelector: getElement,
    querySelectorAll: () => [],
    addEventListener() {}
  },
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value)
  }
};
context.window = context;
context.window.addEventListener = (type, handler) => {
  if (type === 'load') loadHandlers.push(handler);
};
vm.createContext(context);

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script\s+src="([^"]+)"[^>]*><\/script>/g)]
  .map((match) => match[1].split('?')[0])
  .filter((path) => path.startsWith('./assets/js/'));

for (const script of scripts) {
  const source = await readFile(new URL(`..${script.slice(1)}`, import.meta.url), 'utf8');
  vm.runInContext(source, context, { filename: script });
}
loadHandlers.forEach((handler) => handler());

if (context.TravelPlannerData.days.length !== 19) {
  throw new Error(`Expected 19 days, found ${context.TravelPlannerData.days.length}`);
}
if (context.TravelPlannerRoutes.features.length !== 9) {
  throw new Error(`Expected 9 routes, found ${context.TravelPlannerRoutes.features.length}`);
}
if (!getElement('#days').innerHTML.includes('Jour 1')) {
  throw new Error('The day cards were not rendered.');
}

console.log('Smoke test passed: 19 days, 9 offline routes, application bootstrapped.');
