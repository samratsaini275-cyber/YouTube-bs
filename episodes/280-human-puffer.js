// Narrative 16: "What Would Happen If… (season 6)". Body-upgrade premise (147 trunks 855).
// A made-up comedy sketch: people cannot puff up. Hook: the premise as a question under 2 s; first frame shows a person inflating into a ball.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box, cone } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  p.torso = cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.body, 14);
  p.belly = ball(1, mat(shirt), [0, 1.6, 0], p.body); p.belly.visible = false;
  p.spikes = group([0, 1.6, 0], p.body); for (let i = 0; i < 26; i++) { const phi = Math.acos(1 - 2 * (i + .5) / 26), th = Math.PI * (1 + Math.sqrt(5)) * i; const d = new k.THREE.Vector3(Math.sin(phi) * Math.cos(th), Math.cos(phi), Math.sin(phi) * Math.sin(th)); const s = cone(.08, .3, mat('#F5E3B0'), [0, 0, 0], p.spikes, 6); s.position.copy(d); s.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), d); } p.spikes.visible = false;
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.body); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.body); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
// inflate 0..1: torso hidden into a sphere of radius 1..2.2, head pushed up, arms out
const puff = (p, a) => { const r = 1 + a * 1.2; p.belly.visible = a > .05; p.torso.visible = a <= .05; p.belly.scale.setScalar(r); p.belly.position.y = 1.6 + a * .6; p.spikes.visible = a > .6; p.spikes.position.y = p.belly.position.y; p.spikes.scale.setScalar(r * 1.02); p.head.position.y = 3.3 + a * 1.6; p.arms.forEach(m => { m.position.set(m.userData.s * (.95 + a * 1.2), 2.4 + a * .6, 0); m.rotation.set(0, 0, m.userData.s * (.2 + a * 1.2)); }); p.eyes.forEach(e => e.scale.setScalar(1 + a * .5)); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.ground = k.ground('#7FB069', .005);
  w.wall = group(); box(40, 20, .5, mat('#E0EEF2'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#FF7F2A'); w.pp = w.p.root;
  w.spider = group(); const sm = mat('#222222'); ball(.3, sm, [0, 0, 0], w.spider); for (let i = 0; i < 8; i++) { const l = cyl(.03, .03, .6, sm, [0, 0, 0], w.spider, 4); const a = (i % 4) / 4 * Math.PI - Math.PI / 2 + .3; const sd = i < 4 ? -1 : 1; l.position.set(sd * .3, -.1, Math.sin(a) * .2); l.rotation.set(0, 0, sd * 1.1); } for (const s of [-1, 1]) ball(.06, mat('#E2453C', { glow: .6 }), [s * .1, .1, .27], w.spider);
  w.door = group(); box(4, 6, .4, mat('#9AA4AE'), [-3.2, 3, 0], w.door); box(4, 6, .4, mat('#9AA4AE'), [3.2, 3, 0], w.door); box(10.4, 2, .4, mat('#9AA4AE'), [0, 7, 0], w.door);
  w.friends = group(); w.fr = []; for (let i = 0; i < 2; i++) { const q = person(k, w.friends, ['#3B6FD6', '#5FBF5F'][i]); w.fr.push(q); }
  w.pool = group(); const wtr = cyl(6, 6, .3, mat('#4AA3DF', { opacity: .8 }), [0, .15, 0], w.pool, 40); wtr.scale.z = .6;
  w.wind = group(); for (let i = 0; i < 5; i++) { const l = box(1.4, .06, .06, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.wind); l.userData.i = i; l.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '280',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HUMAN PUFFERFISH',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'COULD PUFF UP?'],
  title: 'What would happen if humans could puff up like pufferfish?',
  description: 'One spider and boom, you are a ball. Doorways become a problem. Swimming? You just float. And a windy day takes you home. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'pufferfish', 'ocean', 'comedy', 'shorts'],
  sources: ['Comedy sketch: people cannot puff up. Quiz fact: pufferfish inflate by quickly gulping water into a stretchy stomach (NOAA Fisheries).'],
  setup,
  scenes: [
    { say: 'What if humans could puff up?', show: ['floor', 'wall', 'pp'], sky: '#E0EEF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 4.2, 12], look: [0, 5.5, 0], fov: 54, to: { pos: [0, 4.2, 11.2], look: [0, 5.5, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); puff(w.p, Math.min(1, Math.max(0, (t - .3) * 1.4))); w.p.mouth.scale.set(.5, .5, 1); } },
    { say: 'One spider? Boom. Ball.', label: '*POOF*', show: ['floor', 'wall', 'pp', 'spider'], sky: '#E0EEF2', lightAt: [0, 6, 5], lightDist: 14, shake: (t) => t > .9 && t < 1.2 ? .25 : 0,
      cam: { pos: [1.4, 3.6, 11], look: [.4, 3.8, 0], fov: 52, to: { pos: [1.3, 3.6, 10.3], look: [.4, 3.8, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, -.6, 0, .3); const a = t > .9 ? Math.min(1, (t - .9) * 5) : 0; puff(w.p, a); w.p.mouth.scale.set(1, a > 0 ? 2.4 : 1, 1); w.spider.position.set(2.4, 2 + .1 * Math.sin(t * 6), .6); w.spider.rotation.y = -.6; } },
    { say: 'Doorways? A big problem.', show: ['floor', 'pp', 'door', 'friends'], sky: '#E0EEF2', lightAt: [0, 6, 8], lightDist: 16,
      cam: { pos: [0, 4, 12], look: [0, 3.8, 0], fov: 54, to: { pos: [0, 4, 11.3], look: [0, 3.8, 0], fov: 52 } },
      update: (w, p, t) => { w.door.position.set(0, 0, -.2); stand(w, 0, .3 + .08 * Math.sin(t * 8), 0); puff(w.p, 1); w.p.mouth.scale.set(1, .6, 1); w.fr.forEach((q, i) => { q.root.position.set(i ? 2.2 : -2.2, 0, -3); q.root.rotation.y = Math.PI; puff(q, 0); }); } },
    { say: 'Swimming? You just float.', show: ['ground', 'pp', 'pool'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 5, 13], look: [0, 3, 0], fov: 52, to: { pos: [0, 5, 12.3], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { w.pool.position.set(0, 0, 0); stand(w, 0, 0, .2); puff(w.p, 1); w.pp.position.y = -1.2 + .2 * Math.sin(t * 2); w.pp.rotation.z = .15 * Math.sin(t * 1.3); w.p.mouth.scale.set(1.3, 1.6, 1); } },
    { say: 'And a windy day? Next stop: home.', show: ['ground', 'pp', 'wind'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 4, 13], look: [0, 4, 0], fov: 54, to: { pos: [0, 4, 12.3], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { puff(w.p, 1); const x = -2 + p * 4; w.pp.position.set(x, Math.abs(Math.sin(t * 5)) * 1.4, 0); w.pp.rotation.set(0, 0, -.35 * Math.sin(t * 5)); w.p.mouth.scale.set(1.2, 2.4, 1); w.wind.children.forEach(l => { const i = l.userData.i, q = (t * 1.6 + i / 5) % 1; l.position.set(-5 + q * 10, 2 + i * 1.2, 1); }); } },
    { say: 'Puffing up: useful, awesome, or way too round? Comment below.',
      quiz: { q: 'Would you want to puff up?', options: ['Useful', 'Awesome', 'Way too round'], answer: 'Made up for people. Pufferfish gulp water to inflate.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 10], look: [0, 4.8, 0], fov: 50, to: { pos: [-1, 1, 10], look: [0, 4.8, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); w.pp.rotation.z = 0; puff(w.p, .5 + .5 * Math.sin(t * 2)); w.p.mouth.scale.set(1, 1, 1); } },
  ],
};
