// Narrative 16: "What Would Happen If… (season 6)". Body-upgrade premise (147 trunks 855).
// A made-up comedy sketch: people do not have frog tongues. Hook: the premise as a question under 2 s; first frame shows a person's tongue shooting out.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .14, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  p.tongue = group([0, -.3, .7], p.head); p.tbar = k.cyl(.1, .1, 1, mat('#FF6F91'), [0, 0, .5], p.tongue, 10); p.tbar.rotation.x = Math.PI / 2; p.tip = ball(.18, mat('#FF6F91'), [0, 0, 1], p.tongue);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
// tongue length L along local +z, aimed with yaw/pitch
const lick = (p, L, yaw = 0, pitch = 0) => { p.tongue.visible = L > .05; p.tongue.rotation.set(pitch, yaw, 0); p.tbar.scale.y = Math.max(.01, L); p.tbar.position.z = L / 2; p.tip.position.z = L; };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#E3F0E0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#E2453C'); w.pp = w.p.root;
  w.table = group(); box(5, .2, 2, mat('#8B5A2B'), [0, 2, 0], w.table); for (const [x, z] of [[-2.2, -.8], [2.2, -.8], [-2.2, .8], [2.2, .8]]) box(.15, 2, .15, mat('#6B4B2E'), [x, 1, z], w.table);
  w.snack = group(); cyl(.3, .3, .3, mat('#FFC21F'), [0, .15, 0], w.snack, 16); w.snack2 = group(); ball(.25, mat('#E2453C'), [0, .25, 0], w.snack2);
  w.fly = group(); ball(.12, mat('#2A2A2A'), [0, 0, 0], w.fly); for (const z of [-1, 1]) { const wg = ball(.1, mat('#DDEEFF', { opacity: .6 }), [0, .08, z * .12], w.fly); wg.scale.set(1, .2, .7); wg.userData.z = z; }
  w.cone = group(); const cc = cone(.3, .9, mat('#D9A35B'), [0, -.45, 0], w.cone, 12); cc.rotation.x = Math.PI; ball(.33, mat('#FFB6C8'), [0, .1, 0], w.cone);
  w.kid = person(k, k.scene, '#3B6FD6'); w.kk = w.kid.root; w.kid.tongue.visible = false;
  w.remote = box(.3, .1, .8, mat('#222222'), [0, 0, 0], k.scene);
  w.stand = box(.8, 3.1, .8, mat('#8B5A2B'), [0, 1.55, 0], k.scene); w.sofa = group(); box(4, 1, 1.8, mat('#6C4BB4'), [0, .5, 0], w.sofa); box(4, 1.4, .4, mat('#5A3C9C'), [0, 1.4, -.7], w.sofa);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const shoot = (t, per = 1.2) => { const c = t % per; return c < .25 ? c / .25 : c < .5 ? 1 : Math.max(0, 1 - (c - .5) / .25); };

export default {
  id: '272',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FROG TONGUES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD FROG TONGUES?'],
  title: 'What would happen if humans had frog tongues?',
  description: 'Snacks from across the table. The TV remote without getting up. Flies do not stand a chance. And ice cream? Stolen from ten feet away. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'frog', 'tongue', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human frog tongues are made up. Quiz fact: a frog\'s tongue can shoot out and grab prey in less than a tenth of a second (Noel et al., Journal of the Royal Society Interface, 2017).'],
  setup,
  scenes: [
    { say: 'What if humans had frog tongues?', show: ['floor', 'wall', 'pp', 'fly'], sky: '#E3F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.4, 3.4, 10], look: [.4, 3.95, 0], fov: 52, to: { pos: [.4, 3.4, 9.4], look: [.4, 3.95, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -1.1, 0, .25); pose(w.p, .2); const s = shoot(t + .3, 1.4); lick(w.p, s * 3.4, 1.3, 0); w.p.eyes.forEach(e => e.scale.setScalar(1 + s * .3)); w.fly.position.set(-1.1 + Math.sin(1.55) * 4.1, 3, .7 + Math.cos(1.55) * 4.1); w.fly.visible = ((t + .3) % 1.4) < .35; } },
    { say: 'Snacks? Grab them from across the table.', show: ['floor', 'wall', 'pp', 'table', 'snack'], sky: '#E3F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [-.6, 5, 10.5], look: [-.6, 3, 0], fov: 54, to: { pos: [-.6, 5, 9.9], look: [-.6, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.table.position.set(0, 0, 0); stand(w, -2.9, 0, Math.PI / 2); w.pp.position.y = -.2; pose(w.p, .2); const s = shoot(t, 1.6); lick(w.p, s * 4.6, 0, .15); const back = (t % 1.6) > .5; w.snack.position.set(back ? 2 - Math.min(1, ((t % 1.6) - .5) / .25) * 4.4 : 2, 2.1 + (back ? .9 : 0), 0); } },
    { say: 'The remote? Never get up again.', show: ['floor', 'wall', 'pp', 'sofa', 'remote', 'stand'], sky: '#E3F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2, 4, 10], look: [.6, 2.6, 0], fov: 52, to: { pos: [1.9, 4, 9.4], look: [.6, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { w.sofa.position.set(-1.6, 0, -1.6); stand(w, -1.6, -1.3, 0); w.pp.position.y = .2; pose(w.p, .4, .4); w.p.eyes.forEach(e => e.scale.set(1, .5, 1)); const s = shoot(t, 2); lick(w.p, s * 3.6, Math.PI / 2, 0); const back = (t % 2) > .5; const tx = -1.6 + 3.6, q = back ? Math.min(1, ((t % 2) - .5) / .25) : 0; w.stand.position.set(tx, 1.55, -1.3); w.remote.position.set(tx - q * 3.6, 3.15, -1.3 + .7); w.remote.rotation.y = Math.PI / 2; } },
    { say: 'Ice cream? Stolen from ten feet away.', label: '*SLURP*', show: ['ground', 'pp', 'kk', 'cone'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 4, 12], look: [0, 3.2, 0], fov: 54, to: { pos: [0, 4, 11.3], look: [0, 3.2, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, -2.8, 0, Math.PI / 2); pose(w.p, .2); w.kk.position.set(2.6, 0, 0); w.kk.rotation.set(0, -Math.PI / 2, 0); pose(w.kid, .2); w.kid.arms[0].rotation.set(-1.3, 0, -.2); w.cone.position.set(1.95, 3.1, 1.25); const s = p > .3 ? shoot((p - .3) * 6, 1.6) : 0; lick(w.p, s * 4.7, 0, 0); const gone = p > .45; w.cone.children[1].visible = !gone; w.kid.mouth.scale.set(1, gone ? 3 : 1, 1); w.kid.eyes.forEach(e => e.scale.setScalar(gone ? 1.5 : 1)); } },
    { say: 'And flies? They do not stand a chance.', show: ['ground', 'pp', 'fly'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 4, 10], look: [0, 3.8, 0], fov: 52, to: { pos: [0, 4, 9.3], look: [0, 3.8, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); const c = t % 1.5, a = Math.floor(t / 1.5) * 2.1; const yaw = Math.sin(a) * .9, pitch = -.3 + Math.cos(a) * .2; const s = shoot(t, 1.5); lick(w.p, s * 2.8, yaw, pitch); w.fly.visible = c < .3; w.fly.position.set(Math.sin(yaw) * 2.8 * .95, 3 + Math.sin(-pitch) * 2.8, .7 + Math.cos(yaw) * 2.8 * .9); w.fly.children.forEach(ch => { if (ch.userData.z) ch.rotation.x = ch.userData.z * .8 * Math.sin(t * 50); }); } },
    { say: 'Frog tongues: useful, awesome, or way too gross? Comment below.',
      quiz: { q: 'Would you want a frog tongue?', options: ['Useful', 'Awesome', 'Way too gross'], answer: 'Made up for people. Real frog tongues strike in under a tenth of a second.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .2); lick(w.p, shoot(t, 1.8) * 1.4, 0, .3); } },
  ],
};
