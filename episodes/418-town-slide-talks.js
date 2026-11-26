// Narrative 23: "In This Town… (season 2: things that talk back)". Object rule: a playground slide with opinions.
// Hook: the rule under 2 s; first frame shows a slide with a face on its sign and a kid at the top.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

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


function setup(k) {
  const { mat, box, cyl, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.sand = cyl(4, 4, .05, mat('#E8D7A8'), [0, .03, 0], undefined, 28);
  w.slide = group(); box(1.6, .2, 1.6, mat('#3B6FD6'), [-1.8, 3, 0], w.slide); for (const x of [-2.5, -1.1]) for (const z of [-.7, .7]) cyl(.08, .08, 3, mat('#888888'), [x, 1.5, z], w.slide, 6); for (let i = 0; i < 5; i++) box(.1, .08, 1.4, mat('#888888'), [-2.5, .5 + i * .55, 0], w.slide);
  w.chute = box(4.2, .15, 1.4, mat('#F2C94C'), [.6, 1.55, 0], w.slide); w.chute.rotation.z = -.62; for (const z of [-.72, .72]) { const r = box(4.2, .4, .1, mat('#E2B83A'), [.6, 1.75, z], w.slide); r.rotation.z = -.62; }
  box(1.6, 1.1, .1, mat('#FFFFFF'), [-1.8, 4.1, .72], w.slide); w.sf = face(k, w.slide, [-1.8, 4.1, .8], .7);
  w.kid = person(k, k.scene, '#E2453C');
  w.spikes = group(); for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; const s = cone(.12, .7, mat('#3A2A1A'), [Math.cos(a) * .45, .55, Math.sin(a) * .45], w.spikes, 5); s.rotation.set(Math.sin(a) * .7, 0, -Math.cos(a) * .7); } cone(.12, .8, mat('#3A2A1A'), [0, .8, 0], w.spikes, 5);
  w.zaps = group(); for (let i = 0; i < 4; i++) { const z = box(.04, .4, .04, mat('#FFE38A', { glow: 1 }), [0, 0, 0], w.zaps); z.userData.i = i; }
  return w;
}

const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const onSlide = (q, u) => { const x = -1.2 + u * 3.6, y = 3.1 - u * 2.55; return [x, y]; };

export default {
  id: '418',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SLIDE TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'SLIDES TALK'],
  title: 'In this town, slides can talk',
  description: 'Going down? It yells wheee. Too slow? It gives you a push. At the bottom? Static hair. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'playground', 'objectswithopinions', 'comedy', 'shorts'],
  sources: ['Comedy sketch: talking slides are made up. Quiz fact: rubbing two materials together can move electrons from one to the other (the triboelectric effect), and the extra charge makes hair strands repel each other and stand up (Encyclopaedia Britannica, "static electricity" and "electrostatic generator").'],
  setup,
  scenes: [
    { say: 'In this town, slides talk.', show: ['ground', 'sand', 'slide'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [-.2, 4.4, 12], look: [-.4, 4.7, 0], fov: 52, to: { pos: [-.2, 4.4, 11.4], look: [-.4, 4.7, 0], fov: 50 } },
      update: (w, p, t) => { w.spikes.visible = false; w.zaps.visible = false; pAt(w.kid, -1.25, 3.1, .1, .3, .55); pose(w.kid, 1.6, 0); w.kid.mouth.scale.set(1.2, 2, 1); talk(w.sf, t); brow(w.sf, -.2); } },
    { say: 'Going down? It yells wheee.', label: 'WHEEE', show: ['ground', 'sand', 'slide'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.4, 3.8, 11], look: [.2, 2.8, 0], fov: 52, to: { pos: [.4, 3.8, 10.5], look: [.2, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { const u = Math.min(1, p * 1.2); const [x, y] = onSlide(w.kid, u); pAt(w.kid, x, y, 0, Math.PI / 2, .6); w.kid.root.rotation.z = -.62 + 1.2; pose(w.kid, 2.4, 0); w.kid.mouth.scale.set(1.2, 2.4, 1); talk(w.sf, t); brow(w.sf, -.4); w.sf.mouth.scale.set(1.6, 3.4, 1); } },
    { say: 'Too slow? It gives a push.', label: 'BOING', show: ['ground', 'sand', 'slide'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.2, 4, 12], look: [1, 3, 0], fov: 54, to: { pos: [1.2, 4, 11.5], look: [1, 3, 0], fov: 52 } },
      update: (w, p, t) => { const slow = p < .45; const u = slow ? p * .5 : .22 + (p - .45) * 2.2; let x, y; if (u <= 1) { [x, y] = onSlide(w.kid, u); } else { const f = u - 1; x = 2.4 + f * 3; y = .55 + f * 2.2 - f * f * 2.2; } pAt(w.kid, x, Math.max(0, y), 0, Math.PI / 2, .6); w.kid.root.rotation.z = .58; pose(w.kid, slow ? .3 : 2.6, 0); w.kid.mouth.scale.set(1.2, slow ? .6 : 2.6, 1); talk(w.sf, t, !slow || p > .3); brow(w.sf, slow ? .4 : -.3); w.chute.scale.y = slow ? 1 : 1 + .3 * Math.abs(Math.sin(t * 20)); } },
    { say: 'At the bottom? Static hair.', label: 'ZAP', show: ['ground', 'sand', 'slide', 'spikes', 'zaps'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2.6, 2.6, 7], look: [2.6, 2, 0], fov: 50, to: { pos: [2.6, 2.6, 6.5], look: [2.6, 2, 0], fov: 48 } },
      update: (w, p, t) => { w.chute.scale.y = 1; pAt(w.kid, 2.8, 0, .6, -.2, .6); pose(w.kid, .5, 0); w.kid.eyes.forEach(e => e.scale.y = 1.6); w.kid.mouth.scale.set(.8, 2, 1); w.kr = w.kid.root; w.kr.updateWorldMatrix(true, true); const top = w.kid.head.localToWorld(new w.k.THREE.Vector3(0, .2, 0)); w.spikes.position.copy(top); w.spikes.scale.setScalar(.6 * Math.min(1, p * 3)); w.zaps.children.forEach(z => { const i = z.userData.i, a = i / 4 * Math.PI * 2 + t * 5; z.position.set(top.x + Math.cos(a) * .8, top.y + .4 + .2 * Math.sin(t * 20 + i), top.z + Math.sin(a) * .3); z.rotation.z = .5 * Math.sin(t * 30 + i); z.visible = p > .3; }); talk(w.sf, t, false); } },
    { say: 'Talking slide: fun, scary, or way too fast? Comment below.',
      quiz: { q: 'A talking slide is…', options: ['Fun', 'Scary', 'Way too fast'], answer: 'Made up. But sliding really can build up static that makes hair stand up.' },
      show: ['ground', 'sand', 'slide'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1, 4.2, 10], look: [-.4, 3.4, 0], fov: 54, to: { pos: [-2, 4.2, 10], look: [-.4, 3.4, 0] } },
      update: (w, p, t) => { w.spikes.visible = false; w.zaps.visible = false; w.kid.root.visible = false; talk(w.sf, t, Math.sin(t * 2) > 0); brow(w.sf, .2); } },
  ],
};
