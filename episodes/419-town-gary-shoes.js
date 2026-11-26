// Narrative 23: "In This Town… (season 2: things that talk back)". Gary slot: shoes talk; a big sneaker steps around Gary, then Gary buys six.
// Hook: the rule under 2 s; first frame shows a giant sneaker with a face hovering politely over Gary.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

function face(k, parent, pos, s = 1) {
  const { mat, ball, box, group } = k;
  const f = group(pos, parent); f.scale.setScalar(s);
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], f); ball(.12, mat('#111111'), [x, .2, .17], f); }
  f.brows = [-.45, .45].map(x => box(.36, .06, .05, mat('#111111'), [x, .55, .03], f));
  f.mouth = box(.55, .1, .05, mat('#5A1E1E'), [0, -.32, .02], f);
  return f;
}
const talk = (f, t, on = true) => f.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1;
const brow = (f, a) => f.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a);


function shoe(k, parent, col) {
  const { mat, box, ball, group } = k;
  const g = group([0, 0, 0], parent); box(2.6, .3, 1.1, mat('#FFFFFF'), [0, .15, 0], g); const up = ball(.75, mat(col), [-.3, .6, 0], g); up.scale.set(1.7, .8, .75); ball(.45, mat(col), [.9, .45, 0], g).scale.set(1, .7, 1.1);
  for (let i = 0; i < 3; i++) box(.05, .05, .7, mat('#FFFFFF'), [.1 + i * .25, 1, 0], g);
  g.f = face(k, g, [1.05, .5, .52], .4); return g;
}

function setup(k) {
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.ground = k.ground('#C9C2B4', 0);
  w.lines = group(); for (let i = 0; i < 6; i++) box(.1, .02, 6, mat('#B0A898'), [-5 + i * 2, .01, 0], w.lines);
  w.big = shoe(k, k.scene, '#E2453C');
  w.shop = group(); box(9, 5, .3, mat('#F5E6C8'), [0, 2.5, -2.2], w.shop); for (let i = 0; i < 2; i++) box(7, .12, 1, mat('#8B5A2B'), [0, 1.4 + i * 1.6, -1.7], w.shop);
  w.minis = []; for (let i = 0; i < 6; i++) w.minis.push(shoe(k, k.scene, ['#3B6FD6', '#F2C94C', '#3FA34D', '#E87A8A', '#7C5CC4', '#FF8A2A'][i]));
  w.g = gary(k, k.scene, 1.3, null);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const sAt = (s, x, y, z, ry, sc) => { s.position.set(x, y, z); s.rotation.set(0, ry, 0); s.scale.setScalar(sc); s.visible = true; };

export default {
  id: '419',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SHOES TALK',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'SHOES TALK'],
  title: 'In this town, shoes can talk (Gary the ant)',
  description: 'A big sneaker? It says watch out. Then it tiptoes around Gary. So Gary buys six shoes, and they never stop chatting. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'ant', 'shoes', 'shorts'],
  sources: ['Comedy sketch: talking shoes are made up. Quiz fact: like all insects, ants have six legs, three pairs attached to the middle section of the body, the thorax (Encyclopaedia Britannica, "insect").'],
  setup,
  scenes: [
    { say: 'In this town, shoes talk.', show: ['ground', 'lines'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.5, .8, 7.5], look: [.4, 1.05, 0], fov: 50, to: { pos: [.5, .8, 7], look: [.4, 1.05, 0], fov: 48 } },
      update: (w, p, t) => { w.shop.visible = false; w.minis.forEach(m => m.visible = false); gy(w, -.5, 0, .8, -.2, t); sAt(w.big, 1.2, .05 + .06 * Math.abs(Math.sin(t * 3)), .2, -.6, .8); talk(w.big.f, t); brow(w.big.f, .3); } },
    { say: 'A big sneaker? It says watch out.', label: 'WATCH OUT!', show: ['ground', 'lines'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 2.2, 8], look: [.4, 1.4, 0], fov: 50, to: { pos: [1, 2.2, 7.5], look: [.4, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { gy(w, -.4, 0, .8, -.2, t, true); const q = Math.min(1, p * 1.4); sAt(w.big, 2.6 - q * 2, 2.4 - q * 1.2, 0, Math.PI * 0 - .3, 1); talk(w.big.f, t); brow(w.big.f, .5); } },
    { say: 'Then it tiptoes around him.', label: 'TIPTOE', show: ['ground', 'lines'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 3.4, 9], look: [0, 1, 0], fov: 52, to: { pos: [0, 3.4, 8.5], look: [0, 1, 0], fov: 50 } },
      update: (w, p, t) => { gy(w, 0, 0, .6, 0, t); w.g.rotation.y = -p * 2; const a = Math.PI * .9 - p * Math.PI * 1.6; sAt(w.big, Math.cos(a) * 2.4, .1 + .25 * Math.abs(Math.sin(t * 6)), .6 + Math.sin(a) * 1.6, -a - Math.PI / 2, .8); w.big.rotation.z = .25; talk(w.big.f, t, false); w.big.f.mouth.scale.set(.6, .6, 1); brow(w.big.f, .2); } },
    { say: 'So Gary buys six. They never stop chatting.', label: 'BLAH BLAH', show: ['ground', 'shop'], sky: '#F5E6C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.5, 4.6], look: [0, .45, 0], fov: 50, to: { pos: [.2, 1.5, 4.2], look: [0, .45, 0], fov: 48 } },
      update: (w, p, t) => { w.lines.visible = false; w.big.visible = false; gy(w, 0, .32, 0, -.3, t, true, 1.3); w.g.updateWorldMatrix(true, true); w.minis.forEach((m, i) => { const leg = w.g.userData.legs[i]; const foot = leg.localToWorld(new w.k.THREE.Vector3(0, -leg.geometry.parameters.height / 2, 0)); sAt(m, foot.x, 0, foot.z, -.3 + (i % 2 ? .2 : -.2), .19); talk(m.f, t + i * .7); brow(m.f, -.2); }); } },
    { say: 'Is Gary a good shoe shopper? Comment below.',
      quiz: { q: 'Is Gary a good shoe shopper?', options: ['Yes', 'No', 'Six is too many'], answer: 'Made up. Fun fact: like all insects, ants have six legs.' },
      show: ['ground'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.2, 1.6, 4.6], look: [0, .7, 0], fov: 50, to: { pos: [-1.2, 1.6, 4.6], look: [0, .7, 0] } },
      update: (w, p, t) => { w.shop.visible = false; gy(w, 0, .25, 0, -.3, t, false, 1.3); w.g.updateWorldMatrix(true, true); w.minis.forEach((m, i) => { const leg = w.g.userData.legs[i]; const foot = leg.localToWorld(new w.k.THREE.Vector3(0, -leg.geometry.parameters.height / 2, 0)); sAt(m, foot.x, 0, foot.z, -.3, .19); talk(m.f, t + i * .7, Math.sin(t * 2 + i) > 0); }); } },
  ],
};
