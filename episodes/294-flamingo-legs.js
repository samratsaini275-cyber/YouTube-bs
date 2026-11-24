// Narrative 17: "What Would Happen If… (season 7)". Body-upgrade premise (147 trunks 858; 159 long necks).
// A made-up comedy sketch: people do not have flamingo legs. Hook: the premise as a question under 2 s; first frame shows a person on two long pink stilt-like legs, balancing on one.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 4, 0], p.root);
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.body, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.body); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.body); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  const pink = mat('#FF8FB0');
  p.legs = [-1, 1].map(s => { const hip = group([s * .4, 4, 0], p.root); const up = cyl(.1, .1, 2, pink, [0, -1, 0], hip, 8); const knee = group([0, -2, 0], hip); ball(.16, pink, [0, 0, 0], knee); cyl(.09, .09, 2, pink, [0, -1, 0], knee, 8); const foot = box(.3, .08, .7, pink, [0, -2, .25], knee); hip.userData = { s, knee }; return hip; });
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
// one-leg: lift leg i (0/1), knee bends backward
const legs = (p, liftL = 0, liftR = 0) => p.legs.forEach((h, i) => { const l = i ? liftR : liftL; h.rotation.x = -l * .5; h.userData.knee.rotation.x = l * 2.4; });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.ground = k.ground('#7FB069', .005);
  w.wall = group(); box(40, 24, .5, mat('#FBE8EE'), [0, 12, -5], w.wall);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.crowd = group(); w.cr = []; for (let i = 0; i < 5; i++) { const q = person(k, w.crowd, ['#E2453C', '#FFC21F', '#5FBF5F', '#FF7F2A', '#8E44AD'][i]); q.body.position.y = 0; q.legs.forEach(l => l.visible = false); q.root.position.set(-4 + i * 2, 0, -1.2 - (i % 2) * .6); q.root.rotation.y = Math.PI; w.cr.push(q); }
  w.stage = group(); box(8, 1, 2, mat('#5A3C22'), [0, .5, -6], w.stage); box(6, 3, .2, mat('#E2453C'), [0, 3, -6.8], w.stage);
  w.door = group(); box(.5, 5, 1, mat('#8B5A2B'), [-1.6, 2.5, 0], w.door); box(.5, 5, 1, mat('#8B5A2B'), [1.6, 2.5, 0], w.door); box(3.7, .5, 1, mat('#8B5A2B'), [0, 5.2, 0], w.door); box(12, 15, .6, mat('#E6D3B8'), [-8.1, 7.5, 0], w.door); box(12, 15, .6, mat('#E6D3B8'), [8.1, 7.5, 0], w.door); box(3.7, 10, .6, mat('#E6D3B8'), [0, 10.4, 0], w.door);
  w.flock = group(); w.fl = []; for (let i = 0; i < 3; i++) { const f = group([0, 0, 0], w.flock); const fm = mat('#FF8FB0'); const fb = ball(.7, fm, [0, 4.2, 0], f); fb.scale.set(1.3, .8, .8); cyl(.06, .06, 3.6, fm, [0, 2.1, 0], f, 6); const nk = cyl(.08, .08, 1.6, fm, [.7, 5, 0], f, 6); nk.rotation.z = -.3; ball(.25, fm, [.9, 5.8, 0], f); const bk = cone(.08, .3, mat('#222222'), [1.15, 5.7, 0], f, 6); bk.rotation.z = -2; w.fl.push(f); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.body.rotation.set(0, 0, 0); };

export default {
  id: '294',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FLAMINGO LEGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD FLAMINGO LEGS?'],
  title: 'What would happen if humans had flamingo legs?',
  description: 'Standing on one leg becomes normal. Concerts? You see everything. Doorways become a problem. And flamingos finally let you in the group. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'flamingo', 'legs', 'comedy', 'shorts'],
  sources: ['Comedy sketch: flamingo legs on people are made up. Quiz fact: the bend in a flamingo\'s leg that looks like a backward knee is actually its ankle (San Diego Zoo Wildlife Alliance).'],
  setup,
  scenes: [
    { say: 'What if humans had flamingo legs?', show: ['floor', 'wall', 'pp'], sky: '#FBE8EE', lightAt: [0, 9, 6], lightDist: 20,
      cam: { pos: [0, 6, 17], look: [0, 8.6, 0], fov: 60, to: { pos: [0, 6, 16.3], look: [0, 8.6, 0], fov: 58 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .6 + .2 * Math.sin(t * 3)); legs(w.p, 0, Math.min(1, t * .9)); w.p.body.rotation.z = .05 * Math.sin(t * 3); } },
    { say: 'Standing on one leg? Totally normal.', show: ['floor', 'wall', 'pp'], sky: '#FBE8EE', lightAt: [0, 9, 6], lightDist: 20,
      cam: { pos: [4, 4, 12], look: [0, 4, 0], fov: 56, to: { pos: [3.7, 4, 11.4], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { stand(w, 0, 0, .5); pose(w.p, .2); legs(w.p, 1, 0); w.p.head.rotation.y = -.3; w.p.eyes.forEach(e => e.scale.set(1, .5, 1)); } },
    { say: 'Concerts? Front row view from the back.', show: ['floor', 'wall', 'pp', 'crowd', 'stage'], sky: '#2B1B4F', lightAt: [0, 9, 6], lightDist: 22,
      cam: { pos: [3, 8, 10], look: [0, 4.4, -2], fov: 58, to: { pos: [2.8, 8, 9.4], look: [0, 4.4, -2], fov: 56 } },
      update: (w, p, t) => { stand(w, 0, 2, Math.PI); pose(w.p, 2.4 + .3 * Math.sin(t * 8)); legs(w.p, 0, 0); w.cr.forEach((q, i) => q.root.position.y = .15 * Math.max(0, Math.sin(t * 8 + i))); } },
    { say: 'Doorways? A big problem.', label: '*BONK*', show: ['floor', 'pp', 'door'], sky: '#FBE8EE', lightAt: [0, 9, 8], lightDist: 20, shake: (t) => (t % 1.2) > .4 && (t % 1.2) < .55 ? .15 : 0,
      cam: { pos: [3, 5, 11], look: [0, 4.8, 0], fov: 56, to: { pos: [2.8, 5, 10.4], look: [0, 4.8, 0], fov: 54 } },
      update: (w, p, t) => { const c = t % 1.2; stand(w, 0, 1.6 - Math.min(c, .4) * 2, 0); pose(w.p, .3); legs(w.p, 0, 0); w.p.body.rotation.x = c > .4 && c < .8 ? -.3 : 0; w.p.mouth.scale.set(1, c > .4 ? 2.4 : 1, 1); } },
    { say: 'And flamingos? You finally fit in.', show: ['ground', 'pp', 'flock'], sky: '#FFC27A', lightAt: [4, 10, 8], lightDist: 24,
      cam: { pos: [0, 5.6, 15], look: [0, 4.8, 0], fov: 56, to: { pos: [0, 5.6, 14.2], look: [0, 4.8, 0], fov: 54 } },
      update: (w, p, t) => { w.p.body.rotation.x = 0; stand(w, -2.4, 0, .5); pose(w.p, .2); legs(w.p, 0, 1); w.fl.forEach((f, i) => { f.position.set(-.2 + i * 2, 0, -.6 - (i % 2) * .6); f.rotation.y = Math.PI - .3; }); } },
    { say: 'Flamingo legs: useful, awesome, or way too wobbly? Comment below.',
      quiz: { q: 'Would you want flamingo legs?', options: ['Useful', 'Awesome', 'Way too wobbly'], answer: 'Made up. A flamingo\'s "backward knee" is really its ankle.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 9, 6], lightDist: 20,
      cam: { pos: [1, 2, 14], look: [0, 6, 0], fov: 56, to: { pos: [-1, 2, 14], look: [0, 6, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .3); legs(w.p, 0, Math.sin(t * 2) > 0 ? 1 : 0); } },
  ],
};
