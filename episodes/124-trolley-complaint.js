// Narrative 8: "Objects With Opinions". A made-up comedy sketch: shopping trolleys do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the trolley with a face.

function trolley(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const metal = mat('#C0C8D0', { metal: .8, rough: .25 });
  const t = { root: group([0, 0, 0], parent) };
  t.body = group([0, 0, 0], t.root);
  for (let i = 0; i < 6; i++) { box(3.6, .06, .06, metal, [0, 1.6 + i * .4, 1.2], t.body); box(3.6, .06, .06, metal, [0, 1.6 + i * .4, -1.2], t.body); box(.06, .06, 2.4, metal, [1.8, 1.6 + i * .4, 0], t.body); box(.06, .06, 2.4, metal, [-1.8, 1.6 + i * .4, 0], t.body); }
  for (const x of [-1.8, 1.8]) for (const z of [-1.2, 1.2]) box(.07, 2.1, .07, metal, [x, 2.6, z], t.body);
  box(3.6, .06, 2.4, metal, [0, 1.6, 0], t.body);
  cyl(.1, .1, 2.6, mat('#E2453C'), [-2.1, 3.9, 0], t.body, 8).rotation.x = Math.PI / 2;
  for (const x of [-1.6, 1.6]) for (const z of [-1, 1]) box(.06, 1.2, .06, metal, [x, .95, z], t.body);
  t.wheels = [];
  for (const x of [-1.6, 1.6]) for (const z of [-1, 1]) { const g = group([x, .3, z], t.root); const wh = cyl(.3, .3, .2, mat('#2A2A2A'), [0, 0, 0], g, 14); wh.rotation.x = Math.PI / 2; t.wheels.push(g); }
  t.face = group([1.86, 2.9, 0], t.body);
  for (const z of [-.4, .4]) { const e = ball(.25, mat('#FFFFFF'), [0, .2, z], t.face); e.scale.x = .4; ball(.12, mat('#111111'), [.08, .2, z], t.face); }
  t.mouth = box(.05, .1, .5, mat('#5A1E1E'), [.02, -.3, 0], t.face);
  return t;
}
function talk(t, time, on = true) { t.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(time * 14)) : 1; }
function wobble(t, time) { t.wheels[3].rotation.y = .9 * Math.sin(time * 18); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#B8BFC9', 0);
  w.store = group();
  box(60, 20, .5, mat('#E8F0F6'), [0, 10, -10], w.store);
  for (let i = 0; i < 5; i++) { const sh = group([-12 + i * 6, 0, -8], w.store); box(4, 6, 1.5, mat('#C9A27A'), [0, 3, 0], sh); for (let j = 0; j < 3; j++) for (let c = 0; c < 4; c++) box(.7, .9, .6, mat(['#E2453C', '#2F6FD6', '#22C55E', '#FFD21F'][(c + j + i) % 4]), [-1.4 + c * .95, 1.2 + j * 1.8, .5], sh); }
  w.t = trolley(k, k.scene); w.tr = w.t.root;
  w.shopper = group([0, 0, 0]);
  cyl(.8, .9, 3.2, mat('#8B5CF6'), [0, 1.6, 0], w.shopper, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], w.shopper);
  w.seyes = [-.3, .3].map(x => ball(.13, mat('#111111'), [x, 4.05, .78], w.shopper));
  w.pond = group([0, 0, 80]);
  box(60, .05, 40, mat('#7FB069'), [0, .03, 0], w.pond).castShadow = false;
  cyl(8, 8, .1, mat('#5BA8D9', { rough: .05, metal: .2 }), [0, .08, 0], w.pond, 40).castShadow = false;
  w.ducks = [];
  for (let i = 0; i < 3; i++) { const d = group([0, 0, 0], w.pond); const b = ball(.5, mat('#FFE45C'), [0, .4, 0], d); b.scale.set(1.3, .8, 1); ball(.32, mat('#FFE45C'), [.5, .9, 0], d); const bk = ball(.15, mat('#FF8A1F'), [.85, .85, 0], d); bk.scale.set(1.4, .5, 1); ball(.06, mat('#111111'), [.65, 1, .2], d); w.ducks.push(d); }
  w.hearts = group();
  for (let i = 0; i < 4; i++) { const h = ball(.2, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

export default {
  id: '124',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TROLLEY WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS TROLLEY', 'HAS A COMPLAINT.'],
  title: 'This shopping trolley has a complaint',
  description: 'One wonky wheel. Everybody picks him anyway. Then he finds a pond and never looks back. (A made-up talking trolley.)',
  tags: ['objectswithopinions', 'funny', 'trolley', 'supermarket', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking shopping trolleys are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This trolley has a complaint.',
      show: ['ground', 'store', 'tr'], sky: '#E8F0F6', lightAt: [0, 4, 2], lightDist: 14,
      cam: { pos: [5, 2.6, 11], look: [.8, 5.4, 0], fov: 48, to: { pos: [4.6, 2.6, 10.2], look: [.8, 5.3, 0], fov: 46 } },
      update: (w, p, t) => { w.tr.position.set(0, 0, 0); w.tr.rotation.set(0, -.6, 0); talk(w.t, t, t > .2); wobble(w.t, t); },
    },
    {
      say: 'One wheel has a mind of its own.',
      show: ['ground', 'store', 'tr', 'shopper'], sky: '#E8F0F6', lightAt: [0, 4, 2], lightDist: 18,
      cam: { pos: [2, 7, 16], look: [0, 2.5, 0], fov: 52, to: { pos: [2, 7, 15], look: [0, 2.5, 0], fov: 50 } },
      update: (w, p, t) => {
        const x = -4 + t * 2.5, z = 1.5 * Math.sin(t * 3); w.tr.position.set(x, 0, z); w.tr.rotation.set(0, -.5 * Math.cos(t * 3), 0); talk(w.t, t); wobble(w.t, t);
        w.shopper.position.set(x - 3, 0, z); w.shopper.rotation.y = Math.PI / 2 - .4 * Math.cos(t * 3); w.seyes.forEach(e => e.scale.setScalar(1.4));
      },
    },
    {
      say: 'And somehow, everyone still picks him.',
      show: ['ground', 'store', 'tr', 'shopper'], sky: '#E8F0F6', lightAt: [0, 4, 2], lightDist: 16,
      cam: { pos: [5, 4, 11], look: [0, 3.4, 0], fov: 48, to: { pos: [4.6, 4, 10], look: [0, 3.4, 0], fov: 46 } },
      update: (w, p, t) => { w.tr.position.set(.5, 0, 0); w.tr.rotation.set(0, -.4, 0); talk(w.t, t); w.shopper.position.set(-2.5, 0, .5); w.shopper.rotation.y = Math.PI / 2; w.seyes.forEach(e => e.scale.setScalar(1)); },
    },
    {
      say: 'So he escaped. To the duck pond. Best day ever.',
      show: ['ground', 'pond', 'tr', 'hearts'], sky: '#9ED2F3', lightAt: [0, 4, 80], lightDist: 18,
      cam: { pos: [6, 5, 94], look: [0, 2.4, 80], fov: 50, to: { pos: [5.6, 5, 93], look: [0, 2.4, 80], fov: 48 } },
      update: (w, p, t) => {
        w.tr.position.set(.5, -.6, 80.5); w.tr.rotation.set(0, -.5, .08 * Math.sin(t * 1.5)); talk(w.t, t, t < 1.6);
        w.ducks.forEach((d, i) => { const a = t * .6 + i * 2.1; d.position.set(Math.cos(a) * 4.5, .05, Math.sin(a) * 3); d.rotation.y = -a - Math.PI / 2; });
        w.hearts.children.forEach(h => { const f = (t * .7 + h.userData.i / 4) % 1; h.position.set(1.5 + (h.userData.i - 1.5) * .4, 4 + f * 2, 81); h.scale.setScalar(1 - f * .5); });
      },
    },
    {
      say: 'Wonky trolley: keep it, swap it, or adopt it? Comment below.',
      quiz: { q: 'What do you do with the wonky trolley?', options: ['Keep it', 'Swap it', 'Adopt it'], answer: 'It is a made-up trolley. It already adopted the ducks.' },
      show: ['ground', 'store', 'tr'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 14,
      cam: { pos: [5, 1.6, 10], look: [.8, 5.8, 0], fov: 48, to: { pos: [-3, 1.6, 10], look: [.8, 5.8, 0] } },
      update: (w, p, t) => { w.tr.position.set(0, 0, 0); w.tr.rotation.set(0, -.6, 0); talk(w.t, t, false); wobble(w.t, t); },
    },
  ],
};
