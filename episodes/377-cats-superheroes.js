// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Cat premise: the two most-viewed shorts are cat shorts (749 and 424).
// Hook: the premise as a question under 2 s; first frame shows a cat in a red cape on a rooftop.

function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
}


function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.city = group(); for (let i = 0; i < 6; i++) { const hgt = 4 + (i * 37 % 5); box(2.6, hgt, 2.6, mat(['#7A8AA8', '#8E9AB8', '#6E7E9C'][i % 3]), [-8 + i * 3.2, hgt / 2, -8], w.city); }
  w.roof = box(6, 4, 4, mat('#B0A090'), [0, 2, 0]);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.cape = box(1.6, .05, 1.6, mat('#D8322E'), [0, 0, 0]);
  w.mask = group(); box(1.5, .32, .12, mat('#222222'), [0, 0, 0], w.mask);
  w.tin = group(); cyl(.5, .5, .5, mat('#C9D1D9', { metal: .6 }), [0, .25, 0], w.tin, 16); cyl(.52, .52, .2, mat('#3E8FCF'), [0, .25, 0], w.tin, 16);
  w.trail = group(); for (let i = 0; i < 8; i++) { const s = ball(.35, mat('#F2A04A'), [0, 0, 0], w.trail); s.userData.i = i; s.material.transparent = true; s.material.opacity = .5 - i * .05; s.castShadow = false; }
  w.dot = ball(.15, mat('#FF2020', { glow: 1 }), [0, 0, 0]);
  w.beams = group(); for (const z of [-1, 1]) { const b = cyl(.06, .06, 1, mat('#FF3030', { glow: 1 }), [0, 0, 0], w.beams, 6); b.userData.z = z; }
  w.siren = group(); box(3, 1.4, 1.6, mat('#FFFFFF'), [0, 1, 0], w.siren); w.light = ball(.3, mat('#3E8FCF', { glow: 1 }), [0, 1.9, 0], w.siren);
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.15, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const capeOn = (w, t, flutter = 1) => { w.cr.updateWorldMatrix(true, true); const b = w.c.body.localToWorld(new w.k.THREE.Vector3(-.3, 1.55, 0)); w.cape.position.copy(b); w.cape.rotation.set(0, w.cr.rotation.y, .4 + .25 * flutter * Math.sin(t * 8)); w.cape.scale.set(w.cr.scale.x * 1.4, 1, w.cr.scale.x * 1.1); const m = w.c.head.localToWorld(new w.k.THREE.Vector3(1.22, .38, 0)); w.mask.position.copy(m); w.mask.rotation.set(0, w.cr.rotation.y + Math.PI / 2, 0); w.mask.scale.setScalar(w.cr.scale.x); };

export default {
  id: '377',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SUPER CATS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'WERE SUPERHEROES?'],
  title: 'What would happen if cats were superheroes?',
  description: 'Super speed? Only when you open a tin. Laser eyes? Used on the red dot. And saving the day? They nap through it. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cat', 'cats', 'superhero', 'shorts'],
  sources: ['Comedy sketch: superhero cats are made up. Quiz fact: falling cats twist their bodies in mid-air to land on their feet, the "righting reflex"; it was first photographed by Étienne-Jules Marey and published in Nature in 1894 ("Photographs of a tumbling cat", Nature 51, 1894).'],
  setup,
  scenes: [
    { say: 'What if cats were superheroes?', show: ['ground', 'city', 'roof', 'cr', 'cape', 'mask'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4.6, 12], look: [0, 6.3, 0], fov: 50, to: { pos: [2, 4.6, 11.3], look: [0, 6.3, 0], fov: 48 } },
      update: (w, p, t) => { ctAt(w, -.4, 4, 0, -1.2, .8); w.c.head.rotation.z = .1; capeOn(w, t); } },
    { say: 'Super speed? Only when you open a tin.', label: 'ZOOOOM', show: ['ground', 'cr', 'cape', 'mask', 'tin', 'trail'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3, 12], look: [0, 1.4, 0], fov: 52, to: { pos: [2, 3, 11.5], look: [0, 1.4, 0], fov: 50 } },
      update: (w, p, t) => { w.tin.position.set(3, 0, 0); const q = Math.min(1, Math.max(0, (p - .35) * 4)); const x = -6 + q * 8; ctAt(w, x, 0, 0, 0, .6); capeOn(w, t, 2); w.trail.children.forEach(s => { const i = s.userData.i; s.position.set(x - .8 - i * .7, .8, 0); s.visible = q > 0 && q < 1; }); } },
    { say: 'Laser eyes? Used on the red dot.', label: 'PEW PEW', show: ['ground', 'roof', 'cr', 'cape', 'mask', 'dot', 'beams'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 11], look: [1, 3.6, 0], fov: 52, to: { pos: [3, 6, 10.5], look: [1, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { ctAt(w, -1.4, 4, 0, -.6, .7); capeOn(w, t); const d = new w.k.THREE.Vector3(1.8 + Math.sin(t * 3) * 1.2, 4.03, 1 + Math.cos(t * 2.3) * .8); w.dot.position.copy(d); w.cr.updateWorldMatrix(true, true); w.beams.children.forEach(b => { const e = w.c.head.localToWorld(new w.k.THREE.Vector3(1.05, .35, b.userData.z * .5)); const mid = e.clone().add(d).multiplyScalar(.5); b.position.copy(mid); b.scale.y = e.distanceTo(d); b.quaternion.setFromUnitVectors(new w.k.THREE.Vector3(0, 1, 0), d.clone().sub(e).normalize()); b.visible = Math.sin(t * 10) > -.3; }); } },
    { say: 'And saving the day? They nap through it.', label: 'WEE-OO WEE-OO', show: ['ground', 'city', 'roof', 'cr', 'cape', 'mask', 'siren', 'zzz'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 13], look: [0, 3.6, 0], fov: 52, to: { pos: [3, 6, 12.5], look: [0, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { ctAt(w, -.2, 4, 0, -1.2, .7); w.c.eyes.forEach(e => e.scale.y = .15); w.c.head.rotation.z = -.35; w.c.body.scale.set(1.4, 1 + .04 * Math.sin(t * 2), 1); capeOn(w, t, .2); w.siren.position.set(4.6, 0, 3); w.light.material.color.set(Math.sin(t * 10) > 0 ? '#3E8FCF' : '#E2453C'); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(.5 + q * .6, 5.6 + q * 1.4, .4); z.scale.setScalar(.6 + q * 1.2); }); } },
    { say: 'Super cats: cool, cute, or way too lazy? Comment below.',
      quiz: { q: 'Super cats are…', options: ['Cool', 'Cute', 'Way too lazy'], answer: 'Made up. But real cats can twist in mid-air to land on their feet.' },
      show: ['ground', 'cr', 'cape', 'mask'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { ctAt(w, -.6, 0, 0, -.6, .8); w.c.head.rotation.z = .08 * Math.sin(t * 2); capeOn(w, t); } },
  ],
};
