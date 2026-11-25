// Narrative 19: "What Would Happen If… (season 9)". Body-upgrade premise (147 trunks 868).
// A made-up comedy sketch: people cannot make electricity. Hook: the premise as a question under 2 s; first frame shows a person crackling with little yellow sparks.

function person(k, parent, shirt, whisk = false) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  ball(.1, mat('#E86A8A'), [0, -.02, .76], p.head);
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  if (false) { p.wh = []; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const g = group([s * .3, -.08, .7], p.head); const c = cyl(.018, .018, 1.8, mat('#FFFFFF', { glow: .2 }), [s * .9, 0, 0], g, 5); c.rotation.z = Math.PI / 2; g.rotation.z = s * (i - 1) * .18; g.userData = { s, i }; p.wh.push(g); } }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 20, .5, mat('#E0E8F5'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#2E5FB0'); w.pp = w.p.root;
  w.f = person(k, k.scene, '#3FA34D'); w.fr = w.f.root;
  w.bolts = group(); for (let i = 0; i < 10; i++) { const b = box(.12, .7, .12, mat('#FFE45C', { glow: 1.2 }), [0, 0, 0], w.bolts); b.userData.i = i; b.castShadow = false; }
  w.phone = group(); box(.5, .9, .08, mat('#222222'), [0, 0, 0], w.phone); w.screen = box(.42, .8, .02, mat('#3FA34D', { glow: .8 }), [0, 0, .05], w.phone); w.bar = box(.3, .1, .03, mat('#FFFFFF', { glow: .9 }), [0, -.25, .06], w.phone);
  w.hair = group([0, .7, 0], w.p.head); w.spikes = []; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const s = cone(.1, .6, mat('#3A2A1A'), [Math.cos(a) * .4, .25, Math.sin(a) * .4], w.hair, 6); s.rotation.set(Math.sin(a) * .5, 0, -Math.cos(a) * .5); w.spikes.push(s); } w.hair.visible = false;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.p.eyes.forEach(e => e.scale.setScalar(1)); };
const spark = (w, cx, cy, cz, r, t, on = true) => w.bolts.children.forEach(b => { const i = b.userData.i, a = i / 10 * Math.PI * 2 + t * 3, flick = Math.sin(t * 40 + i * 7) > 0; b.position.set(cx + Math.cos(a) * r, cy + Math.sin(a * 1.7) * r * .9, cz + Math.sin(a) * r * .5); b.rotation.set(0, 0, a + (flick ? .6 : -.6)); b.visible = on && flick; });

export default {
  id: '341',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ELECTRIC EEL',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'WERE ELECTRIC?'],
  title: 'What would happen if humans were electric like eels?',
  description: 'Phone battery low? Charge it with one finger. High fives? ZAP. And your hair? Stuck straight up forever. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'electric', 'eel', 'comedy', 'shorts'],
  sources: ['Comedy sketch: electric people are made up. Quiz fact: a species of electric eel, Electrophorus voltai, can discharge up to about 860 volts, the strongest electric shock of any known animal (de Santana et al., Nature Communications, 2019).'],
  setup,
  scenes: [
    { say: 'What if humans were electric?', show: ['floor', 'wall', 'pp', 'bolts'], sky: '#E0E8F5', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 11], look: [0, 4.8, 0], fov: 50, to: { pos: [0, 3.4, 10.3], look: [0, 4.8, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .6); spark(w, 0, 3.4, .3, 1.7, t); w.p.eyes.forEach(e => e.scale.setScalar(1.3)); w.p.mouth.scale.set(1.3, 1.8, 1); w.pp.position.x = .04 * Math.sin(t * 40); } },
    { say: 'Phone battery low? Charge it with one finger.', label: 'BZZT', show: ['floor', 'wall', 'pp', 'phone', 'bolts'], sky: '#E0E8F5', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.6, 3.6, 7.5], look: [0, 3, 0], fov: 50, to: { pos: [1.4, 3.6, 6.9], look: [0, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.pp.position.x = 0; stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(-1.2, 0, -.4); w.phone.position.set(.2, 2.7, 1.8); const q = Math.min(1, p * 1.4); w.bar.scale.x = .3 + q * 2.4; w.bar.position.x = -.12 + q * .12; w.screen.material.color.setHSL(.33 * q, .7, .45); spark(w, .6, 2.7, 1.7, .4, t, p < .9); } },
    { say: 'High fives? ZAP.', label: '*ZAP!*', show: ['floor', 'wall', 'pp', 'fr', 'bolts'], sky: '#E0E8F5', lightAt: [0, 6, 5], lightDist: 14, shake: (t) => t > .7 && t < 1 ? .2 : 0,
      cam: { pos: [0, 3.6, 10], look: [0, 3.4, 0], fov: 50, to: { pos: [0, 3.6, 9.3], look: [0, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -1.1, 0, .9); w.fr.position.set(1.1, 0, 0); w.fr.rotation.set(0, -.9, 0); const hit = t > .7; w.p.arms[1].rotation.set(0, 0, 2.6); w.f.arms[0].rotation.set(0, 0, -2.6); w.f.eyes.forEach(e => e.scale.setScalar(hit ? 1.7 : 1)); w.f.mouth.scale.set(1.3, hit ? 3 : 1, 1); w.fr.position.y = hit ? .5 * Math.abs(Math.sin((t - .7) * 12)) : 0; w.f.root.children[0].material && 0; spark(w, 0, 4.7, .2, .8, t, hit); } },
    { say: 'And your hair? Stuck straight up forever.', label: 'FZZZT', show: ['floor', 'wall', 'pp', 'bolts'], sky: '#E0E8F5', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 8], look: [0, 4.2, 0], fov: 48, to: { pos: [0, 3.6, 7.4], look: [0, 4.2, 0], fov: 46 } },
      update: (w, p, t) => { w.fr.position.y = 0; stand(w, 0, 0, 0); pose(w.p, .3); w.hair.visible = true; w.spikes.forEach((s, i) => s.scale.y = .6 + .5 * Math.min(1, p * 2) + .08 * Math.sin(t * 30 + i)); w.p.eyes.forEach(e => e.scale.set(1, .6, 1)); spark(w, 0, 4.8, 0, .9, t); } },
    { say: 'Electric humans: useful, cool, or way too shocking? Comment below.',
      quiz: { q: 'Would you want to be electric?', options: ['Useful', 'Cool', 'Way too shocking'], answer: 'Made up for people. One real electric eel can make about 860 volts.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.hair.visible = true; stand(w, 0, 0, .2); pose(w.p, .3); } },
  ],
};
