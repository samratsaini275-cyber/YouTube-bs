// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; premise modelled on 076 (humans had tails, ~1.1K views).
// A made-up comedy sketch: people do not have trunks. Hook: the premise as a question under 2 s; first frame shows a person with a trunk.

function trunk(k, parent, at, col, n = 7, r0 = .16) {
  const segs = []; let prev = parent;
  for (let i = 0; i < n; i++) { const g = k.group(i ? [0, -.28, 0] : at, prev); k.cyl(r0 - i * .012, r0 - i * .012 - .01, .3, col, [0, -.14, 0], g, 10); segs.push(g); prev = g; }
  return segs;
}
function curl(segs, a, b = 0, t = 0) { segs.forEach((s, i) => { s.rotation.x = a + b * Math.sin(t * 4 - i * .6); }); }

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, .2, .64], p.head); ball(.07, mat('#111111'), [x, .2, .76], p.head); }
  p.trunk = trunk(k, p.head, [0, -.05, .7], mat('#E2B08A'));
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9CCB7A', 0);
  w.room = group(); box(40, 20, .5, mat('#FFE6B8'), [0, 10, -4], w.room);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.bowl = group([0, 0, 0]); cyl(.5, .35, .35, mat('#E2453C'), [0, 0, 0], w.bowl, 16); cyl(.45, .45, .05, mat('#5DB8F5', { glow: .3 }), [0, .15, 0], w.bowl, 16);
  w.table = group([0, 0, 0]); box(2.2, .15, 1.4, mat('#8B5A2B'), [0, 1.5, 0], w.table); for (const x of [-.9, .9]) box(.12, 1.5, .12, mat('#6B4B2E'), [x, .75, 0], w.table);
  w.spray = group(); for (let i = 0; i < 10; i++) { const d = ball(.08, mat('#5DB8F5', { glow: .6 }), [0, 0, 0], w.spray); d.userData.i = i; d.castShadow = false; }
  w.papers = group(); for (let i = 0; i < 9; i++) { const s = box(.5, .02, .65, mat('#FFFFFF'), [0, 0, 0], w.papers); s.userData.i = i; }
  w.office = group(); box(3, .15, 1.6, mat('#C8CED6'), [1.2, 1.5, -.6], w.office); box(.8, .6, .1, mat('#1E2227'), [1.6, 1.95, -1.0], w.office);
  w.tree = group([0, 0, 0]); cyl(.7, .85, 4.5, mat('#6B4B2E'), [0, 2.25, 0], w.tree, 12); ball(2.2, mat('#2E8B4A'), [0, 5.6, 0], w.tree);
  w.kid = person(k, k.scene, '#22A06B'); w.kd = w.kid.root;
  w.ele = group([0, 0, 0]); const grey = mat('#9AA3AE', { rough: .8 });
  const eb = ball(1.6, grey, [0, 2.6, 0], w.ele); eb.scale.set(1.4, 1, 1);
  w.eHead = group([2, 3.4, 0], w.ele); ball(1, grey, [0, 0, 0], w.eHead);
  for (const z of [-1, 1]) { const ear = cyl(.9, .9, .1, mat('#B9C0C8'), [-.2, .1, z * .95], w.eHead, 16); ear.rotation.x = Math.PI / 2; ball(.13, mat('#111111'), [.75, .3, z * .45], w.eHead); }
  w.eTrunk = trunk(k, w.eHead, [.9, -.2, 0], grey, 8, .3);
  for (const x of [-1.3, 1.3]) for (const z of [-.7, .7]) cyl(.4, .4, 1.6, grey, [x, .8, z], w.ele, 10);
  w.hearts = group(); for (let i = 0; i < 4; i++) { const h = ball(.22, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '147',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HUMAN TRUNK',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD TRUNKS?'],
  title: 'What would happen if humans had trunks?',
  description: 'No more cups. Sneezes are a disaster. Hide and seek is over. And elephants finally feel normal. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'elephant', 'trunk', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: human trunks are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if humans had trunks?',
      show: ['ground', 'room', 'pp'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, 2.6, 8], look: [0, 3.8, 0], fov: 46, to: { pos: [.7, 2.6, 7.3], look: [0, 3.75, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, .25); curl(w.p.trunk, .25, .3, t); },
    },
    {
      say: 'Drinking? Who needs a cup.',
      show: ['ground', 'room', 'pp', 'table', 'bowl', 'spray'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [3.6, 3.2, 7], look: [.4, 3.0, .6], fov: 48, to: { pos: [3.3, 3.1, 6.4], look: [.4, 3.0, .6], fov: 46 } },
      update: (w, p, t) => {
        stand(w, 0, 0, 0); w.table.position.set(0, 0, 1.4); w.bowl.position.set(0, 1.75, 1.4);
        const sip = t < 1.2; curl(w.p.trunk, sip ? .45 : -.5, sip ? .04 : .1, t); w.p.head.rotation.x = sip ? .25 : -.1;
        w.spray.visible = !sip; w.spray.children.forEach(d => { const q = ((t - 1.2) * 1.6 + d.userData.i / 10) % 1; d.position.set(Math.sin(d.userData.i * 2) * .4 * q, 3.9 + q * 1.4 - q * q * 1.6, .9 + q * .6); });
      },
    },
    {
      say: 'Sneezing? A total disaster.',
      show: ['ground', 'room', 'pp', 'office', 'papers'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [-1, 3, 8], look: [.6, 2.6, 0], fov: 50, to: { pos: [-.9, 3, 7.2], look: [.6, 2.6, 0], fov: 48 } },
      shake: (t) => t > 1.1 && t < 1.5 ? .12 : 0,
      update: (w, p, t) => {
        stand(w, -.6, .4, .9); const s = t > 1.1; w.p.head.rotation.x = s ? .1 : -.25 * Math.min(1, t); curl(w.p.trunk, s ? 1.2 : .2, s ? .05 : 0, t);
        w.papers.children.forEach(pp => { const i = pp.userData.i; const q = s ? Math.min(1.6, (t - 1.1) * 1.4) : 0; pp.position.set(1.2 + (i % 3 - 1) * .4 + q * (1.5 + i * .25), 1.6 + q * (1.2 + (i % 4) * .4) - q * q * .5, -.6 + (i % 2) * .3); pp.rotation.set(q * i, q * 2, q * (i % 3)); });
      },
    },
    {
      say: 'Hide and seek? Nobody wins. The trunk always sticks out.',
      show: ['ground', 'tree', 'kd'], sky: '#9ED2F3', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [1.4, 3.3, 5.8], look: [.5, 3.2, 0], fov: 46, to: { pos: [1.3, 3.3, 5.2], look: [.5, 3.2, 0], fov: 44 } },
      update: (w, p, t) => {
        w.tree.position.set(0, 0, 0); w.kd.position.set(-.1, 0, -1.4); w.kd.rotation.set(0, Math.PI / 2, 0); w.kid.head.rotation.set(0, 0, 0);
        curl(w.kid.trunk, -1.35 + .08 * Math.sin(t * 3), .06, t);
      },
    },
    {
      say: 'And elephants? They finally feel normal.',
      show: ['ground', 'room', 'pp', 'ele', 'hearts'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [0, 3.8, 15], look: [-.2, 3.8, 0], fov: 48, to: { pos: [0, 3.8, 14], look: [-.2, 3.8, 0], fov: 46 } },
      update: (w, p, t) => {
        stand(w, 2.4, .6, -.6); curl(w.p.trunk, -.9, .2, t); w.ele.position.set(-2.6, 0, -.6); w.ele.rotation.y = .4; curl(w.eTrunk, -.5, .25, t);
        w.hearts.children.forEach(h => { const q = (t * .7 + h.userData.i / 4) % 1; h.position.set((h.userData.i - 1.5) * .7, 5.6 + q * 1.8, 0); h.scale.setScalar(1 - q * .5); });
      },
    },
    {
      say: 'A trunk: useful, gross, or awesome? Comment below.',
      quiz: { q: 'Would you want a trunk?', options: ['Useful', 'Gross', 'Awesome'], answer: 'Human trunks are made up. Elephants keep theirs.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, 1, 7], look: [0, 4.6, 0], fov: 46, to: { pos: [-.8, 1, 7], look: [0, 4.6, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .25); curl(w.p.trunk, .25, .3, t); },
    },
  ],
};
